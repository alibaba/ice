import { Context } from 'build-scripts';
import type { CommandArgs, CommandName } from 'build-scripts';
import Generator from './service/runtimeGenerator';
import preCompile from './service/preCompile';
import start from './commands/start';
import build from './commands/build';

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
  const ctx = new Context({
    rootDir,
    command,
    commandArgs,
    extendsPluginAPI: {
      addExport: () => {},
      addExportTypes: () => {},
      addConfigTypes: () => {},
      context: {
        routeManifest,
      },
    },
  });
  await ctx.resolveConfig();
  generator.setPlugins(ctx.getAllPlugin());
  ctx.setup();
  generator.render();

  if (command === 'start') {
    await start(ctx);
  } else if (command === 'build') {
    await build(ctx);
  }
}

export default createService;
