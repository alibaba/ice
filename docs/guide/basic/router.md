---
title: 路由方案
order: 3
---

icejs 提供了 **配置式路由** 和 **约定式路由** 两种方案，默认推荐配置式路由方案，开发者可根据偏好选择。

当项目中存在 `src/routes.[ts|js]` 文件时，则使用配置式路由，否则使用约定式路由。

## 配置式路由

路由按照标准协议进行配置，用来描述路由的结构关系，路由配置协议如下：

```ts
// src/routes.ts
import UserLayout from '@/Layouts/UserLayout';
import UserLogin from '@/pages/UserLogin';
import NotFound from '@/components/NotFound';

const routerConfig = [
  // 分组路由，children 里的路由会将父节点的 component 作为布局组件
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '/login',
        exact: true,
        component: UserLogin,
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

## 约定式路由

顾名思义，约定式路由会根据项目的目录结构自动生成路由配置，无需开发者手动配置。约定式路由虽然不需要用户手动配置，但因为路由配置本身存在很多规则，因此约定式路由也需要约定一系列的目录结构设计，这本身也有一定的学习成本。

### 基础路由

假设 pages 的目录结构如下：

```markdown
src/pages
└── About
    └── index.tsx
└── Dashboard
    ├── a.tsx
    └── b.tsx
```

那么，框架自动生成的路由配置如下：

```ts
export default [
  {
    path: '/dashboard',
    exact: true,
    component: PageDashboard
  },
  {
    path: '/home/a',
    exact: true,
    component: PageHomeA
  },
  {
    path: '/home/b',
    exact: true,
    component: PageHomeB
  }
]
```

### 404 路由

如果 `src/pages/404.[jsx|tsx]` 或者 `src/pages/404/index.[jsx|tsx]` 文件存在，则将它作为 404 页面

### index 路由

如果 `src/pages/index.[jsx|tsx]` 文件存在，则会自动映射到 `/` 的路由。

### 嵌套路由

框架约定页面目录下存在名为 `_layout.[jsx|tsx]` 时，会产生一个嵌套路由，当前目录和子目录均为子路由。

假设 pages 的目录结构如下：

```markdown
src/pages
└── About
    ├── _layout.tsx
    ├── a.tsx
    └── b.tsx
└── Dashboard
    └── index.tsx
```

那么，框架自动生成的路由配置如下：

```js
[
  {
    path: '/about',
    exact: false,
    component: LayoutAbout,
    children: [
      {
        path: '/a',
        exact: true,
        component: PageAboutA
      },
      {
        path: '/b',
        exact: true,
        component: PageAboutB
      },
    ],
  },
  {
    path: '/dashboard',
    exact: true,
    component: PageDashboard
  }
]
```

### 动态路由

框架约定定义带参数的动态路由，需要创建对应的以下划线作为前缀的文件或目录。

- 路径中 `$` 作为文件夹或文件名的首个字符，标识一个动态路由，如 `src/pages/app/$uid.tsx` 会生成路由 `/app/:uid`
- 路径中文件夹或文件名的首个和最后一个字符同时为 `$`，标识一个可选的动态路由，如 `src/pages/app/$uid$.tsx` 会生成路由 `/app/:uid?`

假设 pages 的目录结构如下：

```markdown
src/pages
└── repo
    ├── $pid.tsx
    └── index.tsx
└── $uid$.tsx
```

那么，框架自动生成的路由配置如下：

```js
export default [
  {
    path: '/repo/:pid',
    exact: true,
    component: PageRepo$pid
  },
  {
    path: '/repo',
    exact: true,
    component: PageRepo
  },
  {
    path: '/:uid?',
    exact: true,
    component: Page$uid$
  }
]
```

### 全局 Layout

如果 `src/layouts/index.[jsx|tsx]` 文件存在，则将它默认作为全局 layout

## 路由配置

### 运行时配置

在 `src/app.ts` 中，我们可以配置路由的类型和基础路径等路由信息，具体配置如下：

```js
import { createApp } from 'ice'

