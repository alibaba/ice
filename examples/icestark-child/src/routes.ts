import { IRouterConfig } from 'ice';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import About from '@/pages/About';

const routes: IRouterConfig[] = [
  {
    path: '/list',
    exact: true,
    component: Dashboard,
  },
  {
    path: '/detail',
    exact: true,
    component: About
  },
  {
    path: '/',
    exact: true,
    component: Home,
  },
];

export default routes;
