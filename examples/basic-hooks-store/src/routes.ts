import Layout from '@/layouts/basic';
import Home from '@/pages/Home';
import TodoList from '@/pages/TodoList';
import NotFound from '@/pages/NotFound';

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
