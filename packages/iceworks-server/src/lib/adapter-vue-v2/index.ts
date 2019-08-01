import { checkAliInternal } from 'ice-npm-utils';
import getBaseAdapter from '../adapter';
import Configuration from './modules/configuration';
import Task from './modules/task';
import Page from './modules/page';

export default async i18n => {
  const baseAdapter = await getBaseAdapter(i18n);
  const {
    Guide,
    Layout,
    Page: basePage,
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
    QuickDev,
    QuickBuild,
    Router,
    Menu,
    Page: {
      ...basePage,
      module: Page,
    },
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
