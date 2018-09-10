// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [];

const asideMenuConfig = [
  {
    name: '应用监控',
    path: '/application',
    icon: 'home2',
    children: [
      { name: '监控详情', path: '/application/monitor' },
      { name: '无线接入', path: '/application/mobile' },
    ],
  },
  {
    name: '方案维护',
    path: '/maintain',
    icon: 'compass',
    children: [
      { name: '方案管理', path: '/maintain/scheme' },
      { name: '应用版本', path: '/maintain/combine' },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
