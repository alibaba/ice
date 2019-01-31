// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'email',
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'help',
  },
];

// ICON 配置： https://ice.alibaba-inc.com/component/foundationsymbol
const asideMenuConfig = [
  {
    name: '工作台',
    path: '/dashboard',
    icon: 'account',
  },
  {
    name: '任务表盘',
    path: '/taskboard',
    icon: 'clock',
  },
  {
    name: '任务状态',
    path: '/task/status',
    icon: 'calendar',
  },
  {
    name: '项目列表',
    path: '/project/list',
    icon: 'filter',
  },
  {
    name: '添加项目',
    path: '/add/project',
    icon: 'refresh',
  },
  {
    name: '成员列表',
    path: '/member/list',
    icon: 'account',
  },
  {
    name: '添加成员',
    path: '/add/member',
    icon: 'add',
  },
];

export { headerMenuConfig, asideMenuConfig };
