import { IRouterConfig } from 'ice';
import BasicLayout from '@/layouts/BasicLayout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import NotFound from '@/pages/NotFound';

const routerConfig: IRouterConfig[] = [
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
