// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'atm',
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'help',
  },
];

const asideMenuConfig = [
  {
    name: '概况',
    path: '/dashboard',
    icon: 'clock',
  },
  {
    name: '数据',
    path: '/statcenter',
    icon: 'calendar',
  },
  {
    name: '交易',
    path: '/trade',
    icon: 'switch',
  },
  {
    name: '商品',
    path: '/goods',
    icon: 'atm',
  },
  {
    name: '订单',
    path: '/order/list',
    icon: 'filter',
  },
  {
    name: '客户',
    path: '/customer',
    icon: 'account',
  },
  {
    name: '设置',
    path: '/setting',
    icon: 'set',
  },
];

export { headerMenuConfig, asideMenuConfig };
