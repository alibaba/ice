/**
 * icescripts 1.0 + kit 2.0
 */
import baseConfig from '../adapter';
import Menu from './modules/menu';
import Router from './modules/router';

const { Configuration, ...resetConfig } = baseConfig;

const config = {
  ...resetConfig,
  Router: {
    ...baseConfig.Router,
    module: Router
  },
  Menu: {
    ...baseConfig.Menu,
    module: Menu
  },
};

export default config;
