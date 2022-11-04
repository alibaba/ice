import * as path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { Context } from 'build-scripts';
import consola from 'consola';
import type { CommandArgs, CommandName } from 'build-scripts';
import type { Config } from '@ice/webpack-config/esm/types';
import type { AppConfig } from '@ice/runtime/esm/types';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import fg from 'fast-glob';
import type { DeclarationData } from './types/generator.js';
import type { PluginData, ExtendsPluginAPI } from './types/plugin.js';
import Generator from './service/runtimeGenerator.js';
import { createServerCompiler } from './service/serverCompiler.js';
import createWatch from './service/watchSource.js';
import start from './commands/start.js';
import build from './commands/build.js';
import webPlugin from './plugins/web/index.js';
import test from './commands/test.js';
import mergeTaskConfig from './utils/mergeTaskConfig.js';
import getWatchEvents from './getWatchEvents.js';
import { setEnv, updateRuntimeEnv, getCoreEnvKeys } from './utils/runtimeEnv.js';
import getRuntimeModules from './utils/getRuntimeModules.js';
import { generateRoutesInfo } from './routes.js';
import * as config from './config.js';
import { RUNTIME_TMP_DIR, WEB } from './constant.js';
import createSpinner from './utils/createSpinner.js';
import getRoutePaths from './utils/getRoutePaths.js';
import ServerCompileTask from './utils/ServerCompileTask.js';
import { getAppExportConfig, getRouteExportConfig } from './service/config.js';
import renderExportsTemplate from './utils/renderExportsTemplate.js';
import { getFileExports } from './service/analyze.js';
import { getFileHash } from './utils/hash.js';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface CreateServiceOptions {
  rootDir: string;
  command: CommandName;
  commandArgs: CommandArgs;
}

