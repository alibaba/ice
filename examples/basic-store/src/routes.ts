import { lazy } from 'ice';

// import Home from '@/pages/Home';
// import About from '@/pages/About';
import Layout from '@/layouts/index';

const Home = lazy(() => import('@/pages/Home'));
const About =lazy(() => import('@/pages/About'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/about',
        component: About
      },
      {
        path: '*',
        component: NotFound,
      }
    ]
  }
];
