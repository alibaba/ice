// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: '/contract/index',
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
    name: '合同中心',
    path: '/contract/index',
    icon: 'home2',
  },
  {
    name: '合同查询',
    path: '/contract/search',
    icon: 'search',
  },
  {
    name: '我的合同',
    path: '/contract/my',
    icon: 'person',
  },
];

export { headerMenuConfig, asideMenuConfig };
