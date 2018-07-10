import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import routerConfig from '../routerConfig';

const routes: Routes = [{ path: '', redirectTo: 'home', pathMatch: 'full' }];

const layoutMap = {};

function removeDiagonal(path) {
  return path.replace(/^[\/]+/, '');
}

// 根据 layout 分类路由
routerConfig.forEach((router) => {
  if (typeof router.layout !== 'undefined') {
    if (!layoutMap[router.layout.name]) {
      layoutMap[router.layout.name] = {
        path: '',
        component: router.layout,
        children: [],
      };
    }
    layoutMap[router.layout.name].children.push({
      path: removeDiagonal(router.path),
      component: router.component,
    });
  } else {
    routes.push({
      path: removeDiagonal(router.path),
      component: router.component,
    });
  }
});

if (Object.entries(layoutMap).length) {
  Object.entries(layoutMap).forEach(([key, r]) => {
    routes.push(r);
  });
}

// 加载页面模块的 module 定义。
const modules = routerConfig
  .filter((router) => {
    return 'module' in router;
  })
  .map((router) => {
    return router.module;
  });

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), ...modules],
  exports: [RouterModule],
})
export class AppRoutingModule {}
