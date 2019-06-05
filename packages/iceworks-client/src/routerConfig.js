import { lazy } from 'react';

const Project = lazy(() => import('./pages/Project'));
const Tasks = lazy(() => import('./pages/Tasks'));
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
    path: '/task',
    component: Tasks,
    routes: [
      {
        from: '/task',
        path: '/task/dev',
        component: Task,
      },
      {
        path: '/task/build',
        component: Task,
      },
      {
        path: '/task/lint',
        component: Task,
      },
      {
        path: '/task/configuration',
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
