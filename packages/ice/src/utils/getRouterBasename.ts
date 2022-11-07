import type { AppConfig } from '@ice/runtime';
import type { Config } from '@ice/webpack-config/esm/types';
import type { TaskConfig } from 'build-scripts';

const getRouterBasename = (taskConfig: TaskConfig<Config>, appConfig: AppConfig) => {
  return appConfig?.router?.basename ?? taskConfig?.config?.basename ?? '';
};

export default getRouterBasename;
