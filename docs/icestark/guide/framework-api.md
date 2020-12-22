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

### name

`name` 字段作为微应用唯一标识，不可重复注册。注册后的微应用均通过 `name` 标识对微应用进行加载或者卸载。

### activePath

微应用激活的路由规则，可以有四种方式配置：
- `string`：配置为字符串类型时，将自动根据设置的路径进行匹配，如设置为 `/seller` 的情况下，路由只要匹配到 /seller 均会加载改项配置的微应用
- `string[]`：数组形式在上述字符串形式的基础上增加了多个路由匹配配置，只要路由匹配到数组中的任意一项均会加载微应用
- `PathData[]`：默认情况下设置的路由规则均为通配规则，如果想对路由进行精准匹配或者区分大小写，可以以对象方式配置每一项路由规则，其中可选配置项包括：`exact`、`strict`、`sensitive`
- `Function`：通过函数方式执行的形式将根据函数执行结果决定微应用是否加载，函数接受参数为当前 url 地址

### container

微应用挂载的 DOM 节点。

### 微应用入口

微应用的入口可以配置为三种形式：
- `entry`：微应用对应的 html 入口，框架将自动解析 html 中对应的 js / css 资源进行加载，并将相应的 html 结构插入到需要挂载的 DOM 节点中。一般适用于逻辑执行强依赖 html 入口内容的应用
- `entryContent`：直接配置微应用 html 内容，省去配置 entry 入口时前置获取 html 内容的步骤
- `url`：微应用对应的静态资源，当渲染微应用时，url 配置中的 js 和 css 资源将被加载并执行