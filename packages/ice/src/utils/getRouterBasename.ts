import type { AppConfig } from '@ice/runtime';
import type { Config } from '@ice/types';
import type { TaskConfig } from 'build-scripts';

const getRouterBasename = (taskConfig: TaskConfig<Config>, appConfig: AppConfig) => {
  return taskConfig?.config?.basename || appConfig?.router?.basename;
};

export default getRouterBasename;
