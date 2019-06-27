import baseAdapter from '../adapter';

import Configuration from './modules/configuration';
import Task from './modules/task';

export default {
  Guide: baseAdapter.Guide,
  Layout: baseAdapter.Layout,
  Git: baseAdapter.Git,
  OSS: baseAdapter.OSS,
  DEF: baseAdapter.DEF,
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
