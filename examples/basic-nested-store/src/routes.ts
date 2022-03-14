// import { lazy } from 'ice';
import Layout from '@/layouts';
import HomeLayout from '@/pages/Home/Layout';
import A from '@/pages/Home/A';
import B from '@/pages/Home/B';
import About from '@/pages/About';
import Index from '@/pages/index';
import { NotFound } from '@/pages/NotFound';

export default [
  {
    path: '/home',
    component: HomeLayout,
    children: [
      {
        path: '/a',
        exact: true,
        component: A
      },
      {
        path: '/b',
        exact: true,
        component: B
      },
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        exact: true,
        component: Index
      },
      {
        path: '/about',
        component: About,
        pageConfig: {
          title: 'About'
        }
      },
      {
        path: '*',
        component: NotFound,
      }
    ]
  }
];
