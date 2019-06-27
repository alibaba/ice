import baseAdapter from '../adapter';

import Configuration from './modules/configuration';
import Task from './modules/task';

export default {
  ...baseAdapter,
  Task: {
    ...baseAdapter.Task,
    module: Task
  },
  Configuration: {
    ...baseAdapter.Configuration,
    module: Configuration
  }
};
