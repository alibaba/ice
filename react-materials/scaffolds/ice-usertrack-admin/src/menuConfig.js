// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
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
    name: '应用监控',
    path: '/application',
    icon: 'home2',
    children: [
      { name: '监控详情', path: '/application/monitor' },
      { name: '无线接入', path: '/application/mobile' },
    ],
  },
  {
    name: '埋点维护',
    path: '/maintain',
    icon: 'compass',
    children: [
      { name: '方案管理', path: '/maintain/scheme' },
      { name: '应用版本', path: '/maintain/combine' },
    ],
  },
  {
    name: '埋点验证',
    path: '/validate',
    icon: 'person',
    children: [
      { name: '自动化验证', path: '/validate/autotest' },
      { name: '验证报告', path: '/validate/report' },
    ],
  },
  {
    name: '埋点监控',
    path: '/monitor',
    icon: 'mail',
    children: [
      { name: '应用版本', path: '/monitor/version' },
      { name: '方案监控', path: '/monitor/snapshot' },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
