import Home from '@/pages/Home';
import About from '@/pages/About';
import Dashboard from '@/pages/Dashboard';
import NotFound from '@/pages/NotFound';

export default [
  {
    path: '/',
    exact: true,
    component: Home,
    getInitialProps: async () => {
      return await Promise.resolve({ data: [Math.random(), Math.random(), Math.random()] });
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
