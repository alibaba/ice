import { HomeComponent, HomeModule } from './pages/home';
import { DashboardComponent, DashboardModule } from './pages/dashboard';

interface ROUTER_ITEM {
  path: String;
  component: any;
  module?: any;
  layout?: any;
}

const routerConfig: Array<ROUTER_ITEM> = [
  {
    path: '/home',
    component: HomeComponent,
    module: HomeModule,
  },
  {
    path: '/dashboard',
    component: DashboardComponent,
    module: DashboardModule,
  },
];

export default routerConfig;
