// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const asideMenuConfig = [
  {
    name: '业务概览',
    path: '/dashboard',
    icon: 'home2',
  },
  {
    name: '数据中心',
    path: '/datacenter',
    icon: 'cascades',
  },
  {
    name: '流量分析',
    path: '/traffic/statistics',
    icon: 'cascades',
  },
  {
    name: '用户分析',
    path: '/user/statistics',
    icon: 'cascades',
  },
  {
    name: '留存与活跃',
    path: '/user/activities',
    icon: 'cascades',
  },
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice/issues/new',
    icon: 'question2',
    external: true,
    newWindow: true,
  },
];

export default asideMenuConfig;
