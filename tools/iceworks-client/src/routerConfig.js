import Project from './pages/Project';
import Work from './pages/Work';
import Dev from './pages/Dev';
import Build from './pages/Build';
import Material from './pages/Material';
import Setting from './pages/Setting';

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
    ],
  },
  {
    path: '/material',
    component: Material,
  },
  {
    path: '/setting',
    component: Setting,
  },
];

export default routerConfig;