const appConfig = {
  router: {
    type: 'browser',
    basename: '/seller',
    modifyRoutes: (routes) => {
      return routes;
    }
  }
};

createApp(appConfig);
```

**options**:

- type: 路由类型，默认值 `hash`，可选值 `browser|hash|static`
- basename: 路由基准地址
- modifyRoutes: 动态修改路由

### 构建配置

在 `build.json` 中，我们也可以自定义一些构建配置：

```json
{
  "router": {
    // ...options
  }
}
```

**options**:

- **configFile**: 仅配置式路由，类型 `string`，默认值 `'src/routes.[t|j]s'`，自定义配置式路由文件的地址
- **caseSensitive**: 仅约定式路由，类型 `boolean`，默认值 `false`， 根据文件名转换为路由时是否大小写敏感
- **ignoreRoutes**: 仅约定式路由，类型 `string[]`，默认值 `[]`，忽略指定路由的生成
- **ignorePaths**: 仅约定式路由，类型 `string[]`，默认值 `['components']`，生成路由时忽略指定目录

## 路由跳转

### 通过 Link 组件跳转

通过 `<Link />` 标签组件可实现路由跳转，使用方式：

```javascript
import { Link } from 'ice';

function Demo() {
  return (
    <div>
      <Link to="/courses?sort=name" />

      {/* 可以携带额外的数据 `state` 到路由中。 */}
      <Link
        to={{
          pathname: '/courses',
          search: '?sort=name',
          hash: '#the-hash',
          state: { fromDashboard: true },
        }}
      />
    </div>
  )
}
```

### 通过 withRouter 方法调用实现跳转

如果调用方法的地方在 React 组件内部，可以直接在组件上添加 `withRouter` 的装饰器，然后组件内可以通过 `props` 获取到相关 API：

```javascript
import React from 'react';
import { withRouter } from 'ice';

function ShowTheLocation(props) {
  const { history, location } = props;
  const handleHistoryPush = () => {
    history.push('/new-path');
  };

  return (
    <div>
      <div>当前路径： {location.pathname}</div>
      <button onClick={handleHistoryPush}>点击跳转新页面</button>
    </div>
  );
}

export default withRouter(ShowTheLocation);
```

## 路由 API

icejs 的路由能力基于 react-router，因此你也可以获取到 react-router 支持的其他路由 API：

```js
import {
  Link,
  NavLink,
  Prompt,

  withRouter,
  matchPath,
  generatePath,

  useHistory,
  useLocation,
  useParams,
  useRouteMatch
} from 'ice';
```

## 常见问题

### 路由带着 `#` 号？

前端路由通常有两种实现方式：HashHistory 和 BrowserHistory，路由都带着 `#` 说明使用的是 HashHistory。这两种方式优缺点如下：

| 特点\\方案 | HashRouter | BrowserRouter |
| --- | --- | --- |
| 美观度 | 不好，有 # 号 | 好 |
| 易用性 | 简单 | 中等，需要 server 配合 |
| 依赖 server | 不依赖 | 依赖 |
| 跟锚点功能冲突 | 冲突 | 不冲突 |
| 兼容性 | IE8 | IE10 |

开发者可以根据自己的实际情况选择对应方案。

### 如何启用 `BrowserRouter` ？

本地开发时，只需要在 `src/app.ts` 中增加以下配置即可：

```diff
import { createApp } from 'ice'

const appConfig = {
  router: {
+    type: 'browser',
  }
};

createApp(appConfig);
```

线上运行时需要服务端支持，否则会出现刷新 404 问题，具体方案请参考社区文档：

- [关于 react-router 的 browserHistory 模式](https://github.com/LoeiFy/Recordum/issues/15)
- [react-router 之 HashRouter & BrowserRouter](https://zzugbb.github.io/passages/react-router%E9%97%AE%E9%A2%98/)