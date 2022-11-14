---
title: API
order: 15
---

### defineAppConfig

该方法用于获取框架配置的类型提示。

```ts title="src/app.ts"
import { defineAppConfig } from 'ice';

export default defineAppConfig(() => ({
  app: {
    rootId: 'ice-container',
  }
}));
```

### definePageConfig

该方法用于获取路由组件支持的配置类型，支持的配置可以被插件动态扩展。

```tsx title="src/pages/home.tsx"
import { definePageConfig } from 'ice';

export const pageConfig = definePageConfig(() => ({
  title: 'About',
  meta: [
    {
      name: 'theme-color',
      content: '#eee',
    },
  ],
}));
```

### history

应用的 history，用于获取路由信息、执行跳转等。

```ts

import { history } from 'ice';

export function historyPush (link: string) {
  history.push(link);
}
```

:::caution

在应用入口 `src/app.ts` 导入使用时，由于 history 还未完成初始化创建，不能以立即执行的方式使用。推荐以上述方式封装后在必要的时候进行调用。
:::

### useParams

useParams 函数返回动态路由的匹配参数信息。

```tsx
import { useParams } from 'ice';

// 路由规则为  home/:uid/repo/:repoid
// 当前路径       home/clark/repo/1234
export default function Home() {
  const params = useParams();
  // params 输出内容为 { uid: 'clark', repoid: '1234'}
  return (
    <>
      <h2>Home Page</h2>
    </>
  );
}
```

### useSearchParams

useSearchParams 用于读取和修改当前 URL 的 query string。

```tsx
import { useParams } from 'ice';

// 路由规则  home?uid=1234
export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  // searchParams 输出内容为 { uid: '1234'}
  
  const changeSearch = () => {
    // 通过 setSearchParams 可以修改对应 query string
    setSearchParams({ uid: '4321'});
  }
  return (
    <>
      <h2>Home Page</h2>
    </>
  );
}
```

### useNavigate

useNavigate 函数返回一个可以控制跳转的函数，用于组件内部控制路径跳转

```tsx
import { useNavigate } from 'ice';

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/logout', { replace: true });
  }, []);
  
  return (
    <>
      <h2>Home Page</h2>
    </>
  );
}
```

### useLocation

useLocation 返回当前 location 信息。

```tsx
import { useLocation } from 'ice';
 
function Home() {
  const location = useLocation();
  useEffect(() => {
    // send pv info  
  }, [location]);
  return (
    <>
      <h2>Home Page</h2>
    </>
  );
}
```

### useAppData

useAppData 返回应用全局数据，需要搭配 `src/app.ts` 中导出的 `dataLoader` 使用：

```ts title="src/app.ts"
import { defineDataLoader } from 'ice';

export const dataLoader = defineDataLoader(() => {
  return await fetch('/api/user');
})
```

在任意组件内进行消费：

```tsx
import { useAppData } from 'ice';
 
function Home() {
  const data = useAppData();
  // data 内容为 /api/user 接口返回数据
  return (
    <>
      <h2>Home Page</h2>
    </>
  );
}
```

### useData

useData 返回路由组件数据，需要搭配在路由组件中定义数据获取方法进行使用。参考[页面数据请求文档](./data-loader)

### useConfig

useConfig 返回路由组件配置，搭配 [definePageConfig](./api#definepageconfig)。

```tsx title="src/pages/home.tsx"
import { definePageConfig, useConfig } from 'ice';

export default function Home() {
  const config = useConfig();
  return (
    <>
      <h2>Home Page</h2>
    </>
  );
}

export const pageConfig = definePageConfig(() => ({
  title: 'About',
  meta: [
    {
      name: 'theme-color',
      content: '#eee',
    },
  ],
}));
```

### useMounted

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

### `<Link />`

`<Link>` 是 React 组件，用于渲染带路由跳转功能的 `<a>` 元素。

```tsx
import { Link } from 'ice';
 
function Home() {
  const data = useAppData();
  // data 内容为 /api/user 接口返回数据
  return (
    <>
      <h2>Home Page</h2>
      <Link to="/user">user</Link>
    </>
  );
}
```

### `<Outlet />`

`<Outlet>` 用于渲染父路由中渲染子路由，通常出现在 `layout.tsx` Layout 组件中。

```tsx title="src/layout.tsx"

import { Outlet } from 'ice';
 
export default function Layout() {
  return (
    <div>
      <h1>title</h1>
      <Outlet />
    </div>
  );
}
```

### AppConfig

AppConfig 是 TS 类型定义，用于获取框架配置类型。

```ts
import type { AppConfig } from 'ice';
```

:::caution

推荐通过 [defineAppConfig](./api#defineappconfig) 的方式在入口定义应用类型，如果涉及到类型拓展和泛型的应用可以通过上述方式导入该类型。
:::

### RouteConfig

RouteConfig 是 TS 类型定义，用于获取路由配置类型。

```ts
import type { RouteConfig } from 'ice';
```

:::caution

推荐通过 [definePageConfig](./api#definepageconfig) 的方式在路由组件中定义类型，如果涉及到类型拓展和泛型的应用可以通过上述方式导入该类型。
:::

### Document 组件

`Meta`、`Title`、`Links`、`Scripts` 和 `Main` 组件仅支持在 `src/document.tsx` 中使用，使用场景参考 Document 文档](./document)

