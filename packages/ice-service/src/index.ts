import { Context } from 'build-scripts';
import type webpack from 'webpack';
import type { CommandArgs, CommandName, IPluginAPI, IGetBuiltInPlugins } from 'build-scripts';
import Generator from './service/runtimeGenerator';
import preCompile from './service/preCompile';
import start from './commands/start';
import build from './commands/build';
import type { ExportData } from './service/runtimeGenerator';
import type { Config } from '@builder/webpack-config';

type AddExport = (exportData: ExportData) => void;

interface ExtendsPluginAPI {
  context: {
    // TODO define routeManifest
    routeManifest: any;
    webpack?: typeof webpack;
  };
  generator: {
    addExport: AddExport;
    addExportTypes: AddExport;
    addConfigTypes: AddExport;
    addRenderFile: Generator['addRenderFile'];
    addRenderTemplate: Generator['addTemplateFiles'];
  };
}

export interface FrameworkPlugin<T = undefined> {
  (api: IPluginAPI<Config, ExtendsPluginAPI>, options?: T): Promise<void> | void;
}

interface CreateServiceOptions {
  rootDir: string;
  command: CommandName;
  commandArgs: CommandArgs;
  getBuiltInPlugins: IGetBuiltInPlugins;
}

async function createService({ rootDir, command, commandArgs, getBuiltInPlugins }: CreateServiceOptions) {
  // TODO pre compile
  preCompile();
  const routeManifest = {};
  const generator = new Generator({
    rootDir,
    targetDir: './.ice',
     // TODO get default Data
    defaultData: {},
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
    extendsPluginAPI: {
      generator: generatorAPI,
      context: {
        routeManifest,
      },
    },
    getBuiltInPlugins,
  });
  await ctx.resolveConfig();
  generator.setPlugins(ctx.getAllPlugin());
  await ctx.setup();
  // render template before webpack compile
  generator.render();

  return {
    run: async () => {
      if (command === 'start') {
        return await start(ctx);
      } else if (command === 'build') {
        return await build(ctx);
      }
    },
  };
}

export default createService;
