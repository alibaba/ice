import Home from '@/pages/Home';
import About from '@/pages/About';

export default [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/about',
    component: About
  }
];
