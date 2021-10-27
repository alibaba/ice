import { IRouterConfig, lazy } from 'ice';
import DashboardLayout from '@/pages/Dashboard';
import Dashboard1 from '@/pages/Dashboard/Page1';
import Dashboard2 from '@/pages/Dashboard/Page2';
import Layout from '@/Layout';

const Home = lazy(() => import('@/pages/Home'));

const routes: IRouterConfig[] = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        component: DashboardLayout,
        children: [
          {
            path: '/a',
            component: Dashboard1,
            exact: true
          },
          {
            path: '/b',
            component: Dashboard2,
            exact: true
          }
        ]
      },
    ]
  },

];

export default routes;
