import { Context } from 'build-scripts';
import type webpack from 'webpack';
import type { CommandArgs, CommandName, IPluginAPI } from 'build-scripts';
import Generator from './service/runtimeGenerator';
import preCompile from './service/preCompile';
import start from './commands/start';
import build from './commands/build';
import type { ExportData } from './service/runtimeGenerator';

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
// TODO import from @builder/webpack-config
interface FrameworkConfig {
  entry: string;
}

export interface FrameworkPlugin<T = undefined> {
  (api: IPluginAPI<FrameworkConfig, ExtendsPluginAPI>, options?: T): Promise<void> | void;
}

async function createService(rootDir: string, command: CommandName, commandArgs: CommandArgs) {
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
      generator.addExport('export', exportData);
    },
    addExportTypes: (exportData: ExportData) => {
      generator.addExport('exportTypes', exportData);
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
  });
  await ctx.resolveConfig();
  generator.setPlugins(ctx.getAllPlugin());
  ctx.setup();
  // render template before webpack compile
  generator.render();

  if (command === 'start') {
    await start(ctx);
  } else if (command === 'build') {
    await build(ctx);
  }
}

export default createService;
