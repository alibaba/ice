// import { lazy } from 'ice';
import Layout from '@/layouts';

/* const Dashboard = lazy(() => import('@/pages/Dashboard'));
const About = lazy(() => import('@/pages/About'));
const Notfound = lazy(() => import('@/pages/NotFound')); */
import Dashboard from '@/pages/Dashboard';
import About from '@/pages/About';
import NotFound from '@/pages/NotFound';

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        exact: true,
        component: Dashboard,
      },
      {
        path: '/about',
        exact: true,
        component: About
      },
      {
        path: '*',
        component: NotFound,
      },
    ]
  }
];
