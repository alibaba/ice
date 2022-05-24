import type { TaskConfig } from 'build-scripts';
import type { Config } from '@ice/types';
import lodash from '@ice/bundles/compiled/lodash/index.js';

const { mergeWith } = lodash;

function mergeTaskConfig(
  taskConfigs: TaskConfig<Config>[],
  customConfig: Partial<Config>,
): TaskConfig<Config>[] {
  if (!taskConfigs.length) {
    throw new Error('Task config is not Found');
  }
  return taskConfigs.map(({ config, name, ...rest }) => {
    return {
      ...rest,
      name,
      config: mergeWith(config, customConfig, (objValue, srcValue) => {
        if (Array.isArray(objValue)) {
          return objValue.concat(srcValue);
        }
      }),
    };
  });
}

export default mergeTaskConfig;