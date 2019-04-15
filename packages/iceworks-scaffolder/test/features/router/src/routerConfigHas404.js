import Page3 from './pages/Page3';
import NotFound from './pages/NotFound';
import BlankLayout from './layouts/BlankLayout';

const routerConfig = [
  {
    path: 'hello',
    component: Page3,
    layout: BlankLayout,
  },
  {
    path: '*',
    component: NotFound,
    layout: BlankLayout,
  },
];

export default routerConfig;
