import { lazy } from 'react';

const Main = lazy(() => import('./components/Main'));
const General = lazy(() => import('./components/General'));
const Panel = lazy(() => import('./components/Panel'));

export {
  Main,
  General,
  Panel,
};
