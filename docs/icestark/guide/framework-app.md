---
title: 主应用开发与接入（React）
order: 4
---

对于 React 主应用，推荐使用 AppRouter/AppRoute 这种 React Component 的方式使用。

## 微应用管理与注册

通过 AppRouter/AppRoute 注册微应用：

```jsx
// src/App.jsx
import React from 'react';
import { AppRouter, AppRoute } from '@ice/stark';
import BasicLayout from '@/layouts/BasicLayout';

export default class App extends React.Component {
  render() {
    return (
      <BasicLayout>
        <AppRouter>
          <AppRoute
            title="商家平台"
            url={[
              '//unpkg.com/icestark-child-seller/build/js/index.js',
              '//unpkg.com/icestark-child-seller/build/css/index.css',
            ]}
          />
          <AppRoute
            path="/user"
            //...
          />
        </AppRouter>
      </BasicLayout>
    );
  }
}
```

通过 ReactDOM 渲染应用：

```jsx
// src/index.jsx
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```


## AppRouter 配置项

- onRouteChange：路由变化时触发
- NotFoundComponent：未匹配到微应用时渲染的组件
- ErrorComponent：微应用加载失败渲染的组件
- LoadingComponent：微应用加载过程渲染的组件
- basename：整个主应用部署在某个基础路由下

