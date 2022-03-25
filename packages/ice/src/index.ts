import * as path from 'path';
import { fileURLToPath } from 'url';
import { Context } from 'build-scripts';
import consola from 'consola';
import type { CommandArgs, CommandName, IGetBuiltInPlugins } from 'build-scripts';
import type { ExportData } from '@ice/types/esm/generator.js';
import type { ExtendsPluginAPI } from '@ice/types/esm/plugin.js';
import Generator from './service/runtimeGenerator.js';
import { createEsbuildCompiler } from './service/compile.js';
import createWatch from './service/watchSource.js';
import start from './commands/start.js';
import build from './commands/build.js';
import getContextConfig from './utils/getContextConfig.js';
import { generateRoutesInfo } from './routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface CreateServiceOptions {
  rootDir: string;
  command: CommandName;
  commandArgs: CommandArgs;
  getBuiltInPlugins: IGetBuiltInPlugins;
}

async function createService({ rootDir, command, commandArgs, getBuiltInPlugins }: CreateServiceOptions) {
  const { addWatchEvent, removeWatchEvent } = createWatch(path.join(rootDir, 'src'), command);
  const srcDir = path.join(rootDir, 'src');
  const tmpDirName = '.ice';
  const tmpDir = path.join(rootDir, tmpDirName);

  const { routes, routesStr } = generateRoutesInfo(rootDir);
  const generator = new Generator({
    rootDir,
    targetDir: tmpDirName,
    // TODO get default Data
    defaultRenderData: {
      routesStr,
      routes,
    },
  });

    // add default template of ice
  const templatePath = path.join(__dirname, '../template/');
  generator.addTemplateFiles(templatePath);

  addWatchEvent([
    srcDir,
    (eventName) => {
      if (eventName === 'add' || eventName === 'unlink') {
        // TODO: only watch src/layout.tsx and src/pages/**
        const { routes, routesStr } = generateRoutesInfo(rootDir);
        generator.renderFile(
          path.join(templatePath, 'routes.ts.ejs'),
          path.join(tmpDir, 'routes.ts'),
          { routesStr },
        );
        generator.renderFile(
          path.join(templatePath, 'route-manifest.json.ejs'),
          path.join(tmpDir, 'route-manifest.json'),
          { routes },
        );
      }
    },
  ]);
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
    extendsPluginAPI: {
      generator: generatorAPI,
      watch: {
        addEvent: addWatchEvent,
        removeEvent: removeWatchEvent,
      },
      context: {},
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
