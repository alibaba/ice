import type { Context } from 'build-scripts';
import type { Config } from '@ice/types';
import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { getWebpackConfig } from '@ice/webpack-config';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import type { ExtendsPluginAPI } from '@ice/types/esm/plugin.js';

const { mergeWith } = lodash;

export type WebpackConfig = Configuration & {
  devServer?: DevServerConfiguration;
};

export interface ContextConfig {
  name: string;
  taskConfig: Config;
  webpackConfig: WebpackConfig;
}

function getContextConfig(context: Context<Config, ExtendsPluginAPI>, customConfig: Partial<Config>): ContextConfig[] {
  const { getConfig, rootDir, extendsPluginAPI } = context;

  const contextConfig = getConfig();
  if (!contextConfig.length) {
    throw new Error('Task config is not Found');
  }
  const configs = contextConfig.map(({ config, name }) => {
    const webpackConfig = getWebpackConfig({
      rootDir,
      webpack: extendsPluginAPI.context!.webpack,
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