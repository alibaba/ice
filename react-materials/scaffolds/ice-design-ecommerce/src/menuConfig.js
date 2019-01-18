// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: '/dashboard',
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
    name: '概况',
    path: '/dashboard',
    icon: 'home2',
  },
  {
    name: '数据',
    path: '/statcenter',
    icon: 'chart',
  },
  {
    name: '交易',
    path: '/trade',
    icon: 'redpacket',
  },
  {
    name: '商品',
    path: '/goods',
    icon: 'shopcar',
  },
  {
    name: '订单',
    path: '/order/list',
    icon: 'copy',
  },
  {
    name: '客户',
    path: '/customer',
    icon: 'redpacket',
  },
  {
    name: '设置',
    path: '/setting',
    icon: 'shezhi',
  },
];

export { headerMenuConfig, asideMenuConfig };
