import { createRequire } from 'module';
import * as path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import type { Context } from 'build-scripts';
import { getWebpackConfig, getTransformPlugins } from '@builder/webpack-config';
import lodash from '@builder/pack/deps/lodash/lodash.js';
import webpackCompiler from '../service/webpackCompiler.js';
import prepareURLs from '../utils/prepareURLs.js';
import type { Config } from '@ice/types';

const require = createRequire(import.meta.url);
const { defaultsDeep } = lodash;

interface IWebTaskConfig {
  name: string;
  config: Config;
}

type DevServerConfig = Record<string, any>;
// TODO config type of ice.js
const start = async (context: Context<Config>) => {
  const { getConfig, applyHook, commandArgs, command, rootDir } = context;

  // FIXME: getConfig -> getConfigs, because getConfig will return an array
  const configs = getConfig();
  if (!configs.length) {
    const errMsg = 'Task config is not found';
    await applyHook('error', { err: new Error(errMsg) });
    return;
  }
  const webConfig = configs.find(({ name }) => name === 'web');
  if (!webConfig) {
    const errMsg = 'Web task config is not found';
    await applyHook('error', { err: new Error(errMsg) });
    return;
  }
  const { config } = webConfig as IWebTaskConfig;
  config.alias = {
    ...config.alias,
    // TODO: 放在各自插件里还是放在 ice 里？
    // TODO: make pkg.json exports works; build 复用逻辑
    // '@ice/plugin-auth/runtime': require.resolve('@ice/plugin-auth/runtime'),
    '@ice/plugin-auth/runtime': path.join(require.resolve('@ice/plugin-auth'), '../../runtime'),
  };

  // transform config to webpack config
  const webpackConfig = getWebpackConfig({
    rootDir,
    config,
  });

  let devServerConfig: DevServerConfig = {
    port: commandArgs.port || 3333,
    host: commandArgs.host || '0.0.0.0',
    https: commandArgs.https || false,
  };

  // merge devServerConfig with webpackConfig.devServer
  devServerConfig = defaultsDeep(webpackConfig.devServer, devServerConfig);

  const protocol = devServerConfig.https ? 'https' : 'http';
  const urls = prepareURLs(
    protocol,
    devServerConfig.host,
    devServerConfig.port,
  );
  const transformPlugins = getTransformPlugins(rootDir, config);
  const compiler = await webpackCompiler({
    config: webpackConfig,
    urls,
    commandArgs,
    command,
    applyHook,
    transformPlugins,
  });
  const devServer = new WebpackDevServer(devServerConfig, compiler);
  devServer.startCallback(() => {
    applyHook('after.start.devServer', {
      urls, devServer,
    });
  });
  return devServer;
};

export default start;
