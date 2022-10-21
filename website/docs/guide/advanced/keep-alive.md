---
title: Keep Alive
---

<details open>
  <summary>示例</summary>
  <ul>
    <li>
      <a href="https://github.com/ice-lab/ice-next/tree/master/examples/with-keep-alive" target="_blank" rel="noopener noreferrer">
        with-keep-alive
      </a>
    </li>
  </ul>
</details>

ice.js 提供 Keep Alive 能力，支持在组件间进行切换时缓存被移除的组件实例。

使用 Keep Alive 能力需要安装 react 和 react-dom 的 experimental 版本：

```bash
$ npm i react@experimental react-dom@experimental -S
```

## 缓存路由组件

ice.js 提供 `<KeepAliveOutlet />` 组件，用于在路由切换时缓存被移除的组件状态。

:::caution

`<KeepAliveOutlet />` 目前是实验性的组件，可能会存在不稳定性。
:::

在 `src/pages/layout.tsx` 文件中引入 `<KeepAliveOutlet />` 组件后，即可缓存所有的路由组件：

```tsx title="src/pages/layout.tsx"
import { KeepAliveOutlet } from 'ice';

export default function Layout() {
  return (
    <>
      <h1>I'm Keep Alive</h1>
      <KeepAliveOutlet />
    </>
  );
}
```

## 缓存其他组件

除了缓存路由组件，还可以直接使用 React 18 提供的实验特性 `<Offscreen />` 组件，进一步缓存更细粒度的组件。

```tsx
import React from 'react';

// @ts-ignore
const Offscreen = React.unstable_Offscreen;

export default function Home() {
  const [auth, setAuth] = React.useState('admin');

  return (
    <>
      <div>
        <button onClick={() => setAuth('admin')}>Set Admin</button>
        <button onClick={() => setAuth('user')}>Set User</button>
      </div>
      <>
        <Offscreen mode={auth === 'admin' ? 'visible' : 'hidden'}>
          Admin Name: <input />
        </Offscreen>
        <Offscreen mode={auth === 'user' ? 'visible' : 'hidden'}>
          User Name: <input />
        </Offscreen>
      </>
    </>
  )
}
```
