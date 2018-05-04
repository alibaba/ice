// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [];

const asideMenuConfig = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'el-icon-menu',
    children: [
      {
        path: '/analysis',
        name: '分析页',
      },
      {
        path: '/monitor',
        name: '监控页',
      },
      {
        path: '/workplace',
        name: '工作台',
      },
    ],
  },
  {
    path: '/table',
    name: '表格页',
    icon: 'el-icon-date',
    children: [
      {
        path: '/basic',
        name: '基础表格',
      },
      {
        path: '/fixed',
        name: '固定表格',
      },
    ],
  },
  {
    path: '/form',
    name: '表单页',
    icon: 'el-icon-edit-outline',
    children: [
      {
        path: '/basic',
        name: '典型表单',
      },
      {
        path: '/signup',
        name: '注册表单',
      },
    ],
  },
  {
    path: '/charts',
    name: '图表页',
    icon: 'el-icon-picture-outline',
    children: [
      {
        path: '/line',
        name: '折线图',
      },
      {
        path: '/histogram',
        name: '柱状图',
      },
      {
        path: '/bar',
        name: '条形图',
      },
    ],
  },
  {
    path: '/profile',
    name: '详情页',
    icon: 'el-icon-tickets',
    children: [
      {
        path: '/success',
        name: '基础详情页',
      },
      {
        path: '/fail',
        name: '失败',
      },
    ],
  },
  {
    path: '/result',
    name: '结果页',
    icon: 'el-icon-circle-check-outline',
    children: [
      {
        path: '/success',
        name: '成功',
      },
      {
        path: '/fail',
        name: '失败',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
