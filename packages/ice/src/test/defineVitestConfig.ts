import type { UserConfigExport, ConfigEnv, UserConfig, UserConfigFn } from 'vitest/config';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import getTaskConfig from './getTaskConfig.js';

const { merge } = lodash;

export default function defineVitestConfig(userConfig: UserConfigExport): UserConfigFn {
  return async (env: ConfigEnv) => {
    // Support vitest configuration (object or function) Ref: https://github.com/vitest-dev/vitest/blob/e5c40cff0925c3c12d8cdfa59f5649d3562668ce/packages/vitest/src/config.ts#L3
    let customConfig: UserConfig;
    if (typeof userConfig === 'function') {
      customConfig = await userConfig(env);
    } else {
      customConfig = await userConfig;
    }

    const defaultConfig = await getDefaultConfig();

    return merge(defaultConfig, customConfig);
  };
}

async function getDefaultConfig() {
  const taskConfig = await getTaskConfig();
  const { config: { alias = {} } } = taskConfig;
  return {
    resolve: {
      alias,
    },
  };
}
