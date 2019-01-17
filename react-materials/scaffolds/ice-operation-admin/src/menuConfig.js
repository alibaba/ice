// 菜单配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    text: '反馈',
    to: '//github.com/alibaba/ice/issues/new',
    external: true,
    newWindow: true,
    icon: 'cart',
  },
  {
    text: '帮助',
    to: '//alibaba.github.io/ice/',
    external: true,
    newWindow: true,
    icon: 'all',
  },
];

const asideMenuConfig = [
  {
    name: '监控页',
    path: '/dashboard',
  },
  {
    name: '设备管理',
    path: '/home',
  },
  {
    name: '设备编辑',
    path: '/edit',
  },
  {
    name: '设备查看',
    path: '/view',
  },
];

export { headerMenuConfig, asideMenuConfig };
