import urlParse from 'url-parse';
import menuConfig from '@src/menuConfig';

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
 */
function getMenuData() {
  const { pathname } = urlParse(window.location.href);
  const pathnamePrefix = `/${pathname.split('/')[1]}`;
  // console.log({ pathnamePrefix });
  return formatterMenuData()[pathnamePrefix];
}

export { getMenuData };
