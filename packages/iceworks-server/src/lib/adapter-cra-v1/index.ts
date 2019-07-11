/**
 * create-react-app + kit 3.0
 */
import { checkAliInternal } from 'ice-npm-utils';
import getBaseAdapter from '../adapter';
import Task from './modules/task';

export default async (i18n) => {
  const baseAdapter = await getBaseAdapter(i18n);

  /* The configuration module is not used because the customized configuration provided by
  create-react-app is not supported in iceworks */
  const adapter = {
    Guide: baseAdapter.Guide,
    Layout: baseAdapter.Layout,
    Page: baseAdapter.Page,
    Router: baseAdapter.Router,
    Menu: baseAdapter.Menu,
    QuickDev: baseAdapter.QuickDev,
    QuickBuild: baseAdapter.QuickBuild,
    Git: baseAdapter.Git,
    OSS: baseAdapter.OSS,
    DEF: baseAdapter.DEF,
    Todo: baseAdapter.Todo,
    Dependency: baseAdapter.Dependency,
    Task: {
      ...baseAdapter.Task,
      module: Task
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
