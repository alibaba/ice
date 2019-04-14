// Then our route config
const menuConfig = [
  {
    name: '项目',
    path: '/project',
    icon: 'home2',
  },
  {
    name: '工程',
    path: '/work',
    icon: 'home2',
    children: [
      {
        name: 'dev',
        path: '/work/dev',
      },
      {
        name: 'build',
        path: '/work/build',
      },
    ],
  },
  {
    name: '物料',
    path: '/material',
    icon: 'home2',
  },
  {
    name: '设置',
    path: '/setting',
    icon: 'home2',
  },
];

export default menuConfig;
