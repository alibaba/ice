/**
 * icescripts 2.0 + kit 2.0
 */
import getBaseAdapter from '../adapter';
import Menu from './modules/menu';
import Router from './modules/router';

export default (i18n) => {
  const baseAdapter = getBaseAdapter(i18n);

  return {
    ...baseAdapter,
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
