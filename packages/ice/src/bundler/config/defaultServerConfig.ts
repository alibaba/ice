import detectPort from 'detect-port';
import type { CommandArgs } from 'build-scripts';
import type { Configuration } from 'webpack-dev-server';
import type { Configuration as DevServerConfiguration } from '@rspack/dev-server';
import { DEFAULT_HOST, DEFAULT_PORT } from '../../constant.js';

async function getDefaultServerConfig(devServerConfig: Configuration | DevServerConfiguration, commandArgs: CommandArgs) {
  // Get the value of the host and port from the command line, environment variables, and webpack config.
  // Value priority: process.env.PORT > commandArgs > webpackConfig > DEFAULT.
  const host = process.env.HOST ||
    commandArgs.host ||
    devServerConfig?.host ||
    DEFAULT_HOST;
  const port = process.env.PORT ||
    commandArgs.port ||
    devServerConfig?.port ||
    await detectPort(DEFAULT_PORT);

  return { host, port };
}

export default getDefaultServerConfig;
