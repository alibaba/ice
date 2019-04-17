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
    children: [
      {
        name: '通用设置',
        path: '/setting/general',
      },
      {
        name: '物料设置',
        path: '/setting/material',
      },
      {
        name: '面板设置',
        path: '/setting/panel',
      },
      {
        name: '高级设置',
        path: '/setting/advanced',
      },
    ],
  },
];

export default menuConfig;
