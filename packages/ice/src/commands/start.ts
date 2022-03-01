import WebpackDevServer from 'webpack-dev-server';
import type { Context } from 'build-scripts';
import { getWebpackConfig } from '@builder/webpack-config';
import lodash from '@builder/pack/deps/lodash/lodash.js';
import webpackCompiler from '../service/webpackCompiler.js';
import prepareURLs from '../utils/prepareURLs.js';
import type { Config } from '@ice/types';

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

  const compiler = await webpackCompiler({
    config: webpackConfig,
    urls,
    commandArgs,
    command,
    applyHook,
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
