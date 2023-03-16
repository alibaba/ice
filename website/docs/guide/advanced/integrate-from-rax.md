---
title: 从 Rax 迁移
---

本文档面向的是使用 Rax App 的开发者，提供迁移到 ice.js 的方式。React 的社区生态显著优于 Rax，切换到 React 之后可以享受到更多的 React 生态，复用复杂场景（富文本、脑图等）社区生态可以大幅度降低成本。

:::caution
对于 Rax 小程序的用户，如果你没有使用到以下与原生小程序结合较为紧密的能力，则可以正常参考本文档进行迁移。

- 引入原生 app.js、原生页面、原生自定义组件、小程序插件
- 引入 Rax 编译时组件
- 注册页面生命周期及事件
- 分包加载

如果使用到以上能力，则需要参考 ice.js 文档进行相应能力的迁移。

:::

## 如何迁移

ice.js 提供了 [rax-compat](https://github.com/alibaba/ice/tree/master/packages/rax-compat) 以支持 [Rax](https://github.com/alibaba/rax) 到 React 运行时的切换。

`rax-compat` 通过对 React 的能力的封装，在内部抹平了 Rax 与 React 使用上的一些差异，同时导出了与 Rax 一致的 API 等能力，通过 alias 来将源码中的 rax 用 rax-compat 来替换，即可桥接上 React 的运行时能力。

## 安装与使用

用户可以直接通过引入插件 [@ice/plugin-rax-compat](https://www.npmjs.com/package/@ice/plugin-rax-compat) 来完成在 ice.js 中运行 Rax 应用。

```bash
$ npm i @ice/plugin-rax-compat --save-dev
```

```js
import compatRax from '@ice/plugin-rax-compat';

export default defineConfig(() => ({
  // ...
  plugins: [
    // ...
    compatRax({ inlineStyle: true }),
  ],
}));
```

## `rax-compat` 兼容性

### Rax 核心 API

`rax-compat` 会抹平 Rax 核心 API 与 React API 的差异，用户使用 Rax DSL 可以无缝衔接到 React Runtime 上，具体的 Rax 核心 API，可以参考[Rax 官网](https://rax.js.org/docs/api/DOM)。

### Appear & Disappear

Rax DSL 迁移用户依旧可以像之前一样使用 onAppear 以及 onDisapper 事件，如

```jsx
import { createElement } from 'rax';

function App {
  return (<div
    onAppear={() => {
      alert('appear')
    }}
    onDisappear={() => {
      alert('disappear')
    }}
  >
    APP
  </div>)
}
```

原 Rax DSL 迁移过来并使用兼容模式无需做任何改造，[appear-polyfill](https://www.npmjs.com/package/appear-polyfill) 会嵌入在 `rax-compat` 中自动做这部分处理，用户无需特殊处理以及引入。

对于 React 用户，推荐使用 `<VisibilityChange />` 组件，详见[元素可见](../basic/appear.md)。

### 样式的处理

当打开 `@ice/plugin-rax-compat` 插件的 `inlineStyle` 参数时，以 `.module.css` 结尾的文件会默认走 CSS Module 的模式。此外，当 `width` 等属性没有单位如 `width: 300`，该模式下会自动补齐 `rpx` 单位并最终转化成 `vw`，同理，写了 `rpx` 单位的值也一样会被转化成 `vw`。这块逻辑与之前 Rax Driver 中处理的逻辑是一致的，Rax DSL 用户无需做任何修改。

### 其他差异

- Attributes：
  在 React 中，原生标签的 props 是存在白名单的，而 Rax 中没有该判断。这差异导致使用非 `data-*` 的自定义属性在 React Runtime 中会被忽略（会有 warning），如果用户通过非标的自定义属性存储在 attributes 中，在 React Runtime 中会无法从真实节点的 ref 中通过 `getAttribute` 获取。如果用了这些非标自定义属性，推荐使用 `data-*` 来标识自定义属性。
- 事件：
  React 通过[合成事件](https://zh-hans.reactjs.org/docs/events.html)机制对浏览器环境中的事件进行代理，而 Rax 则是通过节点原生的 addEventListener 方法将事件与处理函数绑定在一起。在你清楚地了解 Rax 与 React 的事件实现差异之前，尽量不要使用 ref 访问真实 DOM 节点来处理原生事件，否则可能会出现未预料的行为。

## rax-app 工程迁移

对于之前使用 rax-app 的用户，ice.js 提供了一款工程自动化迁移工具—— [rax-migrate](https://www.npmjs.com/package/rax-migrate)，它可以辅助平滑迁移大部分工程配置，一些无法自动迁移的功能需要用户手动确认。

### 安装

```bash
$ npm i rax-migrate -g
```

### 使用

命令行进入 rax-app 工程（如工程名为 rax-project）所在的目录，通过运行 `rax-migrate` 可生成对应配置的同目录下的 ice.js 工程。

```bash
rax-migrate transform ./rax-project 
```

### 注意

该工具不是全自动迁移工具，部分功能点无法自动迁移，需要用户手动确认以及迁移，包括但不限于：

* webpack 插件
* 无法完全匹配的工程配置
* rax-migrate 的 warning 以及 error 输出
* etc...
