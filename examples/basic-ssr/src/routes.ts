import Layout from '@/layouts';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Notfound from '@/pages/NotFound';

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        exact: true,
        component: Dashboard,
      },
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
