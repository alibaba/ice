import type { Context, TaskConfig } from 'build-scripts';
import type { Config } from '@ice/webpack-config/esm/types';
import type ora from '@ice/bundles/compiled/ora/index.js';

function test(
  context: Context<Config>,
  options: {
    taskConfigs: TaskConfig<Config>[];
    spinner: ora.Ora;
  },
) {
  const { taskConfigs, spinner } = options;
  spinner.stop();
  return {
    taskConfigs,
    context,
  };
}

export default test;
