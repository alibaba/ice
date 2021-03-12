import Layout from '@/layouts/basic';
import Home from '@/pages/Home';
import TodoList from '@/pages/TodoList';
import NotFound from '@/pages/NotFound';
import HomeLayout from '@/pages/Home/Layout';
import A from '@/pages/Home/A';
import B from '@/pages/Home/B';

export default [
  {
    path: '/home',
    component: HomeLayout,
    children: [{
      path: '/',
      exact: true,
      component: Home
    },
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
        component: Home
      },
      {
        path: '/todoList',
        component: TodoList
      },
      {
        path: '*',
        component: NotFound,
      }
    ]
  }
];
