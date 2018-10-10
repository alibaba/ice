// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '我的工作台',
    path: '/workbench',
    external: true,
    newWindow: true,
  },
  {
    name: '业务办理',
    path: '/business',
    external: true,
    newWindow: true,
  },
  {
    name: '案件查询',
    path: '/case',
    external: true,
    newWindow: true,
  },
  {
    name: '统计分析',
    path: '/analysis',
    external: true,
    newWindow: true,
  },
];

// ICON 配置： https://ice.alibaba-inc.com/component/foundationsymbol
const asideMenuConfig = [
  {
    name: '工作台',
    path: '/',
    icon: 'home2',
  },
  {
    name: '拆预收案',
    path: '/dismantling',
    icon: 'cascades',
  },
  {
    name: '案款账号分配',
    path: '/allocation',
    icon: 'person',
  },
  {
    name: '法律文书',
    path: '/instrument',
    icon: 'copy',
  },
];

export { headerMenuConfig, asideMenuConfig };
