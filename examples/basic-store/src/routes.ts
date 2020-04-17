import { lazy } from 'ice';

// import Home from '@/pages/Home';
// import About from '@/pages/About';

const Home = lazy(() => import('@/pages/Home'));
const About =lazy (() => import('@/pages/About'));

export default [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/about',
    component: About
  }
];
