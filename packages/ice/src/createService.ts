// hijack webpack before import other modules
import './requireHook.js';
import { createRequire } from 'module';
import * as path from 'path';
import { fileURLToPath } from 'url';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import { Context } from 'build-scripts';
import type { CommandArgs, CommandName, TaskConfig } from 'build-scripts';
import type { Config } from '@ice/shared-config/types';
import type { AppConfig } from '@ice/runtime/types';
import * as config from './config.js';
import test from './commands/test.js';
import webpackBundler from './bundler/webpack/index.js';
import rspackBundler from './bundler/rspack/index.js';
import { RUNTIME_TMP_DIR, WEB, RUNTIME_EXPORTS, SERVER_ENTRY } from './constant.js';
import getWatchEvents from './getWatchEvents.js';
import pluginWeb from './plugins/web/index.js';
import getDefaultTaskConfig from './plugins/task.js';
import { getFileExports } from './service/analyze.js';
import { getAppExportConfig, getRouteExportConfig } from './service/config.js';
import Generator from './service/runtimeGenerator.js';
import ServerRunner from './service/ServerRunner.js';
import { createServerCompiler } from './service/serverCompiler.js';
import createWatch from './service/watchSource.js';
import type {
  PluginData,
  ExtendsPluginAPI,
} from './types/index.js';
import addPolyfills from './utils/runtimePolyfill.js';
import createSpinner from './utils/createSpinner.js';
import dynamicImport from './utils/dynamicImport.js';
import getRuntimeModules from './utils/getRuntimeModules.js';
import hasDocument from './utils/hasDocument.js';
import { logger, createLogger } from './utils/logger.js';
import mergeTaskConfig, { mergeConfig } from './utils/mergeTaskConfig.js';
import RouteManifest from './utils/routeManifest.js';
import { setEnv, updateRuntimeEnv, getCoreEnvKeys } from './utils/runtimeEnv.js';
import ServerCompileTask from './utils/ServerCompileTask.js';
import { generateRoutesInfo } from './routes.js';
import GeneratorAPI from './service/generatorAPI.js';
import renderTemplate from './service/renderTemplate.js';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface CreateServiceOptions {
  rootDir: string;
  command: CommandName;
  commandArgs: CommandArgs;
}

