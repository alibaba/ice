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
    name: 'Dashboard',
    path: '/',
    icon: 'home',
    children: [
      {
        name: '数据概况',
        path: '/dashboard',
      },
    ],
  },
  {
    name: '邀请概览',
    path: '/invite',
    icon: 'cascades',
    children: [
      { name: '邀请列表', path: '/invite/list' },
      { name: '评测团队', path: '/invite/team' },
      { name: '新增成员', path: '/invite/add' },
    ],
  },
  {
    name: '邀评设置',
    path: '/topic',
    icon: 'shezhi',
    children: [
      { name: '话题列表', path: '/topic/list' },
      { name: '新增话题', path: '/topic/add' },
    ],
  },
  {
    name: '基本设置',
    path: '/setting',
    icon: 'yonghu',
    children: [{ name: '个人设置', path: '/setting/my' }],
  },
];

export { headerMenuConfig, asideMenuConfig };
