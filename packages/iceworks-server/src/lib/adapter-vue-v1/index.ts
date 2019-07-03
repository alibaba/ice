import getBaseAdapter from '../adapter';

import Configuration from './modules/configuration';
import Task from './modules/task';

export default (i18n) => {
  const baseAdapter = getBaseAdapter(i18n);

  return {
    Guide: baseAdapter.Guide,
    Layout: baseAdapter.Layout,
    Git: baseAdapter.Git,
    OSS: baseAdapter.OSS,
    Todo: baseAdapter.Todo,
    Dependency: baseAdapter.Dependency,
    Task: {
      ...baseAdapter.Task,
      module: Task
    },
    Configuration: {
      ...baseAdapter.Configuration,
      module: Configuration
    }
  };
};
