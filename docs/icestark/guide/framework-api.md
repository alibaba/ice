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

微应用挂载的 DOM 节点，通常情况下所有微应用的 container 都是同一个。

### 微应用入口 url/entry/entryContent

icestark 通过微应用入口字段的配置进行应用的渲染，因此这个字段非常重要。针对不同的场景，icestark 也支持了多种入口配置形式。

#### 1. url

适用于微应用入口资源比较确定，此时将这些资源地址按顺序拼成数组传给 icestark 即可。

```js
const apps = [{
  url: ['https://example.com/a.js', 'https://example.com/a.css'],
  path: '/foo'
  // ...
}]
```

#### 2. entry

使用场景：

- 应用依赖的入口资源不确定：比如需要引入 vendor、或者不确定的 externals 资源、资源地址带 hash 等场景
- 应用默认需要依赖很多 DOM 节点：比如 `jQuery`/`Kissy`/`Angular` 等框架

```js
const apps = [{
  entry: 'https://example.com/a.html',
  path: '/foo'
  // ...
}]
```

entry 对应 html url, icestark 对 `entry` 的处理包含以下步骤：

- 通过 `window.fetch` 获取 entry 属性对应的 html 地址
- 解析 html ，拿到所有 js 资源包括 `inline` 和 `external` 两种类型，如果 `external` 类型是相对路径，根据 `entry` 地址进行补齐
- 将处理后的 html 内容插入 icestark 动态创建的节点
- 依次通过创建 `script` 标签按顺序引入 js 资源

#### 3. entryContent

当需要使用 entry 能力但是 html url 不支持前端跨域访问的情况，可以自行将 html 内容拿到，然后通过 entryContent 属性传递给 icestark。

```js
const apps = [{
  entryContent: '<!DOCTYPE html><html><body><script src=""></body></html>',
  path: '/foo'
  // ...
}]
```
