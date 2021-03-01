---
title: 微应用开发与接入
order: 5
---

本文介绍如何从零开发一个微应用，同时已有应用迁移也可以参考本文档。

## 通过脚手架创建

React 项目（基于 icejs）：

```bash
$ npm init ice icestark-child @icedesign/stark-child-scaffold
```

Vue 项目：

```bash
$ npm init ice icestark-child @vue-materials/icestark-child-app
```

## React 项目改造为微应用

如果你的项目基于 icejs，请参考文档 [icejs 接入微前端](/docs/guide/advance/icestark.md)，接入步骤非常简单。如果不是 icejs 的项目那么请参考下面的流程。

### 1. 应用入口适配

将 React 应用改造为微应用，仅仅只需要导出对应的生命周期即可：

```jsx
import ReactDOM from 'react-dom';
import { isInIcestark } from '@ice/stark-app';
import App from './App';

export function mount(props) {
  const { container, customProps } = props;
  ReactDOM.render(<App {...customProps} />, container);
}

export function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container);
}

if (isInIcestark()) {
  console.log('app is running in framework app');
} else {
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
    // 可选，设置模块在 window 上暴露的名称；icestark 框架不关心具体配置名称
    library: 'microApp',
  }
}
```

## Vue 项目改造为微应用

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
  // 初始化 vue 项目
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

## 微应用构建产物格式

icestark 1.6.0/2.0.0 之后支持渲染两种格式的微应用：

1. [原有] 通过 `registerAppEnter/registerAppLeave` 注册生命周期
2. [新增] UMD 格式，通过 `mount/unmount` 注册生命周期

对于增量的微应用我们推荐使用 UMD 格式的构建产物，以下是两种格式的优缺点对比：

|   纬度\格式  |    UMD(mount/unmount)  | registerAppEnter/registerAppLeave |
|-------------|------------------------|-----------------------------------|
|与 single-spa 兼容|  兼容               |             不兼容                 | 
|与 icestark 耦合度|   低                |               高                  |
|js/css 资源受跨域访问限制|   限制          |             不限制                 |