更多参数请参考 [API 介绍之 AppRouter](/docs/icestark/reference/api#AppRouter)。

## AppRoute 配置项

### 路由与微应用的映射关系

通过 path 和 exact 两个属性配置微应用的匹配规则，建立路由和微应用的映射关系。

```js
// 匹配符合 /seller/* 的所有路由
<AppRoute
  path="/seller"
/>

// 仅完全匹配 /seller 这一个路由
<AppRoute
  path="/seller"
  exact={true}
/>

// 匹配符合 /seller/* 以及 /user/* 的所有路由
<AppRoute
  path={["/seller", "/user"]}
/>

// 匹配 /user 这一个路由以及符合 /seller/* 的所有路由
<AppRoute
  path={[
    { path: "/seller", exact: true },
    { path: "/user", exact: false },
  ]}
/>
```

### 微应用入口

对于 entry/entryContent/url 方式的使用请参考文档[微应用入口](/docs/icestark/guide/app-entry)。在此基础上，结合 React 的能力 AppRoute 还支持了更为灵活的 component 和 render 方式配置微应用入口：

```js
<AppRoute
  path="/foo"
  render={() => {
    return <iframe src="" />;
  }}
  // 或者直接传入 component
  // component={CustomComponent}
/>
```

通过这种方式，可以通过 AppRoute 渲染一个 iframe 或者任意的 React 组件（比如 ReactRouter）。

### 其他参数

- umd：默认 `false`，标识微应用是否为 umd 类型
- sandbox：默认 `false`，是否开启 js 沙箱模式
- cache：默认 `false`，切换后是否缓存微应用，可能会引起内存占用过大问题，不建议开启
- hashType：默认 `false`，标识微应用的路由是否为 hash 模式

更多参数请参考 [API 介绍之 AppRoute](/docs/icestark/reference/api#AppRoute)。

## 主应用中路由跳转

如果在主应用里定义了一些路由页面，那么微前端主应用的层级如下：

```jsx
<FrameworkLayout>
  <AppRouter>
    <AppRoute path="/seller" url={[]} />
    <AppRoute path="*" component={() => {
      return <ReactRouter></ReactRouter>
    }} />
  </AppRouter>
<FrameworkLayout>
```

这里面可以看到 FrameworkLayout 是在 ReactRouter 外层的，因此在 FrameworkLayout 里是没法使用 react-router 提供的 API，比如 `withRouter`, `Link`, `useParams` 等。如果要做路由跳转建议通过 `appHistory` 或者 `AppLink` 来实现：

```diff
import React from 'react';
+import { appHistory, AppLink } from '@ice/stark-app';

export default function FrameworkLayout() {
  return (
    <>
      <span
        onClick={() => {
+          appHistory.push('/seller/list');
        }}
      >
        seller
      </span>
+      <AppLink to="/waiter/list">waiter</AppLink>
    </>
  );
}
```

## 主应用中如何包含路由页面

我们不推荐主应用里包含一些具体的路由页面，但是如果业务有这种需求，比如想把登录注册之类的通用页面放在主应用里，可以按照下面的方式。

> 注意：使用官方模板创建出来的 icejs 主应用默认支持该能力

```diff
// src/App.jsx
import React from 'react';
import { AppRouter, AppRoute } from '@ice/stark';
+import { Router, Switch, Route } from 'react-router';
import BasicLayout from '@/layouts/BasicLayout';
+import Home from './pages/Home';
+import Login from './pages/Login';

export default class App extends React.Component {
  render() {
    return (
      <BasicLayout>
        <AppRouter>
          <AppRoute path="/seller" />
          <AppRoute path="/user" />
+          <AppRoute
+            path="*"
+            render={() => {
+              return (
+                <Router>
+                  <Switch>
+                    <Route path="/login" component={Login} />
+                    <Route path="/" exact component={Home} />
+                    <Route path="*" exact component={NotFound} />
+                  </Switch>
+                </Router>
+              );
+            }}
+          />
        </AppRouter>
      </BasicLayout>
    );
  }
}
```

## 通过数据驱动注册微应用列表

在很多场景下，我们的微应用可能通过一些配置平台注册，这时候可以将所有微应用的信息通过全局变量输出到 html 中，然后前端通过该数据注册微应用：

```jsx
// src/App.jsx
import React from 'react';
import { AppRouter, AppRoute } from '@ice/stark';

export default class App extends React.Component {
  render() {
    return (
      <AppRouter>
        {
          (window.appConfig || []).map((item) => {
            return (
              <AppRoute
                key={idx}
                path={item.path}
                title={item.title}
                url={item.url}
              />
            );
          })
        }
      </AppRouter>
    );
  }
}
```

## 应用级别权限校验

icestark 支持对 `AppRoute` 再进行二次封装，统一处理容器定制/权限校验等场景：

```jsx
// src/components/AuthAppRoute.js
import React, { useState, useEffect } from 'react';
import { AppRoute } from '@ice/stark';

export default function AuthAppRoute(props) {
  const [loading, setLoading] = useState(true);
  const [hasAuth, setHasAuth] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasAuth(true);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div>wait for a moment</div>;
  }

  if (!hasAuth) {
    return <div>No access!</div>;
  }

  return (
    <div>
      //  注意要将 ...others 透传给 AppRoute
      <AppRoute {...props} />
    </div>
  );
}
```

封装完成后即可在 AppRouter 下使用：

```jsx
// src/App.jsx
import React from 'react';
import { AppRouter, AppRoute } from '@ice/stark';
import NotFound from '@/components/NotFound';
import PageLoading from '@/components/PageLoading';
import BasicLayout from '@/layouts/BasicLayout';
import AuthAppRoute from '@/components/AuthAppRoute';

export default class App extends React.Component {
  render() {
    return (
      <BasicLayout>
        <AppRouter
          NotFoundComponent={NotFound}
          LoadingComponent={PageLoading}
        >
          {/* 注意：path/url/entry 等配置信息配置在组件外层，AppRouter 的直接子元素上 */}
          <AuthAppRoute
            path={['/', '/message', '/about']}
            exact
            title="主页"
            url={[
              '//unpkg.com/icestark-child-common/build/js/index.js',
              '//unpkg.com/icestark-child-common/build/css/index.css',
            ]}
          />
        </AppRouter>
      </BasicLayout>
    );
  }
}
```

## 不同页面 Layout 不同

通过 AppRouter 的 `onRouteChange` 属性可以捕获到所有的路由变化，此时可以根据不同路由对 Layout 做一些状态的变化，实现不同页面不同布局的能力。

```jsx
// src/App.jsx
import React from 'react';
import { AppRouter, AppRoute } from '@ice/stark';

export default class App extends React.Component {
  state = {
    pathname: '',
  }

  handleRouteChange = (pathname) => {
    console.log('route change', pathname);
    // 如有需求，可根据 pathname 切换 layout 的形态
    this.setState({
      pathname,
    });
  }

  render() {
    const { pathname } = this.state;

    return (
      <!-- BasicLayout 可根据 pathname 属性切换展现形式 -->
      <BasicLayout pathname={pathname}>
        <AppRouter
          onRouteChange={this.handleRouteChange}
        >
          <AppRoute />
        </AppRouter>
      </BasicLayout>
    );
  }
}
```
