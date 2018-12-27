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
    path: '/dashboard',
    icon: 'home',
  },
  {
    name: '学生管理',
    path: '/users',
    icon: 'yonghu',
  },
  {
    name: '试卷管理',
    path: '/paper',
    icon: 'directory',
  },
  {
    name: '添加学生',
    path: '/add',
    icon: 'publish',
  },
  {
    name: '个人设置',
    path: '/setting',
    icon: 'shezhi',
  },
];

export { headerMenuConfig, asideMenuConfig };
