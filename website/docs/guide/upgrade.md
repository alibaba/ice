---
title: 从 Rax 迁移
order: 20
---

本文档面向的是使用 Rax App 的开发者，提供迁移到 ICE 的方式。React 的社区生态显著优于 Rax，切换到 React 之后可以享受到更多的 React 生态，部分复杂场景（富文本、脑图等）可以大幅度降低成本。

## 如何升级

ICE 提供了 [rax-compat](https://github.com/ice-lab/ice-next/tree/master/packages/rax-compat) 以支持 [Rax](https://github.com/alibaba/rax) 到 React 运行时的切换。

`rax-compat` 通过对 React 的能力的封装，在内部抹平了 Rax 与 React 使用上的一些差异，同时导出了与 Rax 一致的 API 等能力，通过 alias 来将源码中的 rax 用 rax-compat 来替换，即可桥接上 React 的运行时能力。

## 安装与使用

用户可以直接通过引入插件 [@ice/plugin-rax-compat](https://www.npmjs.com/package/@ice/plugin-rax-compat) 来完成在 ICE 中运行 Rax 应用。

```bash
$ npm i @ice/plugin-rax-compat --save-dev
```

```js
import compatRax from '@ice/plugin-rax-compat';

export default defineConfig({
  // ...
  plugins: [
    // ...
    compatRax({
      inlineStyle: true,
    }),
  ],
});
```

## `rax-compat` 兼容性

### Rax 核心 API

`rax-compat` 会抹平 Rax 核心 API 与 React API 的诧异，用户使用 rax DSL 可以无缝衔接到 React Runtime 上，具体的 Rax 核心 API，可以参考[Rax 官网](https://rax.js.org/docs/api/DOM)。

### Appear & Disappear

rax DSL 迁移用户依旧可以像之前一样使用 onAppear 以及 onDisapper 事件，如

```jsx
import { createElement } from "rax";

function APP {
  return <div
    onAppear={() => {
      alert('appear')
    }}
    onDisappear={() => {
      alert('disappear')
    }}
  >
    APP
  </div>
}
```

原 Rax DSL 迁移过来并使用兼容模式无需做任何改造，[appear-polyfill](https://www.npmjs.com/package/appear-polyfill) 会嵌入在 `rax-compat` 中自动做这部分处理。

@ Rax 这边是直接支持了这个事件。
@ 另外需要一篇文档来提供 ICE Appear 事件支持 (用组件支持).

### 样式的处理

@ inlineStyle 和 CSS Modules 特殊逻辑的解释。rpx 单位的解释。

### 差异补充

@比如 DOM attributes 的处理。

rax-picture + rax-compat

@ice/picture + `<Appear />`
