// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
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
    name: '工作台',
    path: '/dashboard',
    icon: 'home2',
  },
  {
    name: '数据概览',
    path: '/analysis',
    icon: 'chart',
  },
  {
    name: '员工列表',
    path: '/employee',
    icon: 'person',
  },
  {
    name: '部门列表',
    path: '/departments',
    icon: 'cascades',
  },
  {
    name: '请假记录',
    path: '/holidays',
    icon: 'copy',
  },
  {
    name: '待办事项',
    path: '/events',
    icon: 'edit2',
  },
  {
    name: '动态列表',
    path: '/activites',
    icon: 'activity',
  },
];

export { headerMenuConfig, asideMenuConfig };
