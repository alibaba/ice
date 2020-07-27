import { lazy } from 'ice';
import Layout from '@/layouts';
import wrapperPage from '@/components/WrapperPage';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Notfound = lazy(() => import('@/pages/NotFound'));

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        exact: true,
        component: Dashboard,
        wrappers: [wrapperPage]
      },
      {
        path: '/about',
        exact: true,
        component: About
      },
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '*',
        component: Notfound
      },
    ]
  }
];
