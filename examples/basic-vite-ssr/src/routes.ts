import { IRouterConfig } from 'ice';
import DashboardLayout from '@/pages/Dashboard';
import Dashboard1 from '@/pages/Dashboard/Page1';
import Dashboard2 from '@/pages/Dashboard/Page2';
import Home from '@/pages/Home';
import Layout from '@/Layout';

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
