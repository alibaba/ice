---
title: 代码分割
order: 5
---

随着应用的增长，代码 bundle 的大小也将随之增长。为了避免因体积过大而导致加载时间过长，我们可以按照路由对代码进行分割成不同的代码块，然后当路由被访问的时候才加载对应的代码，能够显著地提高应用性能。

## 基于路由代码分割

### 配置式路由

在配置式路由中如果需要开启按需加载，只需要在路由文件中通过 `lazy` 方法引入组件即可：

```diff
// src/routes.ts
+ import { lazy } from 'ice';
- import UserLogin from '@/pages/UserLogin';
+ const UserLogin = lazy(() => import('@/pages/UserLogin'));

const routerConfig = [
  {
    path: '/login',
    component: UserLogin,
  },
]
```

### 约定式路由

在约定式路由中如果需要开启按需加载，只需要在 `build.json` 中的 router 选项配置 lazy 属性即可：

```diff
// build.json
{
  "router": {
+    "lazy": true
  }
}
```

### fallback

当组件动态加载过程中或者组件渲染失败时，可以通过 fallback 属性设置提示：

```diff
import { createApp } from 'ice';

const appConfig = {
  router: {
+    fallback: <div>loading...</div>
  }
}

createApp(appConfig);
```

### 非路由中代码分割

除了路由中进行代码分割，有时候我们在其他地方如页面中也想更小粒度的进行代分割，也可以使用 `lazy` 方法引入对应的组件：

```ts
import { lazy } from 'ice';
import React, { Suspense } from 'react';

const OtherComponent = lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

对应用进行代码分割可以避免加载用户永远不需要的代码，并在初始加载的时候减少所需加载的代码量，在大多数时候我们推荐使用代码分割来提升应用的加载速度和性能。
