import { ITaskConfig, Context } from 'build-scripts';
import chalk from 'chalk';
import { ViteDevServer, createServer } from 'vite';
import { wp2vite } from './wp2vite';

type StartResult = void | ITaskConfig[] | ViteDevServer;

export async function viteStart(context: Context): Promise<StartResult> {
  const { applyHook, command, commandArgs } = context;

  const configArr = context.getWebpackConfig();
  await applyHook(`before.${command}.load`, {
    args: commandArgs,
    webpackConfig: configArr,
  });

  if (!configArr.length) {
    const errorMsg = 'No config found.';
    await applyHook('error', { err: new Error(errorMsg) });
    return;
  }

  const devConfig = wp2vite(context);

  await applyHook(`before.${command}.run`, {
    args: commandArgs,
    config: devConfig,
  });

  let devServer: ViteDevServer;
  try {
    devServer = await createServer(devConfig);
  } catch (err) {
    console.error('CONFIG', chalk.red('Failed to load vite config.'));
    await applyHook('error', { err });
    throw err;
  }

  const viteServer = await devServer.listen();
  devServer.printUrls();

  return viteServer;
}
