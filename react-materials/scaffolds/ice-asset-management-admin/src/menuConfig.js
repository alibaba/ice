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
    name: '管理概况',
    path: '/manage',
    icon: 'account',
    children: [
      { name: '公司管理', path: '/manage/company', icon: 'filter' },
      { name: '部门管理', path: '/manage/department', icon: 'filter' },
      { name: '团队管理', path: '/manage/team', icon: 'filter' },
    ],
  },
  {
    name: '专项管理',
    path: '/special',
    icon: 'set',
    children: [
      { name: '成本管理', path: '/special/cost', icon: 'filter' },
      { name: '质量管理', path: '/special/cluster', icon: 'filter' },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
