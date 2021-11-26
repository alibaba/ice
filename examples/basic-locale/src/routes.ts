import { IRouterConfig } from 'ice';
import BasicLayout from '@/layouts/BasicLayout';
import Home from '@/pages/Home';
import About from '@/pages/About';

const routerConfig: IRouterConfig[] = [

  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/about',
        exact: true,
        component: About
      }
    ]
  }
];

export default routerConfig;
