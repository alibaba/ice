---
title: 权限管理
order: 8
---

对于一个 Web 应用，权限管理是经常会涉及的需求之一，通常包含以下几种常见的权限管理类型：

- 页面权限：当用户访问某个没有权限的页面时跳转到无权限页面；
- 操作权限：页面中的某些按钮或组件针对无权限的用户直接隐藏；
- 接口权限：当用户通过操作调用没有权限的接口时跳转到无权限页面。

## 使用权限插件

### 安装

```bash
# 安装权限插件
$ npm install build-plugin-ice-auth --save-dev
```

### 配置

在 `build.json` 中配置权限插件

```json
{
  "plugins": [
    "build-plugin-ice-auth"
  ]
}
```

## 初始化权限数据

大多数情况下权限管理通常需要从服务端获取权限数据，然后在前端通过权限对比以此控制页面、操作等等权限行为。在 icejs 框架中约定通过 `getInitialData` 从服务端异步获取初始化的权限数据，并且约定最终返回格式为 `{auth: {[key: string]: boolean }}` 的形式。


```tsx
import { createApp, request, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  app: {
    getInitialData: async () => {
      // 模拟服务端返回的数据
      const data = await request('/api/auth');
      const { role, starPermission, followPermission } = data;

      // 约定权限必须返回一个 auth 对象
      // 返回的每个值对应一条权限
      return {
        auth: {
          admin: role === 'admin',
          guest: role === 'guest',
          starRepo: starPermission,
          followRepo: followPermission
        }
      }
    },
  },
  auth: {
    // 可选的，设置无权限时的展示组件，默认为 null
    NoAuthFallback: <div>没有权限...</div>,
  }
};

createApp(appConfig);
```

## 页面权限

页面权限通常也称之为路由权限，如需对某些页面进行权限控制只需在页面组件的 `pageConfig` 中配置准入权限即可。

```tsx
import React from 'react';

const Home = () => {
  return <>Home Page</>;
};

Home.pageConfig = {
  // 可选，配置准入权限，若不配置则代表所有角色都可以访问
  auth: ['admin'],
};
```

## 操作权限

在某些场景下，如某个组件中要根据角色判断是否有操作权限，我们可以通过 `useAuth` Hooks 在组件中获取权限数据，同时也可以更新初始的权限数据。

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

function Foo() {
  const [auth, setAuth] = useAuth();

  // 更新权限
  function updateAuth() {
    setAuth({ starRepo: false, followRepo: false });
  }

  return (
    <>
      当前用户角色：
      <code>{JSON.stringify(auth)}</code>
      <button type="button" onClick={updateAuth}>更新权限</button>
    </>
  );
}
```

### 自定义权限组件

对于操作类权限，通常我们可以自定义封装权限组件，以便更新粒度的控制权限和复用。

```ts
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
    return fallback || NoAuth
  }
};

export default Auth;
```

使用如下：

```tsx
function Foo () {
  return (
    <Auth authKey={'starRepo'}>
      <Button type="button">Star</Button>
    </Auth>
  )
}
```

## 接口鉴权

请参考文档 [数据请求](https://ice.work/docs/guide/basic/request)，业务上封装统一的请求方法，与服务端约定接口协议，前端根据状态码判断无权限、未登录等状态，然后跳转到指定页面。

## API

### useAuth

用于在函数组件中获取和设置权限数据的 Hooks。

```ts
const [auth, setAuth] = useAuth();
```

示例：

```tsx
import React from 'react';
import { useAuth } from 'ice';

function Foo() {
  const [auth, setAuth] = useAuth();
  // auth：当前权限列表数据
  // setAuth：设置当前权限列表数据

  return (
    <>Foo</>
  );
}
```

### withAuth

用于在 Class 组件中获取和设置权限数据的高阶函数。

```ts
withAuth(Component)
```

示例：

```tsx
import React from 'react';

Class Foo extends React.Component {
  render() {
    const { auth, setAuth } = this.props;
    // auth：当前权限列表数据
    // setAuth：设置当前权限列表数据
    return (
      <>Foo</>
    )
  }
}

export default withAuth(Foo)
``
