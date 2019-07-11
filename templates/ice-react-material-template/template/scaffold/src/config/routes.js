import BasicLayout from '@/layouts/BasicLayout';
import Home from '@/pages/Home';
import About from '@/pages/About';

const routerConfig = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/about',
        component: About,
      },
      {
        path: '/',
        component: Home,
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routerConfig;
