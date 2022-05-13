import * as path from 'path';
import { fileURLToPath } from 'url';
import { Context } from 'build-scripts';
import consola from 'consola';
import type { CommandArgs, CommandName } from 'build-scripts';
import type { ExportData } from '@ice/types/esm/generator.js';
import type { ExtendsPluginAPI } from '@ice/types/esm/plugin.js';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import Generator from './service/runtimeGenerator.js';
import { createEsbuildCompiler } from './service/compile.js';
import createWatch from './service/watchSource.js';
import start from './commands/start.js';
import build from './commands/build.js';
import getContextConfig from './utils/getContextConfig.js';
import getWatchEvents from './getWatchEvents.js';
import { getAppConfig } from './analyzeRuntime.js';
import { initProcessEnv, updateRuntimeEnv, getCoreEnvKeys } from './utils/runtimeEnv.js';
import getRuntimeModules from './utils/getRuntimeModules.js';
import { generateRoutesInfo } from './routes.js';
import webPlugin from './plugins/web/index.js';
import configPlugin from './plugins/config.js';
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

  const ctx = new Context<any, ExtendsPluginAPI>({
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
    getBuiltInPlugins: () => {
      return [webPlugin, configPlugin];
    },
  });
  await ctx.resolveConfig();
  const { userConfig } = ctx;

  // load dotenv, set to process.env
  await initProcessEnv(rootDir, command, commandArgs, userConfig);
  const coreEnvKeys = getCoreEnvKeys();

  const { routes: routesConfig } = userConfig;
  const routesRenderData = generateRoutesInfo(rootDir, routesConfig);
  const { routeManifest } = routesRenderData;
  generator.modifyRenderData((renderData) => ({
    ...renderData,
    ...routesRenderData,
    coreEnvKeys,
  }));
  dataCache.set('routes', JSON.stringify(routeManifest));

  const runtimeModules = getRuntimeModules(ctx.getAllPlugin());

  await ctx.setup();

  addWatchEvent(
    ...getWatchEvents({ generator, targetDir, templateDir, cache: dataCache, ctx }),
  );

  const contextConfig = getContextConfig(ctx, {
    port: commandArgs.port,
  });
  const webTask = contextConfig.find(({ name }) => name === 'web');

  // render template before webpack compile
  const renderStart = new Date().getTime();
  generator.modifyRenderData((renderData) => ({
    ...renderData,
    runtimeModules,
  }));
  generator.render();
  consola.debug('template render cost:', new Date().getTime() - renderStart);

  const esbuildCompile = createEsbuildCompiler({
    rootDir,
    task: webTask,
  });

  let appConfig: AppConfig;
  if (command === 'build') {
    try {
      // should after generator, otherwise it will compile error
      appConfig = await getAppConfig({ esbuildCompile, rootDir });
    } catch (err) {
      consola.warn('Failed to get app config:', err.message);
      consola.debug(err);
    }
  }

  let disableRouter = false;
  if (userConfig.removeHistoryDeadCode) {
    let routesCount = 0;
    routeManifest && Object.keys(routeManifest).forEach((key) => {
      const routeItem = routeManifest[key];
      if (!routeItem.layout) {
        routesCount += 1;
      }
    });

    if (routesCount <= 1) {
      consola.info('[ice] removeHistoryDeadCode is enabled and only have one route, ice build will remove history and react-router dead code.');
      disableRouter = true;
    }
  }

  updateRuntimeEnv(appConfig, disableRouter);

  return {
    run: async () => {
      if (command === 'start') {
        return await start(ctx, contextConfig, esbuildCompile);
      } else if (command === 'build') {
        return await build(ctx, contextConfig, esbuildCompile);
      }
    },
  };
}


export default createService;