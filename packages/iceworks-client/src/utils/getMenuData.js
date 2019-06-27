import urlParse from 'url-parse';
import menuConfig from '@src/menuConfig';
import clone from 'lodash.clonedeep';

/**
 * Formatter menu data structure
 */
function formatterMenuData() {
  const keys = {};
  menuConfig.forEach((item) => {
    keys[item.path] = { ...item };
  });
  return keys;
}

/**
 * Get the menu data of the current pathname
 * @param {array} hiddenPaths path of menus which should be hided
 */
function getMenuData(hiddenPaths) {
  const { pathname } = urlParse(window.location.href);
  const pathnamePrefix = `/${pathname.split('/')[1]}`;
  let config = clone(formatterMenuData()[pathnamePrefix]);

  if (!hiddenPaths) {
    return config;
  }

  // Loop menu config to match items which should be hided
  if (hiddenPaths.indexOf(config.path) !== -1) {
    config = [];
  } else if (config.children) {
    for (let i = config.children.length - 1; i > -1; i -= 1) {
      const childMenu = config.children[i];
      if (hiddenPaths.indexOf(childMenu.path) !== -1) {
        config.children.splice(i, 1);
      }
    }
  }

  return config;
}

export { getMenuData };
