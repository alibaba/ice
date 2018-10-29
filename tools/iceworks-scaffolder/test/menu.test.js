const path = require('path');

const appendMenu = require('../src/menu/appendMenu');
const removeMenu = require('../src/menu/removeMenu');

describe('Menu 操作测试', () => {
  const cwd = path.join(__dirname, 'features/menu');
  test('添加 menu', () => {
    const menuConfigFilePath = path.join(cwd, 'src/menuConfig.js');

    return appendMenu({
      name: 'IceworksPreview',
      path: '/IceworksPreview',
      icon: 'home',
      menuConfigFilePath: menuConfigFilePath,
    }).then((menuContent) => {
      const expected = `// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置
const headerMenuConfig = [];
const asideMenuConfig = [
  {
    name: 'Dashboard',
    path: '/',
    icon: 'home2',
  },
  {
    name: 'IceworksPreview',
    path: '/IceworksPreview',
    icon: 'home',
  },
];
export { headerMenuConfig, asideMenuConfig };
`;
      expect(menuContent).toEqual(expected);
    });
  });

  test('添加 menu 重名检测', () => {
    const menuConfigFilePath = path.join(cwd, 'src/menuConfig2.js');

    return appendMenu({
      name: 'IceworksPreview',
      path: '/IceworksPreview',
      icon: 'home',
      menuConfigFilePath: menuConfigFilePath,
    }).then((menuContent) => {
      const expected = `// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置
const headerMenuConfig = [];
const asideMenuConfig = [
  {
    name: 'Dashboard',
    path: '/',
    icon: 'home2',
  },
  {
    name: 'IceworksPreview',
    path: '/IceworksPreview',
    icon: 'home',
  },
];
export { headerMenuConfig, asideMenuConfig };
`;
      expect(menuContent).toEqual(expected);
    });
  });

  test('删除 menu', () => {
    const menuConfigFilePath = path.join(cwd, 'src/menuConfig2.js');
    return removeMenu({
      path: '/IceworksPreview',
      menuConfigFilePath: menuConfigFilePath,
    }).then((menuContent) => {
      const expected = `// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置
const headerMenuConfig = [];
const asideMenuConfig = [
  {
    name: 'Dashboard',
    path: '/',
    icon: 'home2',
  },
];
export { headerMenuConfig, asideMenuConfig };
`;
      expect(menuContent).toEqual(expected);
    });
  });
});
