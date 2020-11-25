---
title: 路由配置
order: 3
---

icejs 推荐使用 **配置式路由** 进行应用的路由管理，如果希望使用约定式路由可参考 [文档](/docs/guide/advance/convention-routing)。

## 配置路由信息

应用的路由信息统一在 `src/routes.ts` 中配置，配置协议支持多级嵌套，具体如下：

```ts
import UserLayout from '@/Layouts/UserLayout';
import UserLogin from '@/pages/UserLogin';
import NotFound from '@/components/NotFound';
import wrapperPage from '@/components/WrapperPage';

const routerConfig = [
  // 分组路由，children 里的路由会将父节点的 component 作为布局组件
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        // 路由路径
        path: '/login',
        // 精确匹配
        exact: true,
        // 路由组件
        component: UserLogin,
        // 配置路由的高阶组件
        wrappers: [wrapperPage]
      },
      {
        path: '/',
        // 重定向
        redirect: '/user/login',
      },
      {
        // 404 没有匹配到的路由
        component: NotFound,
      },
    ],
  },
  // 非分组路由
  {
    path: '/about',
    component: About,
  },
];

export default routerConfig;
```

> 注意：路由有一个按顺序匹配的规则，从上到下一旦命中路由匹配规则就会停止遍历，因此如果你在最前面配置了 / 这样一个路由，则所有的路由都会命中该规则，导致其他路由没有效果，所以在开发时要注意路由的顺序以及 exact 属性的使用。

## 运行时配置

在 `src/app.ts` 中，我们可以配置路由的类型和基础路径等信息，具体配置如下：

```jsx
import { runApp } from 'ice';

const appConfig = {
  router: {
    type: 'browser',
    basename: '/seller',
    fallback: <div>loading...</div>
    modifyRoutes: (routes) => {
      return routes;
    }
  }
};

runApp(appConfig);
```

**options**:

- type: 路由类型，默认值 `hash`，可选值 `browser|hash|static`
- basename: 路由基准地址
- fallback: 开启按需加载时配置 fallback UI
- modifyRoutes: 动态修改路由
- history: 自定义创建 history 对象，[详见](https://github.com/ReactTraining/history/blob/master/docs/GettingStarted.md)

## 路由组件参数

对于路由组件（即页面级组件），可通过 `props` 获取到如下属性：

- `location`：当前路由的 location 对象，包含 `pathname`、`search`、`hash`、`state` 属性
- `history`：详见 [history api](/docs/guide/basic/api#history)
- `searchParams`：当前 URL 的查询参数对象（需要开启 [parseSearchParams](/docs/guide/basic/app#启动项配置)）
- `match`：当前路由和 URL match 后的对象，包含 `path`、`url`、`params`、`isExact` 属性

对于非路由组件，组件内如想获取上述属性需要借助 [withRouter](/docs/guide/basic/api#withRouter) API。

## 路由跳转

- React 组件内部：使用 [Link 组件](/docs/guide/basic/api#Link) 或 [useHistory](/docs/guide/basic/api#useHistory) API
- 非 React 组件内部：使用 [history API](/docs/guide/basic/api#history)

## 按需加载

参考 [代码分割](/docs/guide/advance/code-splitting) 。

## 路由高阶组件

通过 `src/routes.ts` 中的 `wrappers` 字段可配置路由的高阶组件，常用于路由级别的权限检验。

#### 配置 wrappers

```diff
+import WrapperPage from '@/components/WrapperPage';

const routerConfig = [
  {
    path: '/user',
    component: User,
    // 配置路由的高阶组件
+    wrappers: [WrapperPage]
  },
]
```

> 注意：Wrapper 组件不支持通过 lazy 导入

#### 实现高阶组件

```tsx
// src/components/LoginWrapper
import { useAuth, Redirect } from 'ice';

const LoginWrapper = (WrappedComponent) => {
  const Wrapped = () => {
    const [auth] = useAuth();
    return (
      <>
        {
          auth.isLogin ? <WrappedComponent {...props} /> : <Redirect to="/login" />;
        }
      </>
    )
  };

  return Wrapped;
}

export default LoginWrapper;
```

通过 `wrappers` 配置我们可以对路由组件进行自定义包装，如上示例通过 WrapperPage 高阶组件对路由组件进行权限判断，如果是登录状态，则渲染 User 组件，否则跳转到 `/login` 路由。

> `useAuth` API 需要结合 plugin-ice-auth 插件实现，可参考 [权限管理](/docs/guide/advance/auth) 。

## 常见问题

### HashHistory 与 BrowserHistory

前端路由通常有两种实现方式：HashHistory 和 BrowserHistory，路由都带着 `#` 说明使用的是 HashHistory。这两种方式优缺点：

| 特点\\方案 | HashRouter | BrowserRouter |
| --- | --- | --- |
| 美观度 | 不好，有 # 号 | 好 |
| 易用性 | 简单 | 中等，需要 server 配合 |
| 依赖 server | 不依赖 | 依赖 |
| 跟锚点功能冲突 | 冲突 | 不冲突 |
| 兼容性 | IE8 | IE10 |

开发者可以根据自己的实际情况选择对应方案。

### 如何使用 BrowserRouter

本地开发时，只需要在 `src/app.ts` 中增加以下配置即可：

```diff
import { runApp } from 'ice';

const appConfig = {
  router: {
+    type: 'browser',
  }
};

runApp(appConfig);
```

线上运行时需要服务端支持，否则会出现刷新 404 问题，具体方案请参考社区文档：

- [关于 react-router 的 browserHistory 模式](https://github.com/LoeiFy/Recordum/issues/15)
- [react-router 之 HashRouter & BrowserRouter](https://zzugbb.github.io/passages/react-router%E9%97%AE%E9%A2%98/)

### 如何使用动态路由

在某些场景下可能需要动态指定路由即 `/user/:id`，使用方式如下：

路由配置：

```ts
import UserInfo from '@/pages/UserInfo';

// src/routes.ts
const routerConfig = [
  {
    path: '/user/:id',
    exact: true,
    component: UserInfo,
  }
]
```

动态路由参数：

```tsx
import { useParams } from 'ice';

export default = () => {
  const { id } = useParams();
  // console.log(id) // 123
}
```
