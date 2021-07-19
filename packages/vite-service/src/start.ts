import * as chalk from 'chalk';
import { ITaskConfig } from 'build-scripts';
import { ViteDevServer, createServer } from 'vite';
import { wp2vite } from './wp2vite';

type StartResult = void | ITaskConfig[] | ViteDevServer;

export async function viteStart(context: any): Promise<StartResult> {
  const config = wp2vite(context, true);

  let devServer: ViteDevServer;
  try {
    devServer = await createServer(config);
  } catch (err) {
    console.error('CONFIG', chalk.red('Failed to load vite config.'));
    throw err;
  }

  const viteServer = await devServer.listen();

  return viteServer;
}