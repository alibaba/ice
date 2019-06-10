import { lazy } from 'react';

const Main = lazy(() => import('./components/Main'));
const General = lazy(() => import('./components/General'));
const Panel = lazy(() => import('./components/Panel'));
const Advanced = lazy(() => import('./components/Advanced'));

export {
  Main,
  General,
  Panel,
  Advanced,
};
