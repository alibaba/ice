// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

// ICON 配置： https://ice.alibaba-inc.com/component/foundationsymbol
const asideMenuConfig = [
  {
    name: '图书管理',
    path: '/dashboard',
    icon: 'home2',
  },
  {
    name: '图书借阅',
    path: '/borrow',
    icon: 'cascades',
  },
  {
    name: '图书推荐',
    path: '/recommend',
    icon: 'person',
  },
  {
    name: '图书捐赠',
    path: '/donation',
    icon: 'directory',
  },
];

export { headerMenuConfig, asideMenuConfig };
