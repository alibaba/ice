// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home2',
  },
  {
    name: '构建器',
    path: '/builder',
    icon: 'cascades',
  },
  {
    name: '构建任务',
    path: '/task',
    icon: 'repair',
  },
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice/issues/new',
    icon: 'question2',
    external: true,
    newWindow: true,
  },
];

const asideMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
  {
    name: '用户管理',
    path: '/user',
    icon: 'yonghu',
  },
  {
    name: '系统设置',
    path: '/setting',
    icon: 'shezhi',
    children: [
      {
        name: '基本设置',
        path: '/base',
      },
      {
        name: '评论设置',
        path: '/comment',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
