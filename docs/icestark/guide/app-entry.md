---
title: 微应用入口
order: 6
---

icestark 通过微应用入口字段的配置进行应用的渲染，因此这个字段非常重要。针对不同的场景，icestark 也支持了多种入口配置形式。

## 1. url

适用于微应用入口资源比较确定，此时将这些资源地址按顺序拼成数组传给 icestark 即可。

```js
const apps = [{
  url: ['https://example.com/a.js', 'https://example.com/a.css'],
  path: '/foo'
  // ...
}]
```

## 2. entry

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

## 3. entryContent

当需要使用 entry 能力但是 html url 不支持前端跨域访问的情况，可以自行将 html 内容拿到，然后通过 entryContent 属性传递给 icestark。

```js
const apps = [{
  entryContent: '<!DOCTYPE html><html><body><script src=""></body></html>',
  path: '/foo'
  // ...
}]
```

## 4. render/component

仅使用 React 的主应用支持，具体请参考 [React 项目接入主应用](/docs/icestark/guide/framework-app)。
