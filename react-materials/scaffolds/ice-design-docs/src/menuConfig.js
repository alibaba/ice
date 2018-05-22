// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '介绍',
    path: '/',
  },
  {
    name: '设计',
    path: '/',
  },
  {
    name: ' 开发',
    path: '/',
  },
  {
    name: ' 数据',
    path: '/',
  },
  {
    name: ' 运营',
    path: '/',
  },
  {
    name: ' 社区',
    path: '/',
  },
];

const asideMenuConfig = [
  {
    name: '关于飞冰',
    path: '/',
  },
  {
    name: 'ICE 设计语言',
    path: '/design',
  },
  {
    name: 'Iceworks 快速开始',
    path: '/iceworks',
  },
  {
    name: '如何使用 ICE 组件',
    path: '/components',
  },
  {
    name: '开发环境配置',
    path: '/config',
  },
  {
    name: '自定义物料',
    path: '/materials',
    children: [
      {
        name: '自定义 React 物料',
        path: '/materials/react',
      },
      {
        name: '自定义 Vue 物料',
        path: '/materials/vue',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
