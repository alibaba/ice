/**
 * icescripts 1.0 + kit 2.0
 */
import { checkAliInternal } from 'ice-npm-utils';
import getBaseAdapter from '../adapter';
import Menu from './modules/menu';
import Router from './modules/router';

export default async (i18n) => {
  const baseAdapter = await getBaseAdapter(i18n);
  const adapter = {
    Guide: baseAdapter.Guide,
    Layout: baseAdapter.Layout,
    Page: baseAdapter.Page,
    QuickDev: baseAdapter.QuickDev,
    QuickBuild: baseAdapter.QuickBuild,
    Git: baseAdapter.Git,
    OSS: baseAdapter.OSS,
    DEF: baseAdapter.DEF,
    Todo: baseAdapter.Todo,
    Dependency: baseAdapter.Dependency,
    Task: baseAdapter.Task,
    Router: {
      ...baseAdapter.Router,
      module: Router
    },
    Menu: {
      ...baseAdapter.Menu,
      module: Menu
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
