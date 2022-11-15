---
title: 路由
order: 4
---

ice.js 采用 `约定式路由`，并针对 `嵌套路由` 做了一系列加载和渲染上的优化，以构建出性能更好的 Web 应用。

## 基础概念

### 约定式路由

框架会根据项目的目录结构自动生成应用的路由信息。`src/pages` 目录下的每一个 `.(js|jsx|tsx)` 文件会被映射为一个路由地址，示例如下：

<img src="https://img.alicdn.com/imgextra/i1/O1CN01ehzrle1ym0kPnJeVH_!!6000000006620-2-tps-800-596.png" width="375px" />

### 小程序端路由规则

对于小程序来说，使用约定式路由会带来无法确定首页的问题（在原生小程序中，`app.json` 中 `pages` 数组的第一项即被指定为首页）。因此 ice.js 开发小程序时，用户需要在 src/app.tsx 中通过导出 `miniappManifest` 进行路由的指定，示例如下：

```
export const miniappManifest = {
  routes: [
    'index',
    'about',
    'repo/index',
    'repo/preview',
  ],
};
```

注意，`routes` 中的每一项应该与文件在 `pages` 目录下的实际路径保持一致，且其第一项将作为小程序的首页被加载。


### 路由组件

路由组件，是每一个页面的入口文件，通过 `export default` 导出其具体实现，例如:

```tsx title="src/pages/index.tsx"
export default function Home() {
  return (
    <div>Hello ICE</div>
  );
};
```

路由组件支持配置页面级信息和数据加载逻辑，详见[页面](./page.md)。

### 布局组件

:::caution
小程序端不支持。
:::

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

<img src="https://img.alicdn.com/imgextra/i4/O1CN01fzEkbu1ejSDqdLORM_!!6000000003907-2-tps-1010-668.png" width="500px" />

布局组件：
- 如果位于 `pages` 目录的最顶层，则它将作为全局布局，嵌套在所有路由组件外。
- 如果位于某个子文件夹，则它将作为页面级布局，嵌套在这个目录下的其他路由组件外。

如果同时存在 **全局布局组件** 和 **页面级布局组件**，则全局布局组件会嵌套于页面级布局组件之外。

### 路由跳转

ice.js 通过 `Link` 组件，来提供路由间的跳转能力。基于 `Link` 组件，可以只加载下一个页面相比于当前页面差异化的 Bundle 进行渲染，以达到更好的性能体验。

```tsx title="src/pages/index.tsx"
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

:::info
在小程序中，Link 组件底层实现即为原生 `navigator` 组件。
:::
## 嵌套路由

通过 `创建文件夹` 和 `布局组件`，可以轻松构建嵌套路由。例如，下面的示例中，`/repo/preview` 页面，由这三个组件嵌套而成：
- layout.tsx
- repo/layout.tsx
- repo/preview.tsx

<img src="https://img.alicdn.com/imgextra/i2/O1CN01r2SdhI1LAD2nH7wPU_!!6000000001258-2-tps-514-490.png" width="260px" />

ice.js 针对 `嵌套路由` 的场景，应用了以下优化，来让页面达成更好的性能体验：
- 各路由组件的 `资源` 和 `数据请求` 会被并行加载，以达到最快的资源加载速度。
- 路由间跳转，比如从 `/repo/preview` 跳转到 `/repo/edit`，框架只会加载差异化的路由组件 `edit.tsx` 进行渲染，而不会重新渲染整个页面。

利用框架对 `嵌套路由` 所做的优化，我们可以将页面中逻辑相对分离的部分，用 `嵌套路由` 的方式来组织，以获得更好的加载体验。

例如，下面这个常见的移动端营销页，可以将顶部通用的 `Slider` 抽象为 `布局组件`，将不同 `tab` 下对应的瀑布流，抽象为 `路由组件`。这样，`Slider` 和 `瀑布流` 就可以做到并行加载，并且当切换 `tab` 时，新的 tab 内容将由框架触发按需加载和渲染。[示例工程](https://github.com/ice-lab/ice-next/tree/master/examples/with-nested-routes)

<img src="https://img.alicdn.com/imgextra/i3/O1CN01gKRkTc1aTe5QiWmpt_!!6000000003331-2-tps-1566-704.png" width="750px" />

## 动态路由

:::caution
小程序端不支持。
:::
在某些场景下可能需要动态指定路由，例如 `/user/:id`，可以以 `$` 开头创建文件名或目录名, 例如 `src/pages/user/$id.tsx`:

<img src="https://img.alicdn.com/imgextra/i4/O1CN01IzAaaD1SnKBElEVDM_!!6000000002291-2-tps-722-440.png" width="350px" />

在动态路由组件中可以通过 `useParams()` 方法拿到当前路由的参数：

```tsx title="src/pages/user/$id.tsx"
import { useParams } from 'ice';

export default function() {
  const { id } = useParams();
  console.log(id);   // '11432'
  return <div />;
}
```

## 定制路由地址

对于约定式路由不满足的场景，可以通过在 `src/app.ts` 中 `defineAppConfig` 方式进行自定义，例如:

```js
import { defineAppConfig } from '@ice/app';

export default defineAppConfig({
  routes: {
    // 忽略 pages 下的 components 目录
    ignoreFiles: ['**/components/**'],
    defineRoutes: (route) => {
      // 将 /about-me 路由访问内容指定为 about.tsx
      route('/about-me', 'about.tsx');

      // 为 /product 路由添加 layout.tsx 作为 layout，并渲染 products.tsx 内容
      route('/', 'layout.tsx', () => {
        route('/product', 'products.tsx');
      });
    },
  },
});
```
