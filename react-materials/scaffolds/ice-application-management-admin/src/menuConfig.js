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

const asideMenuConfig = [
  {
    name: '我的应用',
    path: '/dashboard',
  },
  {
    name: '应用查询',
    path: '/query',
  },
  {
    name: '账号申请',
    path: '/account',
    icon: 'home',
  },
  {
    name: '\u5E94\u7528\u6982\u89C8',
    path: '/app',
    icon: 'home',
  },
];

export { headerMenuConfig, asideMenuConfig };
