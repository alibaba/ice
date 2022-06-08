import { lazy } from 'ice';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';

const About = lazy(() => import('@/pages/About'));

export default [
  {
    path: '/',
    exact: true,
    component: Home,
    getInitialProps: () => {
      return Promise.resolve({ data: [Math.random(), Math.random(), Math.random()] });
    }
  },
  {
    path: '/about/:id',
    exact: true,
    component: About,
  },
  {
    path: '/dashboard',
    exact: true,
    ssr: true,             // this route will use ssr in production
    component: Dashboard
  },
  {
    path: '*',
    component: NotFound,
  }
];
