import { Dashboard, NotFound } from './pages';
import { HeaderAsideLayout } from './layouts';

const routesConfig = [
  {
    path: '/',
    layout: HeaderAsideLayout,
    component: Dashboard,
    redirect: 'dashboard/analysis',
    children: [
      {
        path: 'dashboard/analysis',
        layout: HeaderAsideLayout,
        component: Dashboard,
      },
      {
        path: 'dashboard/monitor',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
      {
        path: 'dashboard/workplace',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
    ],
  },
  {
    path: '/table',
    layout: HeaderAsideLayout,
    component: NotFound,
    children: [
      {
        path: 'basic',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
      {
        path: 'fixed',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
    ],
  },
  {
    path: '/form',
    layout: HeaderAsideLayout,
    component: NotFound,
    children: [
      {
        path: 'basic',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
      {
        path: 'signup',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
    ],
  },
  {
    path: '/charts',
    layout: HeaderAsideLayout,
    component: NotFound,
    children: [
      {
        path: 'line',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
      {
        path: 'histogram',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
      {
        path: 'bar',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
    ],
  },
  {
    path: '/profile',
    layout: HeaderAsideLayout,
    component: NotFound,
    children: [
      {
        path: 'success',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
      {
        path: 'fail',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
    ],
  },
  {
    path: '/result',
    layout: HeaderAsideLayout,
    component: NotFound,
    children: [
      {
        path: 'success',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
      {
        path: 'fail',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
    ],
  },
  {
    path: '*',
    layout: HeaderAsideLayout,
    component: NotFound,
    children: [
      {
        path: '*',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
    ],
  },
];

export default routesConfig;
