// 菜单配置
// headerMenuConfig：头部导航配置

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

// asideMenuConfig：侧边导航配置

const asideMenuConfig = [
  {
    name: '平台概况',
    path: '/',
    icon: 'home2',
  },
  {
    name: '评论信息',
    path: '/reviews',
    icon: 'message',
  },
  {
    name: '客户信息',
    path: '/customer',
    icon: 'redpacket',
  },
  {
    name: '统计数据',
    path: '/statcenter',
    icon: 'chart',
  },
  {
    name: '通用设置',
    path: '/setting',
    icon: 'shezhi',
    children: [
      { name: '基础设置', path: '/setting/basic' },
      {
        name: '菜单设置',
        path: '/setting/navigation',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
