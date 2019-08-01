import { checkAliInternal } from 'ice-npm-utils';
import getBaseAdapter from '../adapter';
import Configuration from './modules/configuration';
import Task from './modules/task';

export default async (i18n) => {
  const baseAdapter = await getBaseAdapter(i18n);
  const {
    Guide,
    Layout,
    Git,
    OSS,
    Todo,
    Dependency,
    Task: baseTask,
    Configuration: baseConfiguration,
  } = baseAdapter;

  const adapter = {
    Guide,
    Layout,
    Git,
    OSS,
    Todo,
    Dependency,
    Task: {
      ...baseTask,
      module: Task,
    },
    Configuration: {
      ...baseConfiguration,
      module: Configuration,
    },
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
