---
title: 主应用开发与接入（React）
order: 4
---

对于 React 主应用，推荐使用 AppRouter/AppRoute 这种 React Component 的方式使用。

## 注册微应用

```jsx
// src/App.jsx
import React from 'react';
import { AppRouter, AppRoute } from '@ice/stark';
import NotFound from '@/components/NotFound';
import PageLoading from '@/components/PageLoading';
import BasicLayout from '@/layouts/BasicLayout';

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
      <BasicLayout pathname={pathname}>
        <AppRouter
          NotFoundComponent={NotFound}
          LoadingComponent={PageLoading}
          onRouteChange={this.handleRouteChange}
        >
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
          <AppRoute
            path="*"
            render={() => {
              return <></>;
            }}
          />
        </AppRouter>
      </BasicLayout>
    );
  }
}
```

## 微应用配置

### 基准路由 path

类型为 `string|string[]`，大部分情况下都是 string，通过 path 约束每个微应用的路由定义，建立路由和微应用的映射关系。

### 微应用入口 url/entry/entryContent

通过 AppRoute 注册微应用，微应用入口支持 url/entry/entryContent 方式，此部分与 API 注册使用一致，可参考文档[微应用入口](/docs/icestark/guide/framework-api#微应用入口)使用。

在此基础上，AppRoute 还支持了更为灵活的 component 和 render 方式配置微应用入口：

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

通过这种方式，可以通过 AppRoute 渲染一个 iframe 或者任意的 React 组件。

## 微应用注册通过数据驱动

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

如上示例，通过 `onRouteChange` 可以捕获到所有的路由变化，此时可以根据不同路由对 Layout 做一些状态的变化，实现不同页面不同布局的能力。
