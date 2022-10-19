---
title: 路由
order: 4
---

一个应用，通常包含多张页面，每张页面对应不同的地址。在 ICE 中，采用了约定式路由，会根据项目的目录结构自动生成应用的路由信息。

## 路由组件

路由组件，是每一个页面的入口文件，通过 `export default` 导出其具体实现，例如:

```tsx
// src/pages/index.tsx
export default function Home() {
  return (
    <div>Hello ICE</div>
  );
};
```

更多能力，详见[页面](./page.md)。

## 路由规则

在 `src/pages` 目录下创建的每一个 `.(js|jsx|tsx)` 文件, 都对应着一个具体的路由。如下面的目录结构：

```
/src
└── pages
   └── repo
   |  ├── index.tsx
   |  └── preview.tsx
   ├── about.tsx
   └── index.tsx
```

对应的路由匹配规则为：

| URL              | 路由组件                    |
| ---------------  |:--------------------------:|
|  /               | pages/index.tsx            |
|  /about          | pages/about.tsx            |
|  /repo           | pages/repo/index.tsx       |
|  /repo/preview   | pages/repo/preview.tsx     |

## 路由跳转

ice.js 通过 `Link` 组件，来提供路由间的跳转能力。基于 `Link` 组件，可以只加载下一个页面相比于当前页面差异化的 Bundle 进行渲染，以达到更好的性能体验。

```jsx
// src/pages/index.tsx
import { Link } from 'ice';

export default function Home() {
  return (
    <>
      <div>Hello ICE</div>
      <Link to="/about">about ice</Link>
    </>
  );
}
```

## 布局组件

在 `pages` 目录下，还可以创建一类特殊的组件，来维护全局或一组页面共用的布局, 其文件名约定为 `layout.(js|jsx|tsx)`。

布局组件和路由组件一样，也通过 `export default` 导出其具体实现。

```jsx
import { Outlet } from 'ice';

export default function Layout() {
  return (
  	<div>
      <h1>Root Layout</h1>
      <h2>Hello ICE</h2>
      <Outlet />
    </div>
  )
}
```

其中, `<Outlet />` 组件对应需要被布局组件嵌套的子组件。

布局组件：
- 如果位于 `pages` 目录的最顶层，则它将作为全局布局，嵌套在所有路由组件外。
- 如果位于某个子文件夹，则它将作为页面级布局，嵌套在这个目录下的其他路由组件外。

如果同时存在 **全局布局组件** 和 **页面级布局组件**，则全局布局组件会嵌套于页面级布局组件之外。

例如，下面的目录结构：

```diff
/src
├── layout.tsx
└── pages
   └── repo
+  |  ├── layout.tsx  页面级布局组件
   |  ├── index.tsx
   |  └── preview.tsx
   ├── about.tsx
+  ├── layout.tsx  全局布局组件
   └── index.tsx
```

每个路由，对应的 Layout 匹配规则为：

| URL              | 路由组件                    |                                       布局组件 |
| ---------------  |:--------------------------:|-------------------------------------------:|
|  /               | pages/index.tsx            |                             src/layout.tsx |
|  /about          | pages/about.tsx            |                             src/layout.tsx |
|  /repo           | pages/repo/index.tsx       | src/layout.tsx + src/pages/repo/layout.tsx |
|  /repo/preview   | pages/repo/preview.tsx     | src/layout.tsx + src/pages/repo/layout.tsx |

## 动态路由

路由中包含了动态参数的路由，被称做动态路由。如果文件名或者目录名是以 `$` 开头，则判定这个路由为动态路由。

> 注意：动态路由仅在 SSR 下生效。

例如，下面的目录结构：

```diff
/src
├── layout.tsx
└── pages
   └── repo
+     ├── $id
+     |  ├── author
+     |  |  └── $name.tsx
+     |  └── index.tsx
      ├── index.tsx
      └── preview.tsx
```

对应的路由匹配规则为：

| URL                  | 路由组件                    |
|----------------------|:--------------------------:|
| /repo                | pages/repo/index.tsx       |
| /repo/preview        | pages/repo/preview.tsx     |
| /repo/ice            | src/pages/repo/$id/index.tsx            |
| /repo/ice/author/foo | src/pages/repo/$id/author/$name.tsx |

在动态路由组件中可以通过 `useParams()` 方法拿到当前路由的参数：

```tsx
// src/pages/repo/$id/author/$name.tsx
import { useParams } from 'ice';

export default function() {
  const { id, name } = useParams();
  console.log(id);   // 'ice'
  console.log(name); // 'foo' 
  return <div />;
}
```
