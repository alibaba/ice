import * as _ from '@builder/pack/deps/lodash';
import type { IUserConfig } from 'build-scripts';

const invalidConfig = {
  root: false,
  mode: false,
  base: 'publicPath',
  define: 'define',
  plugins: 'vitePlugins',
  publicDir: false,
  'resolve.alias': 'alias',
  'css.postcss': 'postcssOptions',
  'css.preprocessorOptions.scss': 'sassLoaderOptions',
  'css.preprocessorOptions.less': 'lessLoaderOptions',
  'server.host': '--host',
  'server.post': '--post',
  'server.https': '--https',
  'build.outDir': 'outputDir',
  'build.minify': 'minify',
  'build.terserOptions': 'minify',
};

const getInvalidMessage = (userConfig: IUserConfig) => {
  let msg = '';
  Object.keys(invalidConfig).some((configKey) => {
    const viteConfigKey = `vite.${configKey}`;
    if (_.get(userConfig, viteConfigKey) !== undefined) {
      msg = `configuration of ${viteConfigKey} is invalid in icejs`;
      if (invalidConfig[configKey]) {
        msg += `, try to use ${invalidConfig[configKey]}`;
      }
      return true;
    }
    return false;
  });
  return msg;
};

export default getInvalidMessage;