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

// ICON 配置： https://ice.alibaba-inc.com/component/foundationsymbol
const asideMenuConfig = [
  {
    name: '工作台',
    path: '/dashboard',
    icon: 'electronics',
  },
  {
    name: '任务表盘',
    path: '/taskboard',
    icon: 'box',
  },
  {
    name: '任务状态',
    path: '/task/status',
    icon: 'lights',
  },
  {
    name: '项目列表',
    path: '/project/list',
    icon: 'folder',
  },
  {
    name: '添加项目',
    path: '/add/project',
    icon: 'survey',
  },
  {
    name: '成员列表',
    path: '/member/list',
    icon: 'service',
  },
  {
    name: '添加成员',
    path: '/add/member',
    icon: 'survey',
  },
];

export { headerMenuConfig, asideMenuConfig };
