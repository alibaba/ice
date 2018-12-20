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
    name: '全部项目',
    path: '/dashboard',
    icon: 'home2',
  },
  {
    name: '全部技能',
    path: '/skill',
    icon: 'cascades',
  },
  {
    name: '知识库',
    path: '/repository',
    icon: 'person',
  },
  {
    name: '实体管理',
    path: '/entities',
    icon: 'directory',
  },
  {
    name: '泛化规则',
    path: '/generalization',
    icon: 'task',
  },
  {
    name: '函数管理',
    path: '/function',
    icon: 'directory',
  },
  {
    name: '发布项目',
    path: '/publish',
    icon: 'publish',
  },
  {
    name: '数据统计',
    path: '/analysis',
    icon: 'chart',
  },
  {
    name: '基本设置',
    path: '/setting',
    icon: 'shopcar',
  },
];

export { headerMenuConfig, asideMenuConfig };
