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

<img src="https://img.alicdn.com/imgextra/i3/O1CN01Zezxbi21qXWDzWc9d_!!6000000007036-2-tps-890-588.png" width="500px" />

布局组件：
- 如果位于 `pages` 目录的最顶层，则它将作为全局布局，嵌套在所有路由组件外。
- 如果位于某个子文件夹，则它将作为页面级布局，嵌套在这个目录下的其他路由组件外。

如果同时存在 **全局布局组件** 和 **页面级布局组件**，则全局布局组件会嵌套于页面级布局组件之外。

## 嵌套路由

通过创建**文件夹**和**布局组件**，可以轻松构建嵌套路由。例如，下面的示例中，`/repo/preview` 页面，由这三个组件嵌套而成：

- layout.tsx
- repo/layout.tsx
- repo/preview.tsx

<img src="https://img.alicdn.com/imgextra/i1/O1CN01Zax1Rz1r5gqZhs4LX_!!6000000005580-2-tps-578-634.png" width="260px" />

ice.js 针对嵌套路由的场景，应用了以下优化，来让页面达成更好的性能体验：
- 各路由组件的**资源**和**数据请求**会被并行加载，以达到最快的资源加载速度。
- 路由间跳转，比如从 `/repo/preview` 跳转到 `/repo/edit`，框架只会加载差异化的路由组件 `edit.tsx` 进行渲染，而不会重新渲染整个页面。

利用框架对`嵌套路由`所做的优化，我们可以将页面中逻辑相对分离的部分，用嵌套路由的方式来组织，以获得更好的加载体验。

例如，下面这个常见的移动端营销页，可以将顶部通用的 `Slider` 抽象为布局组件，将不同 `tab` 下对应的瀑布流，抽象为路由组件。这样，`Slider` 和瀑布流就可以做到并行加载，并且当切换 `tab` 时，新的 tab 内容将由框架触发按需加载和渲染。[示例工程](https://github.com/alibaba/ice/tree/master/examples/with-nested-routes)

<img src="https://img.alicdn.com/imgextra/i3/O1CN01gKRkTc1aTe5QiWmpt_!!6000000003331-2-tps-1566-704.png" width="750px" />

:::tip
假如同时存在 `src/pages/home.tsx` 和 `src/pages/home/index.tsx`，则访问 `/home` 路由地址时，只有 `src/pages/home/index.tsx` 组件渲染。
:::

如果你想有嵌套路由，但是又不想创建有嵌套目录结构，你可以使用 `.` 来创建一个扁平的文件名。

```diff
└── src
    ├── root.jsx
    └── pages
-       ├── about
-       │   ├── repo
-       │   │   └── $id.tsx
        │   └── index.tsx
+       └── about.repo.$id.tsx
```

这样，我们就可以通过 `/about/repo/$id` 的路由地址访问到 `about.repo.$id.tsx` 的路由组件了。

## 动态路由

:::caution
小程序端不支持。
:::
在某些场景下可能需要动态指定路由，例如 `/user/:id`，可以以 `$` 开头创建文件名或目录名，比如 `src/pages/user/$id.tsx`：

<img src="https://img.alicdn.com/imgextra/i4/O1CN01IzAaaD1SnKBElEVDM_!!6000000002291-2-tps-722-440.png" width="350px" />

## 通配路由

`src/pages` 目录下的 `$.tsx` 文件将会被解析成通配路由。如果当前访问的路由没有任何组件能匹配，将会渲染通配路由组件。

<img src="https://img.alicdn.com/imgextra/i4/O1CN01bqlzGA1vQ4wBR4Hr8_!!6000000006166-2-tps-1152-744.png" width="350px" />

通常可以增加 `src/pages/$.tsx` 作为自定义 404 页面。

## 转义路由

默认情况下，对于 `src/pages/**/index.tsx` 这样的路由文件，路由的生成规则是这样的：


| 路由文件 | 路由    |
| :------------------ | ---- |
| src/pages/index.tsx | / |
| src/pages/about/index.tsx | /about |

可以看到，`index` 字符串不会出现在路由上，被转成 `/`。如果希望路由上保留 `/index`，可以使用转义字符 `[]`。

| 路由文件 | 路由    |
| :------------------ | ---- |
| src/pages/[index].tsx | /index |
| src/pages/about/[index].tsx | /about/index |

## 路由跳转

ice.js 提供三种方式进行路由间跳转，这样就可以只加载下一个页面相比于当前页面差异化的 Bundle 进行渲染，以达到更好的性能体验。

### history

可使用 [history](./api#history) API 进行路由跳转。

```tsx
import { history } from 'ice';

export default () => {
  history.push('/dashboard');
}
```

### useNavigate

组件内可以使用 [useNavigate](./api#usenavigate) Hook 进行路由跳转。

```tsx
import { useNavigate } from 'ice';

export default () => {
  const navigate = useNavigate();
  navigate('/logout');
}
```

### Link 组件

组件内可以使用 [`<Link />`](./api#link-) 组件进行路由跳转。

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

## 获取路由信息

### location

使用 [useLocation](./api#uselocation) 获取 location 信息。

```tsx
import { useLocation } from 'ice';

export default function () {
  const location = useLocation();
}
```

### query

使用 [useSearchParams](./api#usesearchparams) 获取和修改 query 信息。

```tsx
import { useSearchParams } from 'ice';

export default function Repo() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  setSearchParams({ tab: 'a' })
}
```

### 动态路由参数

在动态路由组件使用 [useParams](./api#useparams) 获取当前路由的参数。

```tsx
import { useParams } from 'ice';

// 路由规则为  /repo/:id
// 当前路径    /repo/123
export default function Repo() {
  const params = useParams();
  console.log(params);
  // { id: 123 }
}
```

## 忽略被解析为路由组件

默认情况下，ice.js 会把 `src/pages` 目录下的每一个 `.(js|jsx|tsx)` 文件映射为一个路由地址。如果你有一些组件不想被解析成路由组件，可通过 [ignoreFiles](./config#ignorefiles) 进行配置。

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';

export default defineConfig({
  routes: {
    ignoreFiles: [
      'custom.tsx',
      '**/components/**',   // 如果每个页面下有 components 目录存放当前页面的组件，可以通过添加此配置忽略被解析成路由组件
    ],
  },
});
```

## 定制路由地址

对于约定式路由不满足的场景，可以通过 [defineRoutes](./config#defineroutes) 方式进行自定义。

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';

export default defineConfig({
  routes: {
    defineRoutes: (route) => {
      // 将 /hello 路由访问内容指定为 about.tsx
      route('/hello', 'about.tsx');
    },
  },
});
```
