import { IRouterConfig, lazy } from 'ice';

const Home = lazy(() => import('@/pages/Home'));

const routes: IRouterConfig[] = [
  {
    path: '/',
    component: Home,
  }
];

export default routes;