async function createService({ rootDir, command, commandArgs }: CreateServiceOptions) {
  const buildSpinner = createSpinner('loading config...');
  const templateDir = path.join(__dirname, '../templates/core/');
  const configFile = 'ice.config.(mts|mjs|ts|js|cjs|json)';
  const dataCache = new Map<string, string>();
  const generator = new Generator({
    rootDir,
    targetDir: RUNTIME_TMP_DIR,
    // add default template of ice
    templates: [templateDir],
  });

  const { addWatchEvent, removeWatchEvent } = createWatch({
    watchDir: rootDir,
    command,
  });

  const generatorAPI = {
    addExport: (declarationData: DeclarationData) => {
      generator.addDeclaration('framework', declarationData);
    },
    addExportTypes: (declarationData: DeclarationData) => {
      generator.addDeclaration('frameworkTypes', declarationData);
    },
    addRuntimeOptions: (declarationData: DeclarationData) => {
      generator.addDeclaration('runtimeOptions', declarationData);
    },
    removeRuntimeOptions: (removeSource: string | string[]) => {
      generator.removeDeclaration('runtimeOptions', removeSource);
    },
    addRouteTypes: (declarationData: DeclarationData) => {
      generator.addDeclaration('routeConfigTypes', declarationData);
    },
    addRenderFile: generator.addRenderFile,
    addRenderTemplate: generator.addTemplateFiles,
    modifyRenderData: generator.modifyRenderData,
    addDataLoaderImport: (declarationData: DeclarationData) => {
      generator.addDeclaration('dataLoaderImport', declarationData);
    },
    render: generator.render,
  };

  const serverCompileTask = new ServerCompileTask();

  const { platform = WEB } = commandArgs;
  const ctx = new Context<Config, ExtendsPluginAPI>({
    rootDir,
    command,
    commandArgs,
    configFile,
    plugins: platform === WEB ? [webPlugin()] : [],
    extendsPluginAPI: {
      generator: generatorAPI,
      watch: {
        addEvent: addWatchEvent,
        removeEvent: removeWatchEvent,
      },
      context: {
        webpack,
      },
      serverCompileTask,
      dataCache,
    },
  });
  // resolve userConfig from ice.config.ts before registerConfig
  await ctx.resolveUserConfig();

  // get plugins include built-in plugins and custom plugins
  const plugins = await ctx.resolvePlugins() as PluginData[];
  const runtimeModules = getRuntimeModules(plugins);

  const { getAppConfig, init: initAppConfigCompiler } = getAppExportConfig(rootDir);
  const { getRoutesConfig, init: initRouteConfigCompiler } = getRouteExportConfig(rootDir);

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
  const { routes: routesConfig, server, syntaxFeatures, polyfill } = userConfig;
  const userConfigHash = await getFileHash(path.join(rootDir, fg.sync(configFile, { cwd: rootDir })[0]));

  await setEnv(rootDir, commandArgs);
  const coreEnvKeys = getCoreEnvKeys();

  const routesInfo = await generateRoutesInfo(rootDir, routesConfig);
  const hasExportAppData = (await getFileExports({ rootDir, file: 'src/app' })).includes('getAppData');
  const csr = !userConfig.ssr && !userConfig.ssg;

  const disableRouter = userConfig?.optimization?.router && routesInfo.routesCount <= 1;
  let taskAlias = {};
  if (disableRouter) {
    consola.info('[ice]', 'optimization.router is enabled and only have one route, ice build will remove react-router and history which is unnecessary.');
    taskAlias['@ice/runtime/router'] = path.join(require.resolve('@ice/runtime'), '../single-router.js');
  }
  // merge task config with built-in config
  taskConfigs = mergeTaskConfig(taskConfigs, {
    port: commandArgs.port,
  });

  // Get first task config as default platform config.
  const platformTaskConfig = taskConfigs[0];

  const iceRuntimePath = '@ice/runtime';
  const enableRoutes = platform === WEB;
  // add render data
  generator.setRenderData({
    ...routesInfo,
    platform,
    iceRuntimePath,
    enableRoutes,
    hasExportAppData,
    runtimeModules,
    coreEnvKeys,
    basename: platformTaskConfig.config.basename || '/',
    memoryRouter: platformTaskConfig.config.memoryRouter,
    hydrate: !csr,
    importCoreJs: polyfill === 'entry',
  });
  dataCache.set('routes', JSON.stringify(routesInfo));
  dataCache.set('hasExportAppData', hasExportAppData ? 'true' : '');

  // Render exports files if route component export getData / getConfig.
  renderExportsTemplate({
    ...routesInfo,
    hasExportAppData,
  }, generator.addRenderFile, {
    rootDir,
    runtimeDir: RUNTIME_TMP_DIR,
    templateDir: path.join(templateDir, '../exports'),
    dataLoader: userConfig.dataLoader,
  });

  // render template before webpack compile
  const renderStart = new Date().getTime();
  generator.render();
  consola.debug('template render cost:', new Date().getTime() - renderStart);
  // create serverCompiler with task config
  const serverCompiler = createServerCompiler({
    rootDir,
    task: platformTaskConfig,
    command,
    server,
    syntaxFeatures,
  });
  initAppConfigCompiler(serverCompiler);
  initRouteConfigCompiler(serverCompiler);

  addWatchEvent(
    ...getWatchEvents({
      generator,
      targetDir: RUNTIME_TMP_DIR,
      templateDir,
      cache: dataCache,
      ctx,
      serverCompiler,
    }),
  );

  let appConfig: AppConfig;
  try {
    // should after generator, otherwise it will compile error
    appConfig = (await getAppConfig()).default;
  } catch (err) {
    consola.warn('Failed to get app config:', err.message);
    consola.debug(err);
  }

  updateRuntimeEnv(appConfig, { disableRouter });

  return {
    run: async () => {
      try {
        if (command === 'start') {
          const routePaths = getRoutePaths(routesInfo.routes)
            .sort((a, b) =>
              // Sort by length, shortest path first.
              a.split('/').filter(Boolean).length - b.split('/').filter(Boolean).length);
          return await start(ctx, {
            taskConfigs,
            serverCompiler,
            getRoutesConfig,
            getAppConfig,
            appConfig,
            devPath: (routePaths[0] || '').replace(/^[/\\]/, ''),
            spinner: buildSpinner,
            userConfigHash,
          });
        } else if (command === 'build') {
          return await build(ctx, {
            getRoutesConfig,
            getAppConfig,
            taskConfigs,
            serverCompiler,
            spinner: buildSpinner,
            userConfigHash,
          });
        } else if (command === 'test') {
          return await test(ctx, {
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
