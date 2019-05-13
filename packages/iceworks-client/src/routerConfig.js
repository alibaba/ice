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
    path: '/project',
    component: Project,
  },
  {
    path: '/work',
    component: Work,
    exact: true,
    routes: [
      {
        path: '/work/dev',
        component: Dev,
        exact: true,
      },
      {
        path: '/work/build',
        component: Build,
        exact: true,
      },
      {
        path: '/work/configuration',
        component: Configuration,
        exact: true,
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
        path: '/setting/general',
        component: SettingGeneral,
        exact: true,
      },
      {
        path: '/setting/material',
        component: SettingMaterial,
        exact: true,
      },
      {
        path: '/setting/panel',
        component: SettingPanel,
        exact: true,
      },
      {
        path: '/setting/advanced',
        component: SettingAdvanced,
        exact: true,
      },
    ],
  },
];

export default routerConfig;
