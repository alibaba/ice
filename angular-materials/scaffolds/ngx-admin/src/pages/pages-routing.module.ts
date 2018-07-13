import { RouterModule, Routes, RouterState } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

import routerConfig from '../routerConfig';
const removeDiagonal = (path: string): string => path.replace(/^[\/]+/, '');

// 惰性加载 loadChildren 必须显示声明在 routes 下
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'ui-features',
        loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
      },
      {
        path: 'components',
        loadChildren: './components/components.module#ComponentsModule',
      },
      {
        path: 'maps',
        loadChildren: './maps/maps.module#MapsModule',
      },
      {
        path: 'charts',
        loadChildren: './charts/charts.module#ChartsModule',
      },
      {
        path: 'editors',
        loadChildren: './editors/editors.module#EditorsModule',
      },
      {
        path: 'forms',
        loadChildren: './forms/forms.module#FormsModule',
      },
      {
        path: 'tables',
        loadChildren: './tables/tables.module#TablesModule',
      },
      {
        path: 'miscellaneous',
        loadChildren:
          './miscellaneous/miscellaneous.module#MiscellaneousModule',
      },
    ],
  },
];

// 根据 layout 分类路由
routerConfig.forEach(({ module, path, ...other }) => {
  const routerItem = {
    ...other,
    path: removeDiagonal(path),
  };

  routes[0].children.push(routerItem);
});

// 加载页面模块的 module 定义。
const modules = routerConfig
  .filter((router) => router.hasOwnProperty('module'))
  .map((router) => router.module);

@NgModule({
  imports: [RouterModule.forChild(routes), ...modules],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
