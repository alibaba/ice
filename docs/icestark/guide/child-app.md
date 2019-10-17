---
title: 子应用开发或迁移
order: 4
---

本文介绍如何从零开发一个子应用，同时已有应用迁移也可以参考本文档。

## 通过模板初始化

初始化一个 icestark 的 React 子应用：

```bash
$ mkdir icestark-child-app-test && cd icestark-child-app-test
$ iceworks init project @icedesign/stark-child-scaffold
```

初始化出来是一个标准的单页面应用，与传统项目结构基本一致，主要的差异点请参考下文。

> 子应用目前还没有 Vue 模板，可以通过命令 `iceworks init project @vue-materials/admin-lite` 初始化一个标准的 Vue 应用，然后按照下面的文档进行一些简单的改造。

## 渲染到指定节点

框架应用会为子应用自动分配一个 DOM 节点，因此子应用需要通过 `getMountNode()` API 获取到对应节点并渲染进去。

React 项目：

```jsx
// 项目入口文件 src/index.jsx
import ReactDOM from 'react-dom';
import { getMountNode } from '@ice/stark-app';

import router from './router';

// 子应用单独运行时渲染到 #app 节点下
const mountNode = getMountNode(document.getElementById('root'));
ReactDOM.render(router(), mountNode);
```

Vue 项目：

```js
// 项目入口文件 src/main.js
import Vue from 'vue';
import { getMountNode } from '@ice/stark-app';
import App from './App.vue';
import router from './router';

const mountNode = getMountNode(document.getElementById('app'));
// $mount 的第二个参数 true 需要指定
const vue = new Vue({
  router,
  render: h => h(App),
}).$mount(mountNode, true);
```

## 定义基准路由

正常情况下，注册子应用时会为每个子应用分配一个基准路由比如 `/seller`，当前子应用的所有路由需要定义在基准路由之下，社区常见的路由库都可以通过参数非常简单的实现该功能。子应用可以通过 `getBasename()` API 获取自身的基准路由。

React 项目中使用 react-router：

```js
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';
import { getBasename } from '@ice/stark-app';
import routes from '@/config/routes';

export default () => {
  return (
    <Router basename={getBasename()}>
      <Switch>
        {routes.map((route, id) => {
          // ...
        })}
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

## 子应用卸载

icestark 目前的架构设计下，切换子应用时无法触发子应用的卸载（unmount）事件，因此我们提供了 `registerAppLeave(fn)` API 帮助子应用在应用切换时主动触发自身的卸载事件。

React 项目：

```jsx
import ReactDOM from 'react-dom';
import { getMountNode, registerAppLeave } from '@ice/stark-app';
import router from './router';

registerAppLeave(() => {
  ReactDOM.unmountComponentAtNode(getMountNode());
});

ReactDOM.render(router(), getMountNode());
```

Vue 项目：

```js
// 应用入口文件 src/main.js
import Vue from 'vue';
import { registerAppLeave } from '@ice/stark-app';

const vue = new Vue(...);

// trigger unmount manually
registerAppLeave(() => {
  vue.$destroy();
});
```

## 其他问题

### 子应用之间如何跳转？

子应用内部跳转直接基于对应 router 提供的 link 组件即可，如果要跳转到其他子应用，则需要使用 `appHistory` API，这里以 React 应用为例：

```jsx
import { appHistory } from '@ice/stark-app';

<Button type="primary" onClick={() => {
  appHistory.push('/seller/settings');
}}>跳转到其他子应用</Button>
```

### 子应用 bundle 加载失败？

> 注意：这个问题跟 icestark 无关

前端应用如果做了按需加载，按需加载的 bundle 默认是根据当前域名拼接地址，如果前端资源部署在非当前域名（比如 CDN）下，则需要通过手动配置 publicPath 来实现，具体参考[文档](https://ice.alibaba-inc.com/docs/cli/config/config#publicPath)。阿里内部同学请参考[这篇文档](/docs/cli/feature/cloud-build)。

### 子应用开发时请求本地 Mock 接口？

通用情况下，代码中的接口请求地址都是写成类似 `/api/xxx` 的相对地址，请求时会根据当前域名进行拼接，如果想请求非当前域名的接口地址，可以通过 `axios.defaults.baseURL` 来实现：

```js
// src/utils/request.js
import axios from 'axios';

axios.defaults.baseURL = '//127.0.0.1:4444';
```

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