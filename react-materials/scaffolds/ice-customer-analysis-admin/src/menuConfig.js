// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
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
    name: '客流分析',
    path: '/analysis',
    icon: 'home2',
  },
  {
    name: '影片排期',
    path: '/schedule',
    icon: 'copy',
  },
  {
    name: '卖品转化',
    path: '/conversion',
    icon: 'cascades',
  },
];

export { headerMenuConfig, asideMenuConfig };
