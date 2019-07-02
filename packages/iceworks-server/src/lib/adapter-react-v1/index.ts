/**
 * icescripts 1.0 + kit 2.0
 */
import getBaseAdapter from '../adapter';
import Menu from './modules/menu';
import Router from './modules/router';

export default (i18n) => {
  const baseAdapter = getBaseAdapter(i18n);

  return {
    Guide: baseAdapter.Guide,
    Layout: baseAdapter.Layout,
    Page: baseAdapter.Page,
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
