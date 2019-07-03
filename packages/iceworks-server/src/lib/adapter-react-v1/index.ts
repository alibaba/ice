/**
 * icescripts 1.0 + kit 2.0
 */
import getBaseAdapter from '../adapter';
import Menu from './modules/menu';
import Router from './modules/router';

export default (i18n) => {
  const baseAdapter = getBaseAdapter(i18n);

  console.log('BaseAdapter', baseAdapter);

  return {
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
};
