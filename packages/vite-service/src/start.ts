import { ITaskConfig } from 'build-scripts';
import { ViteDevServer, createServer } from 'vite';
import chalk = require('chalk');
import { wp2vite } from './wp2vite';

type StartResult = void | ITaskConfig[] | ViteDevServer;

export async function viteStart(context: any): Promise<StartResult> {
  const { devConfig } = wp2vite(context);

  let devServer: ViteDevServer;
  try {
    devServer = await createServer(devConfig);
  } catch (err) {
    console.error('CONFIG', chalk.red('Failed to load vite config.'));
    throw err;
  }

  const viteServer = await devServer.listen();

  return viteServer;
}