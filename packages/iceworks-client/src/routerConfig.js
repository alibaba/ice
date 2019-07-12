import { lazy } from 'react';
import * as Setting from './pages/Setting';

const Project = lazy(() => import('./pages/Project'));
const Engineering = lazy(() => import('./pages/Engineering'));
const Task = lazy(() => import('./pages/Engineering/components/Task'));
const Configuration = lazy(() => import('./pages/Engineering/components/Configuration'));
const Material = lazy(() => import('./pages/Material'));

// Then our route config
const routerConfig = [
  {
    from: '/',
    path: '/project',
    component: Project,
  },
  {
    path: '/task',
    component: Engineering,
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
    component: Setting.Main,
    routes: [
      {
        from: '/setting',
        path: '/setting/general',
        component: Setting.General,
      },
    ],
  },
];

export default routerConfig;
