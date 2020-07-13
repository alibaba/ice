import Layout from '@/layouts';
import wrapperPage from '@/components/WrapperPage';

import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import Notfound from '@/pages/NotFound';

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
