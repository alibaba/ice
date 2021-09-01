import Layout from '@/layouts/BasicLayout';
import Dashboard from '@/pages/Dashboard';
import NotFound from '@/components/NotFound';

const routerConfig = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Dashboard,
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routerConfig;
