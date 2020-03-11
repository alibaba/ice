---
title: 子应用开发或迁移
order: 4
---

本文介绍如何从零开发一个子应用，同时已有应用迁移也可以参考本文档。

## 创建子应用

React 项目（基于 icejs）：

```bash
$ npm init ice icestark-child @icedesign/stark-child-scaffold
```

Vue 项目：

```bash
$ npm init ice icestark-child @vue-materials/icestark-child-app
```

## 已有项目改造为子应用

如果你的项目基于 icejs，请参考文档 [icejs 接入微前端](/docs/guide/advance/icestark.md)，接入步骤非常简单。如果不是 icejs 的项目那么请参考下面的流程。

### 1. 应用入口适配

当应用在微前端环境里渲染时，需要关注两个点：

1. 通过 `getMountNode()` 动态获取渲染节点
2. 注册应用自身的声明周期

React 项目：

```jsx
import ReactDOM from 'react-dom';
import { isInIcestark, getMountNode, registerAppEnter, registerAppLeave } from '@ice/stark-app';
import App from './App';

if (isInIcestark()) {
  registerAppEnter(() => {
    ReactDOM.render(router(), getMountNode());
  });
  registerAppLeave(() => {
    ReactDOM.unmountComponentAtNode(getMountNode());
  });
} else {
  ReactDOM.render(<App />, document.getElementById('ice-container'));
}
```

Vue 项目：

```js
// 应用入口文件 src/main.js
import Vue from 'vue';
import { isInIcestark, getMountNode, registerAppEnter, registerAppLeave } from '@ice/stark-app';

if (isInIcestark()) {
  let vue;
  const mountNode = getMountNode();
  registerAppEnter(() => {
    vue = new Vue(...).$mount();
    // for vue don't replace mountNode
    mountNode.innerHTML = '';
    mountNode.appendChild(vue.$el);
  });

  // make sure the unmount event is triggered
  registerAppLeave(() => {
    vue && vue.$destroy();
  });
} else {
  const vue = new Vue(...);
}
```

### 2. 定义基准路由

正常情况下，注册子应用时会为每个子应用分配一个基准路由比如 `/seller`，当前子应用的所有路由需要定义在基准路由之下，社区常见的路由库都可以通过参数非常简单的实现该功能。子应用可以通过 `getBasename()` API 获取自身的基准路由。

React 项目中使用 react-router：

```js
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { getBasename } from '@ice/stark-app';

export default () => {
  return (
    <Router basename={getBasename()}>
      <Switch>
        // ...
      </Switch>
    </Router>
  );
};
```

Vue 项目中使用 vue-router：

```js
import Vue from 'vue';
import Router from 'vue-router';
import { getBasename } from '@ice/stark-app';
import routes from '@/config/routes';

Vue.use(Router);

export default new Router({
  routes,
  mode: 'history',
  base: getBasename(),
});
```

## 其他问题

### 子应用之间如何跳转？

子应用内部跳转直接基于对应 router 提供的 link 组件即可，如果要跳转到其他子应用，可以使用 `appHistory` API，这里以 React 应用为例：

```jsx
import { appHistory } from '@ice/stark-app';

<Button type="primary" onClick={() => {
  appHistory.push('/seller/settings');
}}>跳转到其他子应用</Button>
```

### 子应用 bundle 加载失败？

前端应用如果做了按需加载，按需加载的 bundle 默认是根据当前域名拼接地址，如果前端资源部署在非当前域名（比如 CDN）下，则需要通过手动配置 publicPath 来实现，具体参考[文档](/docs/guide/dev/build#publicPath)。

### 子应用开发时请求本地 Mock 接口？

通常情况下，代码中的接口请求地址都是写成类似 `/api/xxx` 的相对地址，请求时会根据当前域名进行拼接，如果子应用嵌入框架应用进行开发，在域名变化后依旧想使用子应用的 Mock 接口或者代理配置，可以设置 `baseURL` 来请求非当前域名的接口地址，比如 `axios` 可以通过 `axios.defaults.baseURL` 来实现：

```js
// src/utils/request.js
import axios from 'axios';

axios.defaults.baseURL = '//127.0.0.1:4444';
```

如果子应用使用 icejs 研发框架提供的数据请求方案，则只需通过配置 `appConfig`：

```js
import { createApp } from 'ice';

const appConfig = {
  ...
  request: {
    baseURL: '//127.0.0.1:4444',
  }
};

createApp(appConfig);
```

> 由于开发调试过程中框架应用和子应用的域名或者端口不一致，非 icejs 研发框架的工程可能会有跨域问题，工程修改可以参考[devServer 配置](https://github.com/ice-lab/icejs/blob/bf2b0a6d7834f0d3897f0216be8195fff9eadbed/packages/plugin-react-app/src/config/default.config.js#L21)

### 子应用本地开发如何调试？

单独子应用开发时只能看到自身的内容，无法关注到在框架应用下的表现，这时候本地如果需要再启动一个框架应用，开发起来就很繁琐。针对这种情况，我们推荐通过框架应用的日常/线上环境调试本地子应用。

在框架应用中注册子应用时，如果 url 里携带了类似 `?env=local` 的 query，则将子应用的 url 转换为对应的本地服务地址，这样就可以方便调试子应用了。大体代码如下（可根据具体需求调整）：

```jsx
// src/app.jsx
import React from 'react';
import { AppRouter, AppRoute } from '@ice/stark';
import urlParse from 'url-parse';
import BasicLayout from '@/layouts/BasicLayout';

const urlQuery = urlParse(location.href, true).query || {};

export default class App extends React.Component {
  getBundleUrl = (name, version) => {
    let jsUrl = `//g.alicdn.com/${name}/${version}/index.min.js`;
    let cssUrl = `//g.alicdn.com/${name}/${version}/index.min.css`;

    if (urlQuery.env === 'local') {
      jsUrl = `//127.0.0.1:${urlQuery.port}/build/js/index.js`;
      cssUrl = `//127.0.0.1:${urlQuery.port}/build/css/index.css`;
    }

    return [cssUrl, jsUrl];
  }

  render() {
    return (
      <BasicLayout>
        <AppRouter>
          <AppRoute
            path="/seller"
            basename="/seller"
            title="通用页面"
            url={getBundleUrl('seller', 0.1.0)}
          />
        </AppRouter>
      </BasicLayout>
    );
  }
}
```

> 如果子应用是开启按需加载，为了让子应用资源能够正确加载，需要在开启本地服务的时候设置 `publicPath`，如果子应用基于 icejs 进行开发，可以参考[配置](/docs/guide/basic/build#devPublicPath)。