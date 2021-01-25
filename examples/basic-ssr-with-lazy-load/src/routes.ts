import { lazy } from 'ice';
import Layout from '@/layouts';
import Notfound from '@/pages/NotFound';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/home',
        exact: true,
        component: Home,
      },
      {
        path: '/about',
        exact: true,
        component: About
      },
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '*',
        component: Notfound
      }
    ]
  }
];
