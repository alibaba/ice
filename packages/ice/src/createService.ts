import * as path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { Context } from 'build-scripts';
import type { CommandArgs, CommandName } from 'build-scripts';
import type { Config } from '@ice/shared-config/types';
import type { AppConfig } from '@ice/runtime/types';
import fse from 'fs-extra';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import type {
  DeclarationData,
  PluginData,
  ExtendsPluginAPI,
  TargetDeclarationData,
} from './types/index.js';
import { DeclarationType } from './types/index.js';
import Generator from './service/runtimeGenerator.js';
import { createServerCompiler } from './service/serverCompiler.js';
import createWatch from './service/watchSource.js';
import pluginWeb from './plugins/web/index.js';
import test from './commands/test.js';
import getWatchEvents from './getWatchEvents.js';
import { setEnv, updateRuntimeEnv, getCoreEnvKeys } from './utils/runtimeEnv.js';
import getRuntimeModules from './utils/getRuntimeModules.js';
import { generateRoutesInfo, getRoutesDefinition } from './routes.js';
import * as config from './config.js';
import { RUNTIME_TMP_DIR, WEB, RUNTIME_EXPORTS, SERVER_ENTRY } from './constant.js';
import createSpinner from './utils/createSpinner.js';
import ServerCompileTask from './utils/ServerCompileTask.js';
import { getAppExportConfig, getRouteExportConfig } from './service/config.js';
import renderExportsTemplate from './utils/renderExportsTemplate.js';
import { getFileExports } from './service/analyze.js';
import { logger, createLogger } from './utils/logger.js';
import ServerRunner from './service/ServerRunner.js';
import RouteManifest from './utils/routeManifest.js';
import dynamicImport from './utils/dynamicImport.js';
import mergeTaskConfig, { mergeConfig } from './utils/mergeTaskConfig.js';
import addPolyfills from './utils/runtimePolyfill.js';
import webpackBundler from './bundler/webpack/index.js';
import rspackBundler from './bundler/rspack/index.js';
import getDefaultTaskConfig from './plugins/task.js';

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

  let entryCode = 'render();';

  const generatorAPI = {
    addExport: (declarationData: Omit<DeclarationData, 'declarationType'>) => {
      generator.addDeclaration('framework', {
        ...declarationData,
        declarationType: DeclarationType.NORMAL,
      });
    },
    addTargetExport: (declarationData: Omit<TargetDeclarationData, 'declarationType'>) => {
      generator.addDeclaration('framework', {
        ...declarationData,
        declarationType: DeclarationType.TARGET,
      });
    },
    addExportTypes: (declarationData: Omit<DeclarationData, 'declarationType'>) => {
      generator.addDeclaration('frameworkTypes', {
        ...declarationData,
        declarationType: DeclarationType.NORMAL,
      });
    },
    addRuntimeOptions: (declarationData: Omit<DeclarationData, 'declarationType'>) => {
      generator.addDeclaration('runtimeOptions', {
        ...declarationData,
        declarationType: DeclarationType.NORMAL,
      });
    },
    removeRuntimeOptions: (removeSource: string | string[]) => {
      generator.removeDeclaration('runtimeOptions', removeSource);
    },
    addRouteTypes: (declarationData: Omit<DeclarationData, 'declarationType'>) => {
      generator.addDeclaration('routeConfigTypes', {
        ...declarationData,
        declarationType: DeclarationType.NORMAL,
      });
    },
    addRenderFile: generator.addRenderFile,
    addRenderTemplate: generator.addTemplateFiles,
    addEntryCode: (callback: (originalCode: string) => string) => {
      entryCode = callback(entryCode);
    },
    addEntryImportAhead: (declarationData: Pick<DeclarationData, 'source'>) => {
      generator.addDeclaration('entry', {
        ...declarationData,
        declarationType: DeclarationType.NORMAL,
      });
    },
    modifyRenderData: generator.modifyRenderData,
    addDataLoaderImport: (declarationData: DeclarationData) => {
      generator.addDeclaration('dataLoaderImport', {
        ...declarationData,
        declarationType: DeclarationType.NORMAL,
      });
    },
    getExportList: (registerKey: string) => {
      return generator.getExportList(registerKey);
    },
    render: generator.render,
  };
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

  // Register framework level API.
  RUNTIME_EXPORTS.forEach(exports => {
    generatorAPI.addExport(exports);
  });
  const routeManifest = new RouteManifest();
  // Merge task config with default config, so developer should not care about the config built-in of framework.
  const defaultTaskConfig = getDefaultTaskConfig({ rootDir, command });
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
  let taskConfigs = await ctx.setup();

  // get userConfig after setup because of userConfig maybe modified by plugins
  const { userConfig } = ctx;
  const { routes: routesConfig, server, syntaxFeatures, polyfill, output: { distType } } = userConfig;

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

  const iceRuntimePath = '@ice/runtime';
  // Only when code splitting use the default strategy or set to `router`, the router will be lazy loaded.
  const lazy = [true, 'chunks', 'page', 'page-vendors'].includes(userConfig.codeSplitting);
  const { routeImports, routeDefinition } = getRoutesDefinition(routesInfo.routes, lazy);
  // add render data
  generator.setRenderData({
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
    // Enable react-router for web as default.
    enableRoutes: true,
    entryCode,
    jsOutput: distType.includes('javascript'),
    hasDocument: fse.existsSync(path.join(rootDir, 'src/document.tsx')) || fse.existsSync(path.join(rootDir, 'src/document.jsx')) || fse.existsSync(path.join(rootDir, 'src/document.js')),
    dataLoader: userConfig.dataLoader,
    routeImports,
    routeDefinition,
    rsc: userConfig.rsc,
  });
  dataCache.set('routes', JSON.stringify(routesInfo));
  dataCache.set('hasExportAppData', hasExportAppData ? 'true' : '');

  // Render exports files if route component export dataLoader / pageConfig.
  renderExportsTemplate(
    {
      ...routesInfo,
      hasExportAppData,
    },
    generator.addRenderFile,
    {
      rootDir,
      runtimeDir: RUNTIME_TMP_DIR,
      templateDir: path.join(templateDir, 'exports'),
      dataLoader: Boolean(userConfig.dataLoader),
    },
  );

  if (typeof userConfig.dataLoader === 'object' && userConfig.dataLoader.fetcher) {
    const {
      packageName,
      method,
    } = userConfig.dataLoader.fetcher;

    generatorAPI.addDataLoaderImport(method ? {
      source: packageName,
      alias: {
        [method]: 'dataLoaderFetcher',
      },
      specifier: [method],
    } : {
      source: packageName,
      specifier: '',
    });
  }

  // render template before webpack compile
  const renderStart = new Date().getTime();
  generator.render();
  logger.debug('template render cost:', new Date().getTime() - renderStart);
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
      /src\/?[\w*-:.$]+$/,
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
    }),
  );

  const appConfig: AppConfig = (await getAppConfig()).default;

  updateRuntimeEnv(appConfig, { disableRouter });

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
