import WebpackDevServer from 'webpack-dev-server';
import type { Context } from 'build-scripts';
import webpackCompiler from '../service/webpackCompiler';
import prepareURLs from '../utils/prepareURLs';

type DevServerConfig = Record<string, any>;
// TODO config type of ice.js
const start = async (context: Context<any>) => {
  const { getConfig, applyHook, commandArgs, command } = context;
  const config = getConfig();
  // transform config to webpack config
  if (!config.length) {
    const errMsg = 'Task config is not found';
    await applyHook('error', { err: new Error(errMsg) });
    return;
  }
  let devServerConfig: DevServerConfig = {
    port: commandArgs.port || 3333,
    host: commandArgs.host || '0.0.0.0',
    https: commandArgs.https || false,
  };

  // TODO merge devServerConfig with webpackConfig.devServer
  const protocol = devServerConfig.https ? 'https' : 'http';
  const urls = prepareURLs(
    protocol,
    devServerConfig.host,
    devServerConfig.port,
  );

  const compiler = await webpackCompiler({
    config: {},
    urls,
    commandArgs,
    command,
    applyHook,
  });
  const devServer = new WebpackDevServer(compiler, devServerConfig);
  devServer.startCallback(() => {
    applyHook('after.start.devServer', {
      urls, devServer,
    });
  });
  return devServer;
};

export default start;
