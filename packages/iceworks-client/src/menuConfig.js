// Then our route config
const menuConfig = [
  {
    name: 'iceworks.menu.project',
    path: '/project',
    icon: 'projects',
  },
  {
    name: 'iceworks.menu.work',
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
    name: 'iceworks.menu.material',
    path: '/material',
    icon: 'template',
  },
  {
    name: 'iceworks.menu.setting',
    path: '/setting',
    icon: 'settings',
    children: [
      {
        name: 'iceworks.menu.setting.general',
        path: '/setting/general',
      },
      {
        name: 'iceworks.menu.setting.material',
        path: '/setting/material',
      },
      {
        name: 'iceworks.menu.setting.panel',
        path: '/setting/panel',
      },
      {
        name: 'iceworks.menu.setting.advanced',
        path: '/setting/advanced',
      },
    ],
  },
];

export default menuConfig;
