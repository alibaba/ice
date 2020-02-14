import Page404 from '@/pages/404';
import PageRematch from '@/pages/Rematch/index';
import Page from '@/pages/index';

export default [
  {
    path: '/rematch',
    exact: true,
    component: PageRematch
  },
  {
    path: '/',
    exact: true,
    component: Page
  },
  {
    component: Page404
  },
];
