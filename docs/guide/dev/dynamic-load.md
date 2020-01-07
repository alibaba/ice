---
title: 资源按需加载
order: 12
---

当页面规模、依赖组件达到一定量之后，打包后的文件也会随之增大，但在浏览某个页面的时候并不需要一次性加载所有内容，只需加载当前页面的资源即可，此时可以参考本文档实现静态资源的切割及按需加载。

*提示：React 16.6.0 及以上版本的项目建议使用 [React.lazy](https://reactjs.org/docs/code-splitting.html#reactlazy)，否则建议使用三方
组件库 [react-loadable](https://github.com/jamiebuilds/react-loadable)。*

## 原理分析

在构建前端代码时，如果某个文件是用 `React.lazy` 而非普通的 `import` 引入的，那么构建工具会将该文件打包成一个单独的文件，通常类似 `1.js` `2.js` 这种，然后用户访问站点在切换到对应页面时，会动态加载对应的 js 文件然后执行渲染。

如果出现加载失败的情况，通常是因为 publicPath 配置的有问题，可以参考[工程配置文档](/docs/guide/dev/build#publicPath)。如果是阿里内部开发者，请参考[这篇文档](https://yuque.antfin-inc.com/ice/rdy99p/angwyx)。

## 快速使用

通常情况下，只需要在路由配置的文件里按照页面纬度控制是否需要按需加载即可：

```diff
import React from 'react';
import UserLayout from '@/layouts/UserLayout';
import BasicLayout from '@/layouts/BasicLayout';

- // 不需要按需加载
- import UserLogin from '@/pages/UserLogin';
+ // 按需加载
+ const UserLogin = React.lazy(() => import('@/pages/UserLogin'));

const routerConfig = [
  // ...
];

export default routerConfig;
```

同时在路由渲染的文件里使用 `Suspense` 包裹路由组件，这样在加载页面资源时就可以给用户显示一些加载状态了：

```diff
import React, { Suspense } from 'react';

<RouteComponent key={id} {...props}>
+  <Suspense fallback={<div>loading...</div>}>
    <Switch>
      {children.map((routeChild, idx) => {
        const { redirect, path: childPath, component } = routeChild;
        return RouteItem({
          key: `${id}-${idx}`,
          redirect,
          path: childPath && path.join(route.path, childPath),
          component,
        });
      })}
    </Switch>
+  </Suspense>
</RouteComponent>
```
