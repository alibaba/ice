import Layout from '@/layouts/index';
import Home from '@/pages/Home';
import About from '@/pages/About';

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
        exact: true,
        component: About
      },
    ]
  }
];
