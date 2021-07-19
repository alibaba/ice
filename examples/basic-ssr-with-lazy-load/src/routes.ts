import { lazy } from 'ice';
import Layout from '@/layouts';
import Notfound from '@/pages/NotFound';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/home',
        exact: true,
        component: Home,
        getInitialProps: async () => {
          // const res = await request('/profile');
          const res = {
            data: {
              profile: {
                id: 10001,
                name: 'Jack Ma',
                edu: 'Hangzhou Normal University',
                address: 'Hangzhou'
              },
              title: 'Home Page...',
              content: 'Home Content...',
              description: 'Home Description...'
            }
          };
          return { ...res.data, title: 'Home Page...' };
        }
      },
      {
        path: '/about',
        exact: true,
        component: About,
        getInitialProps: async () => {
          return { title: 'About Page...' };
        }
      },
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '*',
        component: Notfound
      }
    ]
  }
];
