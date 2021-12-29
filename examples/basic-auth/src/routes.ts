import { lazy } from 'ice';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));

export default [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/about',
    exact: true,
    component: About,
    pageConfig: {
      auth: ['admin'],
      title: 'about',
    },
  }
];
