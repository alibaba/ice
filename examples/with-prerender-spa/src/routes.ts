import Home from '@/pages/Home';
import About from '@/pages/About';
import Dashboard from '@/pages/Dashboard';
import NotFound from '@/pages/NotFound';

export default [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/about/:id',
    exact: true,
    component: About,
    getStaticPaths: async () => {
      return await Promise.resolve(['/about/a', '/about/b', '/about/c']);
    }
  },
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard
  },
  {
    path: '*',
    component: NotFound,
  }
];
