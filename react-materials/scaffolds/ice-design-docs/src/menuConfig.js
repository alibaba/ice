// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '介绍',
    path: '/',
  },
  {
    name: '设计',
    path: '/',
  },
  {
    name: ' 开发',
    path: '/',
  },
  {
    name: ' 数据',
    path: '/',
  },
  {
    name: ' 运营',
    path: '/',
  },
  {
    name: ' 社区',
    path: '/',
  },
];

const asideMenuConfig = [
  {
    name: '开发者入驻',
    path: '/',
  },
  {
    name: '创建小程序',
    path: '/create',
  },
  {
    name: '小程序开发准备',
    path: '/prepare',
  },
  {
    name: '安全检测',
    path: '/inspection',
  },
  {
    name: '小程序DEMO',
    path: '/demo',
  },
  {
    name: '开放能力',
    path: '/open',
    children: [
      {
        name: '接入支付',
        path: '/open/tradepay',
      },
      {
        name: '支付代扣',
        path: '/open/meduct',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
