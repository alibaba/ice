import Index from './pages/index';
import Home from './pages/home';

export default () => [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/home',
    component: Home,
  },
];
