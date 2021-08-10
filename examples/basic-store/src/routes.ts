import Layout from '@/layouts/index';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Detail from '@/pages/Detail';
import { NotFound } from '@/pages/NotFound';
import Index from '@/pages/Index';

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
        component: About,
        pageConfig: {
          title: 'About'
        }
      },
      {
        path: '/detail',
        component: Detail
      },
      {
        path: '/index',
        component: Index
      },
      {
        path: '*',
        component: NotFound,
      }
    ]
  }
];
