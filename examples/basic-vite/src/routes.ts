import { IRouterConfig, lazy } from 'ice';

const Home = lazy(() => import('@/pages/Home'));
const Index = lazy(() => import('@/pages/index'));

const routes: IRouterConfig[] = [
  {
    path: '/index',
    component: Index,
  },
  {
    path: '/',
    component: Home,
  }
];

export default routes;
