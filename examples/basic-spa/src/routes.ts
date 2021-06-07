import { lazy, IRouterConfig } from 'ice';
import Layout from '@/layouts';
import Home from '@/pages/Home';
import wrapperPage from '@/components/WrapperPage';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
// const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Notfound = lazy(() => import('@/pages/NotFound'));

const routes: IRouterConfig[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        exact: true,
        component: Dashboard,
        pageConfig: {
          title: 'Dashboard Page'
        },
        wrappers: [wrapperPage]
      },
      {
        path: '/about',
        exact: true,
        component: About
      },
      {
        path: '/',
        exact: true,
        component: Home,
        getInitialProps: async () => {
          return { count: 1 };
        },
        pageConfig: {
          title: 'Home Page'
        }
      },
      {
        path: '*',
        component: Notfound
      },
    ]
  }
];

export default routes;
