import { lazy } from 'react';

const Main = lazy(() => import('./components/Main'));
const General = lazy(() => import('./components/General'));

export {
  Main,
  General,
};
