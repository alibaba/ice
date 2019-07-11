import { checkAliInternal } from 'ice-npm-utils';
import getBaseAdapter from '../adapter';
import Configuration from './modules/configuration';
import Task from './modules/task';

export default async (i18n) => {
  const baseAdapter = await getBaseAdapter(i18n);
  const adapter = {
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

  const isAliInternal = await checkAliInternal();
  const filteredPanels = isAliInternal ? ['OSS'] : ['DEF'];
  Object.keys(adapter).forEach((name) => {
    if (filteredPanels.indexOf(name) > -1) {
      delete adapter[name];
    }
  });
  return adapter;
};
