import { lazy } from 'ice';
import Layout from '@/layouts';
import wrapperPage from '@/components/WrapperPage';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const About = lazy(() => import('@/pages/About'));

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        exact: true,
        component: Dashboard,
        wrappers: [wrapperPage]
      },
      {
        path: '/about',
        exact: true,
        component: About
      },
    ]
  }
];
