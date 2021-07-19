import Layout from '@/layouts';
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
        pageConfig: {
          keepAlive: false,
        }
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
