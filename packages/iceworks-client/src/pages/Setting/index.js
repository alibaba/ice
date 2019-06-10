import { lazy } from 'react';

const SubMenu = lazy(() => import('./components/SubMenu'));
const General = lazy(() => import('./components/General'));
const Panel = lazy(() => import('./components/Panel'));
const Advanced = lazy(() => import('./components/Advanced'));

export {
  SubMenu,
  General,
  Panel,
  Advanced,
};