async function createService({ rootDir, command, commandArgs }: CreateServiceOptions) {
  const buildSpinner = createSpinner('loading config...');
  const templateDir = path.join(__dirname, '../templates/');
  const coreTemplate = path.join(templateDir, 'core/');
  const configFile = commandArgs.config || 'ice.config.(mts|mjs|ts|js|cjs|json)';
  const dataCache = new Map<string, string>();
  const builtinPlugin = commandArgs.plugin as string;
  const generator = new Generator({
    // Directory of templates includes `core` and `exports`.
    templateDir,
    rootDir,
    targetDir: RUNTIME_TMP_DIR,
    // add default template of ice
    templates: [coreTemplate],
  });

  const { addWatchEvent, removeWatchEvent } = createWatch({
    watchDir: rootDir,
    command,
  });

  const generatorAPI = new GeneratorAPI(generator);
  // Store server runner for plugins.
  let serverRunner: ServerRunner;
  const serverCompileTask = new ServerCompileTask();

  async function excuteServerEntry() {
    try {
      if (serverRunner) {
        return serverRunner.run(SERVER_ENTRY);
      } else {
        const { error, serverEntry } = await serverCompileTask.get();
        if (error) {
          logger.error('Server compile error:', error);
          return;
        }
        delete require.cache[serverEntry];
        return await dynamicImport(serverEntry, true);
      }
    } catch (error) {
      // make error clearly, notice typeof err === 'string'
      logger.error('Execute server entry error:', error);
      return;
    }
  }

  const { target = WEB } = commandArgs;
  const plugins = [];

  // Add default web plugin.
  if (target === WEB) {
    plugins.push(pluginWeb());
  }
  if (builtinPlugin) {
    try {
      const pluginModule = await dynamicImport(builtinPlugin.startsWith('.') ? path.join(rootDir, builtinPlugin) : builtinPlugin);
      const plugin = pluginModule.default || pluginModule;
      plugins.push(plugin());
    } catch (err) {
      logger.error(`Load builtin plugin error, Faild to import plugin "${builtinPlugin}".`);
      throw err;
    }
  }

  const routeManifest = new RouteManifest();
  const ctx = new Context<Config, ExtendsPluginAPI>({
    rootDir,
    command,
    commandArgs,
    configFile,
    plugins,
    extendsPluginAPI: {
      generator: generatorAPI,
      watch: {
        addEvent: addWatchEvent,
        removeEvent: removeWatchEvent,
      },
      getRouteManifest: () => routeManifest.getNestedRoute(),
      getFlattenRoutes: () => routeManifest.getFlattenRoute(),
      getRoutesFile: () => routeManifest.getRoutesFile(),
      addRoutesDefinition: routeManifest.addRoutesDefinition.bind(routeManifest),
      excuteServerEntry,
      context: {
        webpack,
      },
      serverCompileTask,
      dataCache,
      createLogger,
      // Override registerTask to merge default config.
      registerTask: (target: string, config: Partial<Config>) => {
        // Merge task config with default config, so developer should not care about the config built-in of framework.
        const defaultTaskConfig = getDefaultTaskConfig({ rootDir, command });
        return ctx.registerTask(target, mergeConfig(defaultTaskConfig, config));
      },
    },
  });
  // Load .env before resolve user config, so we can access env variables defined in .env files.
  await setEnv(rootDir, commandArgs);
  // resolve userConfig from ice.config.ts before registerConfig
  await ctx.resolveUserConfig();

  // get plugins include built-in plugins and custom plugins
  const resolvedPlugins = await ctx.resolvePlugins() as PluginData[];
  const runtimeModules = getRuntimeModules(resolvedPlugins, rootDir);

  const { getAppConfig, init: initAppConfigCompiler } = getAppExportConfig(rootDir);
  const { getRoutesConfig, getDataloaderConfig, init: initRouteConfigCompiler } = getRouteExportConfig(rootDir);

  // register config
  ['userConfig', 'cliOption'].forEach((configType) => {
    // Support getDefaultValue for config, make easier for get default value in different mode.
    const configData = config[configType].map(({ getDefaultValue, ...resetConfig }) => {
      if (getDefaultValue && typeof getDefaultValue === 'function') {
        return {
          ...resetConfig,
          defaultValue: getDefaultValue(),
        };
      }
      return resetConfig;
    });

    ctx.registerConfig(configType, configData);
  });
  let taskConfigs: TaskConfig<Config>[] = await ctx.setup();

  // get userConfig after setup because of userConfig maybe modified by plugins
  const { userConfig } = ctx;
  const { routes: routesConfig, server, syntaxFeatures, polyfill } = userConfig;

  const coreEnvKeys = getCoreEnvKeys();

  const routesInfo = await generateRoutesInfo(rootDir, routesConfig, routeManifest.getRoutesDefinitions());
  routeManifest.setRoutes(routesInfo.routes);

  const hasExportAppData = (await getFileExports({ rootDir, file: 'src/app' })).includes('dataLoader');
  const csr = !userConfig.ssr && !userConfig.ssg;

  const disableRouter = (userConfig?.optimization?.router && routesInfo.routesCount <= 1) ||
    userConfig?.optimization?.disableRouter;
  if (disableRouter) {
    logger.info('`optimization.router` is enabled, ice build will remove react-router and history which is unnecessary.');
    taskConfigs = mergeTaskConfig(taskConfigs, {
      alias: {
        '@ice/runtime/router': '@ice/runtime/single-router',
      },
    });
  } else {
    // Only when router is enabled, we will add router polyfills.
    addPolyfills(generatorAPI, userConfig.featurePolyfill, rootDir, command === 'start');
  }

  // Get first task config as default platform config.
  const platformTaskConfig = taskConfigs[0];

  const runtimeConfig = platformTaskConfig.config?.runtime;
  const iceRuntimePath = runtimeConfig?.source || '@ice/runtime';
  const runtimeExports = runtimeConfig?.exports || RUNTIME_EXPORTS;
  // Only when code splitting use the default strategy or set to `router`, the router will be lazy loaded.
  const lazy = [true, 'chunks', 'page', 'page-vendors'].includes(userConfig.codeSplitting);
  const runtimeRouter = runtimeConfig?.router;
  const { routeImports, routeDefinition } = runtimeRouter?.routesDefinition?.({
    manifest: routesInfo.routes,
    lazy,
  }) || {
    routeImports: [],
    routeDefinition: '',
  };

  const routesFile = runtimeRouter?.source;

  const loaderExports = hasExportAppData || Boolean(routesInfo.loaders);
  const hasDataLoader = Boolean(userConfig.dataLoader) && loaderExports;
  const renderData = {
    ...routesInfo,
    target,
    iceRuntimePath,
    hasExportAppData,
    runtimeModules,
    coreEnvKeys,
    // Stringify basename because `config` basename in task config only support type string.
    basename: JSON.stringify(platformTaskConfig.config.basename || '/'),
    memoryRouter: platformTaskConfig.config.memoryRouter,
    hydrate: !csr,
    importCoreJs: polyfill === 'entry',
    entryCode: generatorAPI.getEntryCode(),
    hasDocument: hasDocument(rootDir),
    dataLoader: userConfig.dataLoader,
    hasDataLoader,
    routeImports,
    routeDefinition,
    routesFile: routesFile?.replace(/\.[^.]+$/, ''),
    lazy,
    runtimeServer: runtimeConfig?.server,
  };
  dataCache.set('routes', JSON.stringify(routesInfo));
  dataCache.set('hasExportAppData', hasExportAppData ? 'true' : '');

  // Render template to runtime directory.
  renderTemplate({
    ctx,
    taskConfig: platformTaskConfig,
    routeManifest,
    generator,
    generatorAPI,
    renderData,
    runtimeExports,
    templateDir,
  });

  if (server.onDemand && command === 'start') {
    serverRunner = new ServerRunner({
      speedup: commandArgs.speedup,
      rootDir,
      task: platformTaskConfig,
      server,
      csr,
      getRoutesFile: () => routeManifest.getRoutesFile(),
    });
    addWatchEvent([
      // Files in .ice directory will update when routes changed.
      /(src|.ice)\/?[\w*-:.$]+$/,
      async (eventName: string, filePath: string) => {
        if (eventName === 'change' || eventName === 'add') {
          serverRunner.fileChanged(filePath);
        }
      }],
    );
  }
  // create serverCompiler with task config
  const serverCompiler = createServerCompiler({
    rootDir,
    task: platformTaskConfig,
    command,
    speedup: commandArgs.speedup,
    server,
    syntaxFeatures,
    getRoutesFile: () => routeManifest.getRoutesFile(),
  });
  initAppConfigCompiler(serverCompiler);
  initRouteConfigCompiler(serverCompiler);

  addWatchEvent(
    ...getWatchEvents({
      generator,
      targetDir: RUNTIME_TMP_DIR,
      templateDir: coreTemplate,
      cache: dataCache,
      routeManifest,
      lazyRoutes: lazy,
      ctx,
      router: runtimeRouter,
    }),
  );

  const appConfig: AppConfig = (await getAppConfig()).default;
  updateRuntimeEnv(appConfig, {
    disableRouter,
    // The optimization for runtime size should only be enabled in production mode.
    routesConfig: command !== 'build' || routesInfo.routesExports.length > 0,
    dataLoader: command !== 'build' || loaderExports,
  });

  return {
    run: async () => {
      const bundlerConfig = {
        taskConfigs,
        spinner: buildSpinner,
        routeManifest,
        appConfig,
        hooksAPI: {
          getAppConfig,
          getRoutesConfig,
          getDataloaderConfig,
          serverRunner,
          serverCompiler,
        },
        userConfig,
        configFile,
        hasDataLoader,
      };
      try {
        if (command === 'test') {
          return test(ctx, {
            taskConfigs,
            spinner: buildSpinner,
          });
        } else {
          return commandArgs.speedup
            ? await rspackBundler(ctx, bundlerConfig)
            : await webpackBundler(ctx, bundlerConfig);
        }
      } catch (error) {
        buildSpinner.stop();
        throw error;
      }
    },
  };
}

export default createService;
