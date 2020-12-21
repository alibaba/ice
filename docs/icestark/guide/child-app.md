---
title: 微应用开发或迁移
order: 5
---

本文介绍如何从零开发一个微应用，同时已有应用迁移也可以参考本文档。

## 创建微应用

React 项目（基于 icejs）：

```bash
$ npm init ice icestark-child @icedesign/stark-child-scaffold
```

Vue 项目：

```bash
$ npm init ice icestark-child @vue-materials/icestark-child-app
```

## React 项目改造为微应用

> TODO：采用 UMD 格式

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

### 2. 定义基准路由

正常情况下，注册微应用时会为每个微应用分配一个基准路由比如 `/seller`，当前微应用的所有路由需要定义在基准路由之下，社区常见的路由库都可以通过参数非常简单的实现该功能。微应用可以通过 `getBasename()` API 获取自身的基准路由。

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

## Vue 项目改造为微应用

### 应用入口适配

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

### 定义基准路由

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
