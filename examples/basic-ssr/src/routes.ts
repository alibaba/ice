import loadable from '@loadable/component';

import Layout from '@/layouts';
import Notfound from '@/pages/NotFound';

const Home = loadable(() => import('@/pages/Home'));
const Dashboard = loadable(() => import('@/pages/Dashboard'));
const About = loadable(() => import('@/pages/About'));

// import Home from '@/pages/Home';
// import Dashboard from '@/pages/Dashboard';
// import About from '@/pages/About';

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        exact: true,
        component: Dashboard
      },
      {
        path: '/home',
        exact: true,
        component: Home
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
