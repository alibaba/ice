---
title: 权限管理
order: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<details>
  <summary>示例</summary>
  <ul>
    <li>
      <a href="https://github.com/ice-lab/ice-next/tree/master/examples/basic-project" target="_blank" rel="noopener noreferrer">
        Basic Project
      </a>
    </li>
  </ul>
</details>

对于一个 Web 应用，权限管理是经常会涉及的需求之一，通常包含以下几种常见的权限管理类型：

- 页面权限：当用户访问某个没有权限的页面时跳转到无权限页面
- 操作权限：页面中的某些按钮或组件针对无权限的用户直接隐藏
- 接口权限：当用户通过操作调用没有权限的接口时跳转到无权限页面

icejs 提供 `@ice/plugin-auth` 插件，帮助用户更简单管理前两种类型的权限。接口权限管理请见数据请求文档。

## 安装插件

安装插件：

```bash
$ npm i @ice/plugin-auth -D
```

在 `ice.config.mts` 中添加插件：

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';
import auth from '@ice/plugin-auth';

export default defineConfig({
  plugins: [
   auth(),
  ],
});
```

## 初始化权限数据

大多数情况下权限管理通常需要从服务端获取权限数据，然后在前端通过权限对比以此控制页面、操作等等权限行为。约定在 `src/app.ts` 中导出 `auth` 对象，该对象包含从服务端异步获取初始化的权限数据，并且约定最终返回格式为 `{ initialAuth: { [key: string]: boolean } }`。

```ts title="src/app.ts"
import { defineAuthConfig } from '@ice/plugin-auth/esm/types';

export const auth = defineAuthConfig(async () => {
  // 模拟请求权限数据
  // const data = (await fetch('/api/auth')).json();
  return {
    initialAuth: {
      admin: true,
      guest: false,
    },
  };
});
```

## 页面权限

如需对某些页面进行权限控制，只需在页面组件的 `getConfig` 中配置准入权限即可。

<Tabs>
<TabItem value="home" label="src/pages/index.tsx">

```tsx
export default function Home() {
  return <div>Home</div>
}

export function getConfig() {
  return {
    // 当前用户是 admin 时，有权限访问该页面
    auth: ['admin'],
  };
}
```

</TabItem>
<TabItem value="user" label="src/pages/about.tsx">

```tsx
export default function About() {
  return <div>About</div>
}

export function getConfig() {
  return {
    // 当前用户是 admin 时，无权限访问该页面
    auth: ['guest'],
  };
}
```

</TabItem>
</Tabs>

## 操作权限

在某些场景下，如某个组件中要根据角色判断是否有操作权限，我们可以通过 useAuth Hooks 在组件中获取权限数据，同时也可以更新初始的权限数据。

### 获取权限数据

```tsx
import React from 'react';
import { useAuth } from 'ice';

function Foo() {
  const [auth] = useAuth();
  return (
    <>
      当前用户权限数据：
      <code>{JSON.stringify(auth)}</code>
    </>
  );
}
```

### 设置权限数据

```tsx
import React from 'react';
import { useAuth } from 'ice';

function Home() {
  const [auth, setAuth] = useAuth();

  // 更新权限，与默认的 auth 数据进行合并
  function updateAuth() {
    setAuth({ admin: false, guest: true });
  }

  return (
    <>
      当前用户角色：
      <code>{JSON.stringify(auth)}</code>
      <button type="button" onClick={updateAuth}>
        更新权限
      </button>
    </>
  );
}
```

### 自定义权限组件

对于操作类权限，通常我们可以自定义封装权限组件，以便更细粒度的控制权限和复用。

```tsx
import React from 'react';
import { useAuth } from 'ice';
import NoAuth from '@/components/NoAuth';

function Auth({ children, authKey, fallback }) {
  const [auth] = useAuth();
  // 判断是否有权限
  const hasAuth = auth[authKey];

  // 有权限时直接渲染内容
  if (hasAuth) {
    return children;
  } else {
    // 无权限时显示指定 UI
    return fallback || NoAuth;
  }
}

export default Auth;
```

使用如下：

```tsx
function Foo() {
  return (
    <Auth authKey={'starRepo'}>
      <Button type="button">Star</Button>
    </Auth>
  );
}
```

## 自定义 Fallback

支持自定义无权限时的展示组件，默认为 `<>No Auth</>`

```diff title="src/app.tsx"
import { defineAuthConfig } from '@ice/plugin-auth/esm/types';

export const auth = defineAuthConfig(async () => {
  return {
    initialAuth: {
      admin: true,
    },
+   NoAuthFallback: (routeConfig) => {
+     console.log(routeConfig); // 当前页面的配置 
+     return (
+       <div>没有权限</div>
+     )
+   },
+ };
});
```
