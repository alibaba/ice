import * as chalk from 'chalk';
import { ITaskConfig } from 'build-scripts';
import { build } from 'vite';
import { wp2vite } from './wp2vite';

type BuildResult = void | ITaskConfig[];

export async function viteBuild(context: any): Promise<BuildResult> {
  const { prodConfig } = wp2vite(context);

  try {
    await build(prodConfig);
  } catch (err) {
    console.error('CONFIG', chalk.red('Failed to load vite config.'));
    throw err;
  }
}