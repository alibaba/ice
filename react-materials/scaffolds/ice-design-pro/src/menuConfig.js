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
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'home2',
  },
  {
    name: '图表页',
    path: '/chart',
    icon: 'chart1',
    children: [
      {
        name: '常用图表',
        path: '/chart/list',
        authority: 'admin',
      },
    ],
  },
  {
    name: '表格页',
    path: '/table',
    icon: 'table',
    // authority: 'admin',
    children: [
      {
        name: '基础表格',
        path: '/table/basic',
        // authority: 'admin',
      },
      {
        name: '通用表格',
        path: '/table/general',
        // authority: 'user',
      },
    ],
  },
  {
    name: '列表页',
    path: '/list',
    icon: 'ul-list',
    children: [
      {
        name: '基础列表',
        path: '/list/basic',
      },
      {
        name: '卡片列表',
        path: '/list/card',
      },
    ],
  },
  {
    name: '内容页',
    path: '/portlets',
    icon: 'publish',
    children: [
      {
        name: '基础详情页',
        path: '/portlets/base',
      },
      {
        name: '条款协议页',
        path: '/portlets/terms',
      },
    ],
  },
  {
    name: '结果页',
    path: '/result',
    icon: 'result',
    children: [
      {
        name: '成功',
        path: '/result/success',
      },
      {
        name: '失败',
        path: '/result/fail',
      },
    ],
  },
  {
    name: '异常页',
    path: '/exception',
    icon: 'gaojingxinxi',
    // authority: 'admin',
    children: [
      {
        name: '204',
        path: '/exception/204',
      },
      {
        name: '403',
        path: '/exception/403',
      },
      {
        name: '404',
        path: '/exception/404',
      },
      {
        name: '500',
        path: '/exception/500',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
