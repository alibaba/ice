---
title: 主应用开发与接入（非 React）
order: 3
---

使用 API `registerMicroApps` 的方式注册子应用，该方式不再限制主应用所使用的框架，因此主应用可以使用 Vue/Angular... 等不同框架编写。

## 管理与注册子应用

安装依赖：

```bash
$ npm i --save @ice/stark
```

通过 `registerMicroApps` 来注册微应用：

```js
import { registerMicroApps, start } from '@ice/stark';

const appContainer = document.getElementById('icestarkNode');

registerMicroApps([
  {
    name: 'app1',
    activePath: ['/', '/message', '/about'],
    exact: true,
    title: '通用页面',
    container: appContainer,
    url: ['//unpkg.com/icestark-child-common/build/js/index.js'],
  },
  {
    name: 'app2',
    activePath: '/seller',
    title: '商家平台',
    container: appContainer,
    url: [
      '//unpkg.com/icestark-child-seller/build/js/index.js',
      '//unpkg.com/icestark-child-seller/build/css/index.css',
    ],
  },
]);

start();
```

## 微应用配置

TODO：补充

### name

### activePath

### container

### 微应用入口：url/entry/entryContent

## 示例：Vue 场景

TODO
