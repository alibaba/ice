import type { AppConfig } from '@ice/runtime-kit';
import type { Config } from '@ice/shared-config/types';
import type { TaskConfig } from 'build-scripts';

const getRouterBasename = (taskConfig: TaskConfig<Config>, appConfig: AppConfig) => {
  const basename = appConfig?.router?.basename ?? taskConfig?.config?.basename ?? '';
  return basename.charAt(0) === '/' ? basename : `/${basename}`;
};

export default getRouterBasename;
