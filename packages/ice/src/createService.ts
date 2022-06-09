import * as path from 'path';
import { fileURLToPath } from 'url';
import { Context } from 'build-scripts';
import consola from 'consola';
import type { CommandArgs, CommandName } from 'build-scripts';
import type { Config } from '@ice/types';
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
import { getAppConfig } from './analyzeRuntime.js';
import { initProcessEnv, updateRuntimeEnv, getCoreEnvKeys } from './utils/runtimeEnv.js';
import getRuntimeModules from './utils/getRuntimeModules.js';
import { generateRoutesInfo } from './routes.js';
import getWebTask from './tasks/web/index.js';
import * as config from './config.js';
import type { AppConfig } from './utils/runtimeEnv.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface CreateServiceOptions {
  rootDir: string;
  command: CommandName;
  commandArgs: CommandArgs;
}

async function createService({ rootDir, command, commandArgs }: CreateServiceOptions) {
  const targetDir = '.ice';
  const templateDir = path.join(__dirname, '../template/');
  const configFile = 'ice.config.(mts|mjs|ts|js|cjs|json)';
  const dataCache = new Map<string, string>();
  const generator = new Generator({
    rootDir,
    targetDir,
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
    addConfigTypes: (exportData: ExportData) => {
      generator.addExport('configTypes', exportData);
    },
    addRenderFile: generator.addRenderFile,
    addRenderTemplate: generator.addTemplateFiles,
  };

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

  // get userConfig after setup because of userConfig maybe modified by plugins
  const { userConfig } = ctx;
  const { routes: routesConfig } = userConfig;

  // load dotenv, set to process.env
  await initProcessEnv(rootDir, command, commandArgs, userConfig);
  const coreEnvKeys = getCoreEnvKeys();

  const routesInfo = await generateRoutesInfo(rootDir, routesConfig);
  // add render data
  generator.setRenderData({ ...routesInfo, runtimeModules, coreEnvKeys });
  dataCache.set('routes', JSON.stringify(routesInfo.routeManifest));

  // render template before webpack compile
  const renderStart = new Date().getTime();
  generator.render();
  addWatchEvent(
    ...getWatchEvents({ generator, targetDir, templateDir, cache: dataCache, ctx }),
  );
  consola.debug('template render cost:', new Date().getTime() - renderStart);

  // merge task config with built-in config
  taskConfigs = mergeTaskConfig(taskConfigs, { port: commandArgs.port });

  // create serverCompiler with task config
  const serverCompiler = createServerCompiler({
    rootDir,
    task: taskConfigs.find(({ name }) => name === 'web'),
  });

  let appConfig: AppConfig;
  if (command === 'build') {
    try {
      // should after generator, otherwise it will compile error
      appConfig = await getAppConfig({ serverCompiler, rootDir });
    } catch (err) {
      consola.warn('Failed to get app config:', err.message);
      consola.debug(err);
    }
  }

  const disableRouter = userConfig.removeHistoryDeadCode && routesInfo.routesCount <= 1;
  if (disableRouter) {
    consola.info('[ice] removeHistoryDeadCode is enabled and only have one route, ice build will remove history and react-router dead code.');
  }

  updateRuntimeEnv(appConfig, { disableRouter });

  return {
    run: async () => {
      if (command === 'start') {
        return await start(ctx, taskConfigs, serverCompiler);
      } else if (command === 'build') {
        return await build(ctx, taskConfigs, serverCompiler);
      }
    },
  };
}

export default createService;