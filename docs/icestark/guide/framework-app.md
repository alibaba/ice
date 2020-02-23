---
title: 框架应用开发
order: 3
---

框架应用负责整个系统的 Layout 设计以及所有子应用的管理注册，icestark 约束了框架应用必须基于 React。

## 创建框架应用

```bash
$ npm init ice icestark-framework @icedesign/stark-layout-scaffold
$ cd icestark-framework
$ npm install
$ npm start
```

## 已有项目改造为框架应用

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

### 基准路由 path

类型为 `string|string[]`，大部分情况下都是 string，通过 path 约束每个子应用的路由定义，建立路由和子应用的映射关系。

### 子应用入口 entry/url/entryContent

icestark 通过子应用入口字段的配置进行应用的渲染，因此这个字段非常重要。针对不同的场景，icestark 也支持了多种入口配置形式：

#### url

最常见的形式，适用于子应用入口资源比较确定，同时除了 mountNode 不依赖其他 DOM 节点，此时将这些资源地址按顺序拼成数组传给 icestark 即可。

#### entry

使用场景：

- 应用依赖的入口资源不确定：比如需要引入 vendor、或者不确定的 externals 资源、hash 等场景
- 应用默认需要依赖很多 DOM 节点：比如 `jQuery`/`Kissy`/`angular` 等方案

entry 对应 html url, icestark 对 `entry` 的处理包含以下步骤：

- 通过 `window.fetch` 获取 entry 属性对应的 html 地址
- 解析 html ，解析出所有 js 资源包括 `inline` 和 `external` 两种类型，如果 `external` 类型是相对路径，根据 `entry` 地址进行补齐
- 将处理后的 html 内容插入 icestark 动态创建的节点
- 依次通过创建 `script` 标签按顺序引入 js 资源

#### entryContent

当需要使用 entry 能力但是 html url 不支持前端跨域访问的情况，可以自行将 html 内容拿到，然后通过 entryContent 属性传递给 icestark。

#### component/render

同时我们也提供通过 React 组件的方式渲染子应用，常用于子应用通过 iframe 方式的场景：

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

## 子应用注册通过数据驱动

在很多场景下，我们的子应用可能通过一些配置平台注册，这时候可以将所有子应用的信息通过全局变量输出到 html 中，然后前端通过该数据注册子应用：

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