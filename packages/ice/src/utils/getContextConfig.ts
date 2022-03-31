import * as path from 'path';
import { createRequire } from 'module';
import type { Context } from 'build-scripts';
import type { Config } from '@ice/types';
import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { UnpluginOptions } from 'unplugin';
import { getWebpackConfig, getTransformPlugins as getBuiltInPlugins } from '@ice/webpack-config';
import { builtInPlugins } from '../constant.js';

export interface ContextConfig {
  name: string;
  taskConfig: Config;
  webpackConfig: Configuration & {
    devServer?: DevServerConfiguration;
  };
  getTransformPlugins: (config?: Partial<Config>) => UnpluginOptions[];
}
const require = createRequire(import.meta.url);

function getContextConfig(context: Context<Config>): ContextConfig[] {
  const { getConfig, rootDir } = context;
  const contextConfig = getConfig();
  if (!contextConfig.length) {
    throw new Error('Task config is not Found');
  }
  const configs = contextConfig.map(({ config, name }) => {
    // add runtime alias for built-in plugins
    const builtInAlias = {};
    builtInPlugins.forEach((pluginName) => {
      builtInAlias[`${pluginName}/runtime`] = path.join(require.resolve(pluginName), '../../runtime');
    });
    const webpackConfig = getWebpackConfig({
      rootDir,
      config: {
        ...config,
        alias: {
          ...(config.alias || {}),
          ...builtInAlias,
        },
      },
    });
    const getTransformPlugins = (customConfig?: Partial<Config>) => {
      return getBuiltInPlugins(rootDir, {
        ...config,
        ...(customConfig || {}),
      });
    };
    return {
      name,
      taskConfig: config,
      webpackConfig,
      getTransformPlugins,
    };
  });
  return configs;
}

export default getContextConfig;