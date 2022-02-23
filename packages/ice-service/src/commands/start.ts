import WebpackDevServer from 'webpack-dev-server';
import type { Context } from 'build-scripts';
import { getWebpackConfig } from '@builder/webpack-config';
import defaultsDeep from 'lodash.defaultsdeep';
import { join } from 'path';
import webpackCompiler from '../service/webpackCompiler';
import prepareURLs from '../utils/prepareURLs';
import type { IFrameworkConfig } from '@builder/webpack-config';

type DevServerConfig = Record<string, any>;
// TODO config type of ice.js
const start = async (context: Context<any>) => {
  const { getConfig, applyHook, commandArgs, command, rootDir } = context;

  const config: IFrameworkConfig = {
    entry: './src/app.js',
    outputDir: join(rootDir, './build'),
  };
  // const config = getConfig() as IFrameworkConfig[];
  // if (!config.length) {
  //   const errMsg = 'Task config is not found';
  //   await applyHook('error', { err: new Error(errMsg) });
  //   return;
  // }

  // transform config to webpack config
  const webpackConfig = getWebpackConfig({
    dir: rootDir,
    // frameworkConfig: config[0],
    frameworkConfig: config,
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
  const devServer = new WebpackDevServer(compiler, devServerConfig);
  devServer.startCallback(() => {
    applyHook('after.start.devServer', {
      urls, devServer,
    });
  });
  return devServer;
};

export default start;
