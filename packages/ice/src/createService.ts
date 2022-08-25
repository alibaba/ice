import * as path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { Context } from 'build-scripts';
import consola from 'consola';
import type { CommandArgs, CommandName } from 'build-scripts';
import type { AppConfig, Config } from '@ice/types';
import type { ExportData } from '@ice/types/esm/generator.js';
import type { ExtendsPluginAPI } from '@ice/types/esm/plugin.js';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import Generator from './service/runtimeGenerator.js';
import { createServerCompiler } from './service/serverCompiler.js';
import createWatch from './service/watchSource.js';
import start from './commands/start.js';
import build from './commands/build.js';
import mergeTaskConfig from './utils/mergeTaskConfig.js';
import getWatchEvents from './getWatchEvents.js';
import { setEnv, updateRuntimeEnv, getCoreEnvKeys } from './utils/runtimeEnv.js';
import getRuntimeModules from './utils/getRuntimeModules.js';
import { generateRoutesInfo } from './routes.js';
import getWebTask from './tasks/web/index.js';
import * as config from './config.js';
import createSpinner from './utils/createSpinner.js';
import getRoutePaths from './utils/getRoutePaths.js';
import { RUNTIME_TMP_DIR } from './constant.js';
import ServerCompileTask from './utils/ServerCompileTask.js';
import { getAppExportConfig, getRouteExportConfig } from './service/config.js';
import renderExportsTemplate from './utils/renderExportsTemplate.js';
import { getFileExports } from './service/analyze.js';

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
    addExport: (exportData: ExportData) => {
      generator.addExport('framework', exportData);
    },
    addExportTypes: (exportData: ExportData) => {
      generator.addExport('frameworkTypes', exportData);
    },
    addRenderFile: generator.addRenderFile,
    addRenderTemplate: generator.addTemplateFiles,
  };

  const serverCompileTask = new ServerCompileTask();
  const ctx = new Context<Config, ExtendsPluginAPI>({
    rootDir,
    command,
    commandArgs,
    configFile,
    extendsPluginAPI: {
      generator: generatorAPI,
      watch: {
        addEvent: addWatchEvent,
        removeEvent: removeWatchEvent,
      },
      context: {
        // @ts-expect-error repack type can not match with original type
        webpack,
      },
      serverCompileTask,
    },
  });

  // resolve userConfig from ice.config.ts before registerConfig
  await ctx.resolveUserConfig();

  // get plugins include built-in plugins and custom plugins
  const plugins = await ctx.resolvePlugins();
  const runtimeModules = getRuntimeModules(plugins);

  // register web
  ctx.registerTask('web', getWebTask({ rootDir, command }));

  // register config
  ['userConfig', 'cliOption'].forEach((configType) => ctx.registerConfig(configType, config[configType]));

  let taskConfigs = await ctx.setup();
  // merge task config with built-in config
  taskConfigs = mergeTaskConfig(taskConfigs, {
    port: commandArgs.port,
    alias: {
      // Get absolute path of `regenerator-runtime`, so it's unnecessary to add it to project dependencies
      'regenerator-runtime': require.resolve('regenerator-runtime'),
    },
  });
  const webTaskConfig = taskConfigs.find(({ name }) => name === 'web');

  // get userConfig after setup because of userConfig maybe modified by plugins
  const { userConfig } = ctx;
  const { routes: routesConfig, server, syntaxFeatures } = userConfig;

  await setEnv(rootDir, commandArgs);
  const coreEnvKeys = getCoreEnvKeys();

  const routesInfo = await generateRoutesInfo(rootDir, routesConfig);
  const hasExportAppData = (await getFileExports({ rootDir, file: 'src/app' })).includes('getAppData');
  const csr = !userConfig.ssr && !userConfig.ssg;

  // add render data
  generator.setRenderData({
    ...routesInfo,
    hasExportAppData,
    runtimeModules,
    coreEnvKeys,
    basename: webTaskConfig.config.basename,
    memoryRouter: webTaskConfig.config.memoryRouter,
    hydrate: !csr,
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
  });

  // render template before webpack compile
  const renderStart = new Date().getTime();
  generator.render();
  consola.debug('template render cost:', new Date().getTime() - renderStart);

  // create serverCompiler with task config
  const serverCompiler = createServerCompiler({
    rootDir,
    task: webTaskConfig,
    command,
    server,
    syntaxFeatures,
  });
  const { getAppConfig, init: initAppConfigCompiler } = getAppExportConfig(rootDir);
  const {
    getRoutesConfig,
    init: initRouteConfigCompiler,
    reCompile: reCompileRouteConfig,
  } = getRouteExportConfig(rootDir);
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

  const disableRouter = userConfig.removeHistoryDeadCode && routesInfo.routesCount <= 1;
  if (disableRouter) {
    consola.info('[ice] removeHistoryDeadCode is enabled and only have one route, ice build will remove history and react-router dead code.');
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
            reCompileRouteConfig,
            dataCache,
            appConfig,
            devPath: (routePaths[0] || '').replace(/^\//, ''),
            spinner: buildSpinner,
          });
        } else if (command === 'build') {
          return await build(ctx, {
            getRoutesConfig,
            getAppConfig,
            taskConfigs,
            serverCompiler,
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
