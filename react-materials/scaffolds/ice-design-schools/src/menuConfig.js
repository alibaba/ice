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
    name: '我的工作台',
    path: '/',
    icon: 'home',
  },
  {
    name: '权限管理',
    path: '/permission',
    icon: 'yonghu',
    children: [{ name: '用户管理', path: '/permission/users' }],
  },
  {
    name: '试题管理',
    path: '/test',
    icon: 'publish',
    children: [{ name: '试卷管理', path: '/test/paper' }],
  },
];

export { headerMenuConfig, asideMenuConfig };
