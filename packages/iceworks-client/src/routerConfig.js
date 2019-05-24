import { lazy } from 'react';

const Project = lazy(() => import('./pages/Project'));
const Work = lazy(() => import('./pages/Work'));
const Dev = lazy(() => import('./pages/Dev'));
const Task = lazy(() => import('./pages/Task'));
const Configuration = lazy(() => import('./pages/Configuration'));
const Material = lazy(() => import('./pages/Material'));
const Setting = lazy(() => import('./pages/Setting'));
const SettingGeneral = lazy(() => import('./pages/SettingGeneral'));
const SettingMaterial = lazy(() => import('./pages/SettingMaterial'));
const SettingPanel = lazy(() => import('./pages/SettingPanel'));
const SettingAdvanced = lazy(() => import('./pages/SettingAdvanced'));

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
        component: Task,
      },
      {
        path: '/work/lint',
        component: Task,
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
