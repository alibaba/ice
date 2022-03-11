import * as path from 'path';
import { fileURLToPath } from 'url';
import { Context } from 'build-scripts';
import consola from 'consola';
import type { CommandArgs, CommandName, IGetBuiltInPlugins } from 'build-scripts';
import type { ExportData } from '@ice/types/esm/generator.js';
import type { ExtendsPluginAPI, Routes } from '@ice/types/esm/plugin.js';
import Generator from './service/runtimeGenerator.js';
import { createEsbuildCompiler } from './service/compile.js';
import createWatch from './service/watchSource.js';
import start from './commands/start.js';
import build from './commands/build.js';
import getContextConfig from './utils/getContextConfig.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface CreateServiceOptions {
  rootDir: string;
  command: CommandName;
  commandArgs: CommandArgs;
  getBuiltInPlugins: IGetBuiltInPlugins;
}

async function createService({ rootDir, command, commandArgs, getBuiltInPlugins }: CreateServiceOptions) {
  // TODO: watch and generate routeManifest
  const routes: Routes = [{
    path: '/*',
    filepath: path.join(rootDir, 'src/pages/home'),
    chunkName: 'home',
    componentName: 'Home',
  }];

  const generator = new Generator({
    rootDir,
    targetDir: './.ice',
    // TODO get default Data
    defaultRenderData: {
      routes,
    },
  });
  // add default template of ice
  const templatePath = path.join(__dirname, '../template/');
  generator.addTemplateFiles(templatePath);
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
  const { addWatchEvent, removeWatchEvent } = createWatch(path.join(rootDir, 'src'), command);
  const ctx = new Context<any, ExtendsPluginAPI>({
    rootDir,
    command,
    commandArgs,
    extendsPluginAPI: {
      generator: generatorAPI,
      watch: {
        addEvent: addWatchEvent,
        removeEvent: removeWatchEvent,
      },
      context: {
        routes,
      },
    },
    getBuiltInPlugins,
  });
  await ctx.resolveConfig();
  generator.setPlugins(ctx.getAllPlugin());
  await ctx.setup();
  // render template before webpack compile
  const renderStart = new Date().getTime();
  generator.render();
  consola.debug('template render cost:', new Date().getTime() - renderStart);

  const contextConfig = getContextConfig(ctx);
  const webTask = contextConfig.find(({ name }) => name === 'web');
  const esbuildCompile = createEsbuildCompiler({
    alias: webTask.webpackConfig.resolve.alias as Record<string, string>,
    getTransformPlugins: webTask.getTransformPlugins,
  });

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
