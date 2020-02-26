import Home from '@/pages/Home';
import Counter from '@/pages/Counter';

export default [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/counter',
    component: Counter
  }
]
