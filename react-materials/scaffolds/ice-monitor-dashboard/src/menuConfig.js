// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const asideMenuConfig = [
  {
    name: '业务概览',
    path: '/',
    icon: 'home2',
  },
  {
    name: '数据中心',
    path: '/datacenter',
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

const headerMenuConfig = asideMenuConfig;

export default headerMenuConfig;
