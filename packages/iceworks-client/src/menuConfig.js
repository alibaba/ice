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
        icon: 'server',
        desc: '启动开发环境的调试服务',
      },
      {
        name: 'build',
        path: '/work/build',
        icon: 'builder',
        desc: '构建生产环境的静态资源',
      },
      {
        name: 'lint',
        path: '/work/lint',
        icon: 'lint',
        desc: '检查代码规范并进行修复',
      },
      {
        name: 'configuration',
        path: '/work/configuration',
        icon: 'webpack1',
        desc: '自定义开发构建配置',
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
        icon: 'basic-settings',
        desc: '通用的操作设置',
      },
      {
        name: 'iceworks.menu.setting.material',
        path: '/setting/material',
        icon: 'material',
        desc: '添加/开启/关闭自定义物料',
      },
      {
        name: 'iceworks.menu.setting.panel',
        path: '/setting/panel',
        icon: 'panel1',
        desc: '项目面板管理设置',
      },
      {
        name: 'iceworks.menu.setting.advanced',
        path: '/setting/advanced',
        icon: 'gaojishezhi',
        desc: '高级的操作设置',
      },
    ],
  },
];

export default menuConfig;
