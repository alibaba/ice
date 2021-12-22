import chalk from 'chalk';
import { ITaskConfig } from 'build-scripts';
import { build } from 'vite';
import { wp2vite } from './wp2vite';

type BuildResult = void | ITaskConfig[];

export async function viteBuild(context: any): Promise<BuildResult> {
  const { applyHook, command, commandArgs } = context;

  const configArr = context.getWebpackConfig();
  await applyHook(`before.${command}.load`, { args: commandArgs, webpackConfig: configArr });

  const prodConfig = wp2vite(context);

  await applyHook(`before.${command}.run`, {
    args: commandArgs,
    config: prodConfig,
  });

  try {
    await build(prodConfig);
    context.applyHook('after.build.compile');
  } catch (err) {
    console.error('CONFIG', chalk.red('Failed to load vite config.'));
    throw err;
  }
}
