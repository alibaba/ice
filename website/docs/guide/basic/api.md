---
title: API
order: 15
---


## Hooks

### `useMounted`

该方法会在 React Hydrate 完成后返回 `true`，一般在开启 SSR/SSG 的应用中，用于控制在不同端中渲染不同的组件。

:::caution

使用此 `useMounted` 而不是 `typeof windows !== 'undefined'` 来判断当前是否在 Client 端中渲染。

因为第一次 Client 端渲染必须与 Server 端渲染的接口一致，如果不使用此 Hook 判断的话，在 Hydrate 时可能出现节点不匹配的情况。
:::

使用示例：

```tsx
import { useMounted } from 'ice';

const Home = () => {
  const mounted = useMounted();
  return <div>{mounted ? 'Client' : 'Server'}</div>;
};
```

## 组件

### `<ClientOnly />`

`<ClientOnly />` 组件只允许在 React Hydrate 完成后在 Client 端中渲染组件。

:::tip

用 `<ClientOnly />` 组件包裹不能在 Node.js 中运行的组件，比如如果组件要访问 `window` 或 `document` 对象。
:::

**Props**

- `children`: 一个函数，且返回仅在浏览器中渲染的组件。该函数不会在 Server 端中执行
- `fallback`（可选）: 在 React Hydrate 完成之前渲染的组件

使用示例：

```tsx
import { ClientOnly } from 'ice';

export function Home () {
  return (
    <ClientOnly fallback={<div>loading...</div>}>
      {() => <span>page url is {window.location.href}</span>}
    </ClientOnly>
  );
};
```

引入一个组件：

```tsx
import { ClientOnly } from 'ice';
import MyComponent from './MyComponent';

export function Home () {
  return (
    <ClientOnly fallback={<div>loading...</div>}>
      {() => <MyComponent />}
    </ClientOnly>
  );
};
```

### `<KeepAliveOutlet />`

缓存所有路由组件的状态。详细使用方式参考 [Keep Alive 文档](../advanced/keep-alive/#缓存路由组件)。
