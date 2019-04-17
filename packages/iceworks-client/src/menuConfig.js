// Then our route config
const menuConfig = [
  {
    name: '项目',
    path: '/project',
    icon: 'projects',
  },
  {
    name: '工程',
    path: '/work',
    icon: 'zujian',
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
    icon: 'template',
  },
  {
    name: '设置',
    path: '/setting',
    icon: 'settings',
  },
];

export default menuConfig;
