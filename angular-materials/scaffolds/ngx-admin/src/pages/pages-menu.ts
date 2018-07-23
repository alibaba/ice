import { NbMenuItem } from '@nebular/theme';

import { asideMenuConfig } from '../menuConfig';

let MENU_ITEMS: NbMenuItem[] = [];

// 递归格式化 menuConfig 中的 menu 符合 NbMenuItem 类型
const recursiveMenuItem = (menuConfig): NbMenuItem[] => {
  return menuConfig.map(({ name, path, children, ...other }) => {
    const menuItem: NbMenuItem = {
      ...other,
      title: name,
      link: path,
    };

    if (Array.isArray(children)) {
      menuItem.children = recursiveMenuItem(children);
    }

    return menuItem;
  });
};

MENU_ITEMS = recursiveMenuItem(asideMenuConfig);

export { MENU_ITEMS };
