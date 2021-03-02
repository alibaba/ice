---
title: 微应用开发与接入
order: 5
---

本文介绍如何从零开发一个微应用，同时已有应用迁移也可以参考本文档。

## 微应用格式

icestark 支持渲染两种格式的微应用，通过 registerAppEnter 注册或者 UMD 格式导出 mount 方法，UMD 格式跟社区的 single-spa 更好兼容，因此增量的微应用我们推荐使用 UMD 格式。

### 1. registerAppEnter/registerAppLeave

```jsx
import ReactDOM from 'react-dom';
import { getMountNode, registerAppEnter, registerAppLeave } from '@ice/stark-app';
import App from './App';

registerAppEnter(() => {
  ReactDOM.render(<App />, getMountNode());
});
registerAppLeave(() => {
  ReactDOM.unmountComponentAtNode(getMountNode());
});
```

### 2. UMD(mount/unmount)

> @ice/stark 版本大于 1.6.0

```jsx
import ReactDOM from 'react-dom';
import App from './App';

export function mount(props) {
  ReactDOM.render(<App />, props.container);
}

export function unmount(props) {
  ReactDOM.unmountComponentAtNode(props.container);
}
```

## 通过脚手架创建

React 项目（基于 icejs）：

```bash
$ npm init ice icestark-child @icedesign/stark-child-scaffold
```

Vue 项目（基于 Vue CLI）：

```bash
$ npm init ice icestark-child @vue-materials/icestark-child-app
```

> 如想使用其他框架/工程可参考下方的「已有项目改造为微应用」

## 已有 React 项目改造为微应用

如果你的项目基于 icejs，请参考文档 [icejs 接入微前端](/docs/guide/advance/icestark.md)，接入步骤非常简单。如果不是 icejs 的项目那么请参考下面的流程。

### 1. 应用入口适配

将 React 应用改造为微应用，只需要导出对应的生命周期即可：

```jsx
import ReactDOM from 'react-dom';
import { isInIcestark, setLibraryName } from '@ice/stark-app';
import App from './App';

export function mount(props) {
  ReactDOM.render(<App {...customProps} />, props.container);
}

export function unmount(props) {
  ReactDOM.unmountComponentAtNode(props.container);
}

// 注意：`setLibraryName` 的入参需要与 webpack 工程配置的 output.library 保持一致
setLibraryName('microApp');

if (!isInIcestark()) {
  ReactDOM.render(<App />, document.getElementById('ice-container'));
}
```

### 2. 定义基准路由

正常情况下，注册微应用时会为每个微应用分配一个基准路由比如 `/seller`，当前微应用的所有路由需要定义在基准路由之下，社区常见的路由库都可以通过参数非常简单的实现该功能。微应用可以通过 `getBasename()` API 获取自身的基准路由。

React 项目中使用 react-router：

```diff
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
+import { getBasename } from '@ice/stark-app';

export default () => {
  return (
+   <Router basename={getBasename()}>
      <Switch>
        // ...
      </Switch>
    </Router>
  );
};
```

### 3. 构建为 UMD 产物

入口文件通过导出 mount、unmount 等标准生命周期后，需要配置工程上的改造，才能最终导出 UMD 标准的微应用。

以 webpack 工程为例：

```js
module.exports = {
  output: {
    // 设置模块导出规范为 umd
    libraryTarget: 'umd',
    // 可选，设置模块在 window 上暴露的名称
    library: 'microApp',
  }
}
```

## 已有 Vue 项目改造为微应用

### 1. 应用入口适配

vue 应用改造同样在入口文件中导出微应用相关生命周期即可：

```js
// 应用入口文件 src/main.js
import Vue from 'vue';
import { isInIcestark } from '@ice/stark-app';

let vue;

export function mount(props) {
  const { container } = props;
  vue = new Vue(...).$mount();
  // for vue don't replace mountNode
  container.innerHTML = '';
  container.appendChild(vue.$el);
}

export function unmount() {
  vue && vue.$destroy();
}

if (!isInIcestark()) {
  new Vue(...);  
}
```

### 2. 定义基准路由

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

### 3. 构建为 UMD 产物

同 React

## 微应用间跳转

在 A 微应用里需要跳转到 B 微应用时，如果使用 react-router/vue-router 提供的 Link 组件，一般会强行在 path 上追加 basename，因此推荐使用 appHistory/AppLink 来跳转：

注意：AppLink 仅支持在基于 React 的微应用中使用，appHistory 不限制微应用的框架类型

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
