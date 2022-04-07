import chalk from 'chalk';
import { ITaskConfig } from 'build-scripts';
import { build } from 'vite';
import { wp2vite } from './wp2vite';

type BuildResult = void | ITaskConfig[];

export async function viteBuild(context: any): Promise<BuildResult> {
  const { applyHook, command, commandArgs } = context;

  const configArr = context.getWebpackConfig();
  const prodConfig = configArr.length > 0 ? wp2vite(context) : {};
  await applyHook(`before.${command}.load`, { args: commandArgs, webpackConfig: configArr, viteConfig: prodConfig });

  if (!configArr.length) {
    const errorMsg = 'No config found.';
    await applyHook('error', { err: new Error(errorMsg) });
    return;
  }

  await applyHook(`before.${command}.run`, {
    args: commandArgs,
    config: prodConfig,
  });

  try {
    await build(prodConfig);
    context.applyHook('after.build.compile', {
      args: commandArgs,
      config: prodConfig,
    });
  } catch (err) {
    console.error('Vite', chalk.red('Failed to build.'));
    throw err;
  }
}
