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
    name: '合同中心',
    path: '/',
    icon: 'home2',
  },
  {
    name: '合同管理',
    path: '/contract',
    icon: 'cascades',
    children: [
      { name: '我的合同', path: '/contract/my' },
      { name: '合同查询', path: '/contract/search' },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
