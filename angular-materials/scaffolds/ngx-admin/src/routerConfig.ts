import { Route } from '@angular/router';
import { NotFoundComponent } from './pages/miscellaneous/not-found/not-found.component';
import { DashboardComponent, DashboardModule } from './pages/dashboard';
export declare type RoutesModule = RouteModule[];
export interface RouteModule extends Route {
  children?: RoutesModule;
  module?: any;
}
const routerConfig: RoutesModule = [
  {
    path: '/dashboard',
    component: DashboardComponent,
    module: DashboardModule,
  },
];
/**
 * 末尾总是 push 重定向路由，如不需要则可以删除
 */

routerConfig.push({
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full',
});
routerConfig.push({
  path: '**',
  component: NotFoundComponent,
});
export default routerConfig;
