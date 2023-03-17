import * as path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { Context } from 'build-scripts';
import type { CommandArgs, CommandName } from 'build-scripts';
import type { Config } from '@ice/webpack-config/types';
import type { AppConfig } from '@ice/runtime/types';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import fg from 'fast-glob';
import type { DeclarationData, PluginData, ExtendsPluginAPI, TargetDeclarationData } from './types';
import { DeclarationType } from './types/index.js';
import Generator from './service/runtimeGenerator.js';
import { createServerCompiler } from './service/serverCompiler.js';
import createWatch from './service/watchSource.js';
import start from './commands/start.js';
import build from './commands/build.js';
import pluginWeb from './plugins/web/index.js';
import test from './commands/test.js';
import getWatchEvents from './getWatchEvents.js';
import { setEnv, updateRuntimeEnv, getCoreEnvKeys } from './utils/runtimeEnv.js';
import getRuntimeModules from './utils/getRuntimeModules.js';
import { generateRoutesInfo, getRoutesDefination } from './routes.js';
import * as config from './config.js';
import { RUNTIME_TMP_DIR, WEB, RUNTIME_EXPORTS } from './constant.js';
import createSpinner from './utils/createSpinner.js';
import ServerCompileTask from './utils/ServerCompileTask.js';
import { getAppExportConfig, getRouteExportConfig } from './service/config.js';
import renderExportsTemplate from './utils/renderExportsTemplate.js';
import { getFileExports } from './service/analyze.js';
import { getFileHash } from './utils/hash.js';
import { logger, createLogger } from './utils/logger.js';
import ServerRunner from './service/ServerRunner.js';
import RouteManifest from './utils/routeManifest.js';

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
    modifyRenderData: generator.modifyRenderData,
    addDataLoaderImport: (declarationData: DeclarationData) => {
      generator.addDeclaration('dataLoaderImport', {
        ...declarationData,
        declarationType: DeclarationType.NORMAL,
      });
    },
    render: generator.render,
  };

  const serverCompileTask = new ServerCompileTask();

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
      context: {
        webpack,
      },
      serverCompileTask,
      dataCache,
      createLogger,
    },
  });
  // Load .env before resolve user config, so we can access env variables defined in .env files.
  await setEnv(rootDir, commandArgs);
  // resolve userConfig from ice.config.ts before registerConfig
  await ctx.resolveUserConfig();

  // get plugins include built-in plugins and custom plugins
  const resolvedPlugins = await ctx.resolvePlugins() as PluginData[];
  const runtimeModules = getRuntimeModules(resolvedPlugins);

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
  const userConfigHash = await getFileHash(path.join(rootDir, fg.sync(configFile, { cwd: rootDir })[0]));

  const coreEnvKeys = getCoreEnvKeys();

  const routesInfo = await generateRoutesInfo(rootDir, routesConfig);
  routeManifest.setRoutes(routesInfo.routes);
  const hasExportAppData = (await getFileExports({ rootDir, file: 'src/app' })).includes('dataLoader');
  const csr = !userConfig.ssr && !userConfig.ssg;

  const disableRouter = userConfig?.optimization?.router && routesInfo.routesCount <= 1;
  let taskAlias = {};
  if (disableRouter) {
    logger.info('`optimization.router` is enabled and only have one route, ice build will remove react-router and history which is unnecessary.');
    taskAlias['@ice/runtime/router'] = path.join(require.resolve('@ice/runtime'), '../single-router.js');
  }

  // Get first task config as default platform config.
  const platformTaskConfig = taskConfigs[0];

  const iceRuntimePath = '@ice/runtime';
  // Only when code splitting use the default strategy or set to `router`, the router will be lazy loaded.
  const lazy = [true, 'chunks', 'page'].includes(userConfig.codeSplitting);
  const { routeImports, routeDefination } = getRoutesDefination(routesInfo.routes, lazy);
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
    dataLoader: userConfig.dataLoader,
    routeImports,
    routeDefination,
  });
  dataCache.set('routes', JSON.stringify(routesInfo));
  dataCache.set('hasExportAppData', hasExportAppData ? 'true' : '');

  // Render exports files if route component export dataLoader / pageConfig.
  renderExportsTemplate({
    ...routesInfo,
    hasExportAppData,
  }, generator.addRenderFile, {
    rootDir,
    runtimeDir: RUNTIME_TMP_DIR,
    templateDir: path.join(templateDir, 'exports'),
    dataLoader: Boolean(userConfig.dataLoader),
  });

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
  // Create server runner
  let serverRunner: ServerRunner;
  if (server.onDemand) {
    serverRunner = new ServerRunner({
      rootDir,
      task: platformTaskConfig,
      server,
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
      try {
        if (command === 'start') {
          const routePaths = routeManifest.getFlattenRoute()
            .sort((a, b) =>
              // Sort by length, shortest path first.
              a.split('/').filter(Boolean).length - b.split('/').filter(Boolean).length);
          return await start(ctx, {
            routeManifest,
            taskConfigs,
            serverCompiler,
            getRoutesConfig,
            getDataloaderConfig,
            getAppConfig,
            serverRunner,
            appConfig,
            devPath: (routePaths[0] || '').replace(/^[/\\]/, ''),
            spinner: buildSpinner,
            userConfigHash,
          });
        } else if (command === 'build') {
          return await build(ctx, {
            routeManifest,
            getRoutesConfig,
            getDataloaderConfig,
            getAppConfig,
            appConfig,
            taskConfigs,
            serverCompiler,
            spinner: buildSpinner,
            userConfigHash,
            userConfig,
          });
        } else if (command === 'test') {
          return test(ctx, {
            taskConfigs,
            spinner: buildSpinner,
          });
        }
      } catch (err) {
        buildSpinner.stop();
        throw err;
      }
    },
  };
}

export default createService;
