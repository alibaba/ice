// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '设计',
    path: 'https://alibaba.github.io/ice/docs/ice-design',
  },
  {
    name: '文档',
    path: 'https://alibaba.github.io/ice/docs/about',
  },
  {
    name: '物料',
    children: [
      {
        name: '组件',
        path: 'https://alibaba.github.io/ice/component/button',
      },
      {
        name: '区块',
        path: 'https://alibaba.github.io/ice/block',
      },
      {
        name: '布局',
        path: 'https://alibaba.github.io/ice/layout',
      },
      {
        name: '模板',
        path: 'https://alibaba.github.io/ice/scaffold',
      },
    ],
  },
  {
    name: '工具',
    children: [
      {
        name: 'ICEWORKS',
        path: 'https://alibaba.github.io/ice/iceworks',
      },
      {
        name: 'Playground',
        path: 'https://alibaba.github.io/ice/playground',
      },
    ],
  },
  {
    name: '社区',
    children: [
      {
        name: '知乎专栏',
        path: 'https://zhuanlan.zhihu.com/ice-design',
      },
      {
        name: '万能群',
        path:
          require('./images/ice-group.png'),
      },
    ],
  },
];

const asideMenuConfig = [];

export { headerMenuConfig, asideMenuConfig };
