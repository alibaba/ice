import * as path from 'path';
import { fileURLToPath } from 'url';
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
import { compileAppConfig } from './analyzeRuntime.js';
import { setEnv, updateRuntimeEnv, getCoreEnvKeys } from './utils/runtimeEnv.js';
import getRuntimeModules from './utils/getRuntimeModules.js';
import { generateRoutesInfo } from './routes.js';
import getWebTask from './tasks/web/index.js';
import getDataLoaderTask from './tasks/web/data-loader.js';
import * as config from './config.js';
import createSpinner from './utils/createSpinner.js';
import getRoutePaths from './utils/getRoutePaths.js';
import { RUNTIME_TMP_DIR } from './constant.js';
import ServerCompileTask from './utils/ServerCompileTask.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface CreateServiceOptions {
  rootDir: string;
  command: CommandName;
  commandArgs: CommandArgs;
}

async function createService({ rootDir, command, commandArgs }: CreateServiceOptions) {
  const buildSpinner = createSpinner('loading config...');
  const templateDir = path.join(__dirname, '../templates/');
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

  // register data-loader
  ctx.registerTask('data-loader', getDataLoaderTask({ rootDir, command }));

  // register config
  ['userConfig', 'cliOption'].forEach((configType) => ctx.registerConfig(configType, config[configType]));

  let taskConfigs = await ctx.setup();
  // merge task config with built-in config
  taskConfigs = mergeTaskConfig(taskConfigs, { port: commandArgs.port });
  const webTaskConfig = taskConfigs.find(({ name }) => name === 'web');

  // get userConfig after setup because of userConfig maybe modified by plugins
  const { userConfig } = ctx;
  const { routes: routesConfig, server } = userConfig;

  await setEnv(rootDir, commandArgs);
  const coreEnvKeys = getCoreEnvKeys();

  const routesInfo = await generateRoutesInfo(rootDir, routesConfig);

  const csr = !userConfig.ssr && !userConfig.ssg;

  // add render data
  generator.setRenderData({
    ...routesInfo,
    runtimeModules,
    coreEnvKeys,
    basename: webTaskConfig.config.basename,
    memoryRouter: webTaskConfig.config.memoryRouter,
    hydrate: !csr,
  });
  dataCache.set('routes', JSON.stringify(routesInfo.routeManifest));

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
  });

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
    appConfig = await compileAppConfig({ serverCompiler, rootDir });
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
            appConfig,
            devPath: (routePaths[0] || '').replace(/^\//, ''),
            spinner: buildSpinner,
          });
        } else if (command === 'build') {
          return await build(ctx, {
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
