import { checkAliInternal } from 'ice-npm-utils';
import getBaseAdapter from '../adapter';
import Configuration from './modules/configuration';
import Task from './modules/task';

export default async i18n => {
  const baseAdapter = await getBaseAdapter(i18n);
  const {
    Guide,
    Layout,
    Page,
    QuickDev,
    QuickBuild,
    Git,
    OSS,
    Todo,
    Dependency,
    Task: baseTask,
    Configuration: baseConfiguration,
    Router,
    Menu,
  } = baseAdapter;

  const adapter = {
    Guide,
    Layout,
    Git,
    OSS,
    Todo,
    Dependency,
    Page,
    QuickDev,
    QuickBuild,
    Router,
    Menu,
    Task: {
      ...baseTask,
      module: Task,
    },
    Configuration: {
      ...baseConfiguration,
      module: Configuration,
    },
  };

  return adapter;
};
