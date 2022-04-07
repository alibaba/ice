import { IRouterConfig } from 'ice';
import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Login';

const routerConfig: IRouterConfig[] = [
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/',
        redirect: '/user/login'
      }
    ]
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/about',
        exact: true,
        component: About
      },
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        component: NotFound,
      }
    ]
  },

];

export default routerConfig;
