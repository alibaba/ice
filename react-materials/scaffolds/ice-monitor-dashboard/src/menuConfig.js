// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const asideMenuConfig = [
  {
    name: '业务概览',
    path: '/dashboard',
  },
  {
    name: '流量分析',
    path: '/traffic/statistics',
  },
  {
    name: '用户分析',
    path: '/user/statistics',
  },
  {
    name: '留存与活跃',
    path: '/user/activities',
  },
  {
    name: '数据中心',
    path: '/datacenter',
  },
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice/issues/new',
    external: true,
    newWindow: true,
  },
];

export default asideMenuConfig;
