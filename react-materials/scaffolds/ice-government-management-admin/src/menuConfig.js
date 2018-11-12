// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '我的工作台',
    path: '/',
  },
  {
    name: '业务办理',
    path: '/',
  },
  {
    name: '案件查询',
    path: '/',
  },
  {
    name: '统计分析',
    path: '/',
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
    name: '当事人自助收案',
    path: '/selfhelp',
    icon: 'exchange',
  },
  {
    name: '在办案件列表',
    path: '/list',
    icon: 'ol-list',
  },
  {
    name: '批量处理',
    path: '/batch',
    icon: 'copy',
  },
];

export { headerMenuConfig, asideMenuConfig };
