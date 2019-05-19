import Project from './pages/Project';
import Work from './pages/Work';
import Dev from './pages/Dev';
import Build from './pages/Build';
import Configuration from './pages/Configuration';
import Material from './pages/Material';
import Setting from './pages/Setting';
import SettingGeneral from './pages/SettingGeneral';
import SettingMaterial from './pages/SettingMaterial';
import SettingPanel from './pages/SettingPanel';
import SettingAdvanced from './pages/SettingAdvanced';

// Then our route config
const routerConfig = [
  {
    from: '/',
    path: '/project',
    component: Project,
  },
  {
    path: '/work',
    component: Work,
    routes: [
      {
        from: '/work',
        path: '/work/dev',
        component: Dev,
      },
      {
        path: '/work/build',
        component: Build,
      },
      {
        path: '/work/configuration',
        component: Configuration,
      },
    ],
  },
  {
    path: '/material',
    component: Material,
  },
  {
    path: '/setting',
    component: Setting,
    routes: [
      {
        from: '/setting',
        path: '/setting/general',
        component: SettingGeneral,
      },
      {
        path: '/setting/material',
        component: SettingMaterial,
      },
      {
        path: '/setting/panel',
        component: SettingPanel,
      },
      {
        path: '/setting/advanced',
        component: SettingAdvanced,
      },
    ],
  },
];

export default routerConfig;
