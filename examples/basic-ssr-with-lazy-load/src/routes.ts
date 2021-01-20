import loadable from '@loadable/component';

import Layout from '@/layouts';
import Notfound from '@/pages/NotFound';

const Home = loadable(() => import('@/pages/Home'), {
  ssr: true,
  fallback: 111,
});
const About = loadable(() => import('@/pages/About'), {
  ssr: true,
  fallback: 123,
});

export default [
  {
    path: '/',
    component: Layout,
    children: [
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
