import type { Context } from 'build-scripts';
import type { Config } from '@ice/types';
import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { getWebpackConfig } from '@ice/webpack-config';
import mergeWith from 'lodash.mergewith';

export interface ContextConfig {
  name: string;
  taskConfig: Config;
  webpackConfig: Configuration & {
    devServer?: DevServerConfiguration;
  };
}

function getContextConfig(context: Context<Config>, customConfig: Partial<Config>): ContextConfig[] {
  const { getConfig, rootDir } = context;

  const contextConfig = getConfig();
  if (!contextConfig.length) {
    throw new Error('Task config is not Found');
  }
  const configs = contextConfig.map(({ config, name }) => {
    const webpackConfig = getWebpackConfig({
      rootDir,
      config: mergeWith(config, customConfig, (objValue, srcValue) => {
        if (Array.isArray(objValue)) {
          return objValue.concat(srcValue);
        }
      }),
    });
    return {
      name,
      taskConfig: config,
      webpackConfig,
    };
  });
  return configs;
}

export default getContextConfig;