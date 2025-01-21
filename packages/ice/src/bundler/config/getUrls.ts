import type { TaskConfig } from 'build-scripts';
import type { Config } from '@ice/shared-config/types';
import type { AppConfig } from '@ice/runtime-kit';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { Configuration as RSPackDevServerConfiguration } from '@rspack/dev-server';

import prepareURLs from '../../utils/prepareURLs.js';
import getRouterBasename from '../../utils/getRouterBasename.js';

interface Options {
  taskConfig: TaskConfig<Config>;
  appConfig: AppConfig;
  devServerConfig: DevServerConfiguration | RSPackDevServerConfiguration;
}

const getUrls = ({
  taskConfig,
  appConfig,
  devServerConfig,
}: Options) => {
  const urlPathname = getRouterBasename(taskConfig, appConfig) || '/';
  const protocol = devServerConfig.https ? 'https' : 'http';
  const enabledHashRouter = appConfig.router?.type === 'hash';
  const urls = prepareURLs(
    protocol,
    devServerConfig.host,
    devServerConfig.port as number,
    urlPathname.endsWith('/') ? urlPathname : `${urlPathname}/`,
    enabledHashRouter,
  );

  return urls;
};

export const getUrlInfo = (routePaths: string[]) => {
  return {
    devPath: (routePaths[0] || '').replace(/^[/\\]/, ''),
    routePaths: routePaths.map((routePath) => (routePath || '').replace(/^[/\\]/, '')),
  };
};

export default getUrls;
