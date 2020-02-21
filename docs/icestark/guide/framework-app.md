---
title: 框架应用开发
order: 3
---

框架应用负责整个系统的 Layout 设计以及所有子应用的管理注册，框架应用必须基于 React。

我们推荐直接基于模板创建框架应用：

```bash
$ npm init ice icestark-framework @icedesign/stark-layout-scaffold
```

此模板使用了 icejs，对 icestark 的接入做了大量优化，因此直接参考[icejs 接入微前端](/docs/guide/advance/icestark.md)文档即可。

## 改造已有 React 应用

安装依赖：

```bash
$ npm i --save @ice/stark
```

通过 `AppRouter/AppRoute` 来管理注册子应用：

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
            path="/seller"
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

## 子应用配置字段

#### entry

针对 html 包含页面信息/逻辑较重的场景，比如 `jQuery`/`Kissy`/`angular` 等框架，支持通过 `entry`/`entryContent` 注册子应用。

`entry` 对应 html url, icestark 对 `entry` 的处理包含以下步骤：
- 通过 `window.fetch` 获取
- 解析 html ，解析出所有 js 资源包括 `inline` 和 `external` 两种类型，如果 `external` 类型是相对路径，根据 `entry` 地址进行补齐，然后按顺序存储；遇到 `external` 的相对路径的 css 资源，同理按照 `entry` 进行补齐
- 将处理后的 html 内容塞入 icestark 动态创建的节点
- 依次通过创建 `script` 标签按顺序引入 js 资源

#### entryContent

当需要使用 entry 入口，同时 html url 不支持跨域访问的情况，建议通过封装的 `AppRoute` 组件，自定义请求获取 html 内容，配置 `entryContent`, 参考示例可见**子应用容器定制/应用级别权限校验**。

`entryContent` 对 html 解析同 `entry` 一致，仅去掉 `fetch` 过程。

## 子应用注册通过数据驱动

在很多场景下，我们的子应用可能通过一些配置平台注册，这时候可以将所有子应用的信息通过全局变量存放在 html 中，然后前端通过该数据注册子应用：

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

### 子应用容器定制/应用级别权限校验

我们支持对 `AppRoute` 再进行二次封装，统一处理容器定制/权限校验等场景

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

  // 注意要将 ...others 透传给 AppRoute
  const { className, style, ...others } = props;
  return (
    <div className={className} style={style}>
      <AppRoute {...others} />
    </div>
  );
}
```

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

## 开发整体 Layout

框架应用的 Layout 即整个系统的 Layout，这个 Layout 除了静态展示外，也可以通过 `onRouteChange()` 响应到路由变化，然后根据路由变化展示不同的形态，具体参考 `src/App.jsx` 即可。