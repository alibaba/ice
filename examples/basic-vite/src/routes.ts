import { IRouterConfig } from 'ice';
import Home from './pages/index';

const routes: IRouterConfig[] = [
  {
    path: '/',
    component: Home,
  }
];

export default routes;
