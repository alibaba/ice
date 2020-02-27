const Dashboard = import('@/pages/Dashboard');
const Home = import('@/pages/Home');
const About = import('@/pages/About');
const Notfound = import('@/pages/NotFound');

export default [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard
  },
  {
    path: '/about',
    exact: true,
    component: About
  },
  {
    path: '*',
    exact: true,
    component: Notfound
  },
];
