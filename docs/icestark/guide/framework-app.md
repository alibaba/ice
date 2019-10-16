---
title: 框架应用开发
order: 3
---

框架应用负责整个系统的 Layout 设计以及所有子应用的管理注册，框架应用必须基于 React。

## 通过模板初始化

初始化一个 icestark 的框架应用：

```bash
$ mkdir icestark-framework-app
$ iceworks init @icedesign/stark-layout-scaffold
```

## 注册子应用信息

通过 `@ice/stark` 提供的 `AppRouter/AppRoute` 来管理注册子应用，这跟 react-router 的 API 设计非常相像。

```jsx
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
  handleAppLeave = (appConfig) => {
    console.log('handleAppLeavel', appConfig);
  }
  handleAppEnter = (appConfig) => {
    console.log('handleAppEnter', appConfig);
  }

  render() {
    const { pathname } = this.state;

    return (
      <BasicLayout pathname={pathname}>
        <AppRouter
          NotFoundComponent={NotFound}
          LoadingComponent={PageLoading}
          onRouteChange={this.handleRouteChange}
          onAppLeave={this.handleAppLeave}
          onAppEnter={this.handleAppEnter}
        >
          <AppRoute
            path={['/', '/message', '/about']}
            basename="/"
            exact
            title="通用页面"
            url={[
              '//unpkg.com/icestark-child-common/build/js/index.js',
              '//unpkg.com/icestark-child-common/build/css/index.css',
              // 'http://localhost:5555/js/index.js',
              // 'http://localhost:5555/css/index.css',
            ]}
          />
          <AppRoute
            path="/seller"
            basename="/seller"
            title="商家平台"
            url={[
              '//unpkg.com/icestark-child-seller/build/js/index.js',
              '//unpkg.com/icestark-child-seller/build/css/index.css',
            ]}
          />
        </AppRouter>
      </BasicLayout>
    );
  }
}
```

### 子应用注册通过数据驱动

在某些场景下，我们的子应用可能通过一些配置平台注册，这时候可以将所有子应用的信息通过全局变量存放在 html 中，然后前端通过该数据注册子应用：

```jsx
// src/App.jsx
import React from 'react';
import { AppRouter, AppRoute } from '@ice/stark';

export default class App extends React.Component {
  render() {
    const { pathname } = this.state;

    return (
      <div>
        <AppRouter
          NotFoundComponent={NotFound}
          LoadingComponent={PageLoading}
          onRouteChange={this.handleRouteChange}
          onAppLeave={this.handleAppLeave}
          onAppEnter={this.handleAppEnter}
        >
          {
            (window.appConfig || []).map((item) => {
              return (
                <AppRoute
                  key={idx}
                  path={item.path}
                  basename={item.basename}
                  title={item.title}
                  url={item.url}
                />
              );
            })
          }
        </AppRouter>
      </div>
    );
  }
}
```

## 开发整体 Layout

框架应用的 Layout 即整个系统的 Layout，这个 Layout 除了静态展示外，也可以通过 `onRouteChange()` 响应到路由变化，然后根据路由变化展示不同的形态，具体参考 `src/App.jsx` 即可。