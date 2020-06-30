import { lazy } from 'ice';

const Home = lazy(() => import('@/pages/Home'));

export default [
  {
    path: '/',
    exact: true,
    component: Home
  }
];
