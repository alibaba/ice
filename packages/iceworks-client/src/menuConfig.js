// Then our route config
const menuConfig = [
  {
    name: 'iceworks.menu.project',
    path: '/project',
    icon: 'projects',
  },
  {
    name: 'iceworks.menu.task',
    path: '/task',
    icon: 'zujian',
    children: [
      {
        name: 'iceworks.menu.task.dev',
        path: '/task/dev',
        icon: 'dev',
        desc: 'iceworks.menu.task.dev.desc',
      },
      {
        name: 'iceworks.menu.task.build',
        path: '/task/build',
        icon: 'builder',
        desc: 'iceworks.menu.task.build.desc',
      },
      {
        name: 'iceworks.menu.task.lint',
        path: '/task/lint',
        icon: 'lint',
        desc: 'iceworks.menu.task.lint.desc',
      },
      {
        name: 'iceworks.menu.task.configuration',
        path: '/task/configuration',
        icon: 'webpack1',
        desc: 'iceworks.menu.task.configuration.desc',
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
        icon: 'gaojishezhi',
        desc: 'iceworks.menu.setting.general.desc',
      },
    ],
  },
];

export default menuConfig;
