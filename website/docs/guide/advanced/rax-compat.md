---
title: 兼容 Rax
order: 0201
---

框架提供了 [rax-compat](https://github.com/alibaba/ice/tree/master/packages/rax-compat) 以支持 [rax.js](https://github.com/alibaba/rax) 到 [react](https://github.com/facebook/react) 的兼容。

`rax-compat` 通过对 react API 的封装，在内部抹平了 rax.js 与 react 使用上的大部分差异，同时导出了与 rax.js 一致的 API 能力，通过将源码中的 `rax` 引入替换为 `rax-compat`，可以桥接上绝大部分 react 运行时能力。

## 插件安装与使用

用户可以直接通过引入插件 [@ice/plugin-rax-compat](https://www.npmjs.com/package/@ice/plugin-rax-compat) 来完成在 ice.js 中运行 Rax 组件。

```bash
$ npm i @ice/plugin-rax-compat --save-dev
```

```diff title="ice.config.mts"
+ import compatRax from '@ice/plugin-rax-compat';

export default defineConfig(() => ({
  plugins: [
+    compatRax({ inlineStyle: true }), // 是否开启内联样式，这里是开启
+    // 也可以使用函数形式，根据文件名来判断是否开启内联样式
+    compatRax({ inlineStyle: (id) => id.includes('some-module') }),
  ],
}));
```

## `rax-compat` 兼容性

### Rax 核心 API

`rax-compat` 实现了所有的 Rax 核心 API，具体列表可以参考[Rax 官网](https://rax.js.org/docs/api/DOM)。

### Appear 和 Disappear 事件的处理

通过 `onAppear` 以及 `onDisapper` 事件可以监听元素的可见性变化，Rax DSL 通过 `appear-polyfill` 来实现这部分能力，但是 React Runtime 并没有这部分能力，因此 `rax-compat` 会在 React Runtime 中做兼容处理。

你依旧可以像之前一样使用 `onAppear` 以及 `onDisapper` 回调，如：

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
    RaxApp
  </div>)
}
```

使用 Rax 兼容模式无需做任何改造，也无需手动引入 [appear-polyfill](https://www.npmjs.com/package/appear-polyfill)，`rax-compat` 已经帮你处理掉了。

对于纯 React 组件，推荐使用 `<VisibilityChange />`，详见[元素可见](../basic/appear.md)。

### 样式的处理

- `inlineStyle`：
当打开 `@ice/plugin-rax-compat` 插件的 `inlineStyle` 参数时，除了以 `.module.css` 结尾的文件会使用 CSS Modules 模式外，其它的 `.css` 文件都会被转换成 JavaScript 对象。

eg：
```css title="src/pages/home.css"
.foo {
  color: red;
}
```

```tsx title="src/pages/home.tsx"
import { createElement } from 'rax';
import styles from './home.css';

console.log(styles); // { foo: { color: 'red' } }
```

此外，当 `width` 等属性没有单位时，如 `width: 300`，在 `inlineStyle` 模式下会自动补齐 `rpx` 单位并最终转化成 `vw`，同理，写了 `rpx` 单位的值也一样会被转化成 `vw`。

### 兼容 rax-swiper

由于 [rax-swiper](https://rax.alibaba-inc.com/docs/components/swiper) 仅支持在非内联模式下使用，如果你启用了 `inlineStyle`，则需要在项目的全局 CSS 中新增对其样式的导入：

```diff title="global.css"
+ @import url('swiper/swiper-bundle.min.css');
```

或者你也可以使用函数形式的 lineStyle，将引用了 `rax-swiper` 的模块排除出内联样式的处理流程：

```diff title="ice.config.mts"
import compatRax from '@ice/plugin-rax-compat';

export default defineConfig(() => ({
  plugins: [
+    compatRax({ inlineStyle: (id) => !id.includes('feeds-module') }), 
  ],
}));
```

### 兼容使用内联样式构建的模块

Rax 的 inlineStyle 模式是具有传染性的，因此，如果你的项目中存在使用内联样式构建的模块，在 rax-compat 模式下需要确保这些模块也使用内联样式处理，否则会出现样式丢失的问题。此时你可以使用函数形式的 inlineStyle：

```diff title="ice.config.mts"
import compatRax from '@ice/plugin-rax-compat';

export default defineConfig(() => ({
  plugins: [
+    compatRax({ inlineStyle: (id) => id.includes('inline-style-module') }), 
  ],
}));
```

### DOM 属性差异

在 React 中，原生标签的 `props` 是存在白名单的，而 rax.js 中没有。这导致使用非 dataset 的自定义属性在 React 中会被忽略（Dev 阶段有警告），从而无法从真实节点的 DOM 对象中通过 `getAttribute()` 方法获取。如果用了这些非标自定义属性，推荐使用 dataset(`data-*`) 来标识自定义属性。

### 事件差异
React 通过[合成事件](https://zh-hans.reactjs.org/docs/events.html)机制对浏览器环境中的事件进行代理，而 rax.js 则是通过节点(EventTarget)原生的 `addEventListener()` 方法将事件与处理函数绑定在一起。在你清楚地了解 Rax 与 React 的事件实现差异之前，尽量不要使用 ref 访问真实 DOM 节点来处理原生事件，否则可能会出现未预料的行为。

### 数组样式支持
Rax 支持数组类型的 style 属性，而 React 不支持。rax-compat 会将数组样式扁平化合并成单个对象，并透传给 React 的 createElement 方法。

### Hooks 的定制化实现
rax-compat 对 useState 进行了额外定制化，以保证与 Rax 行为一致：
- 在调用 React state 变化之前，rax-compat 前置添加了浅比较逻辑，避免设置相同值时的重新渲染
- 返回三个值（而不是 React 的两个），第三个值是 eagerState，即为状态值的实时引用

> React 内部在触发状态变化时同样会进行浅比较，并对当前 Fiber 节点是否需要渲染进行标记，但这个标记并不一定会阻止渲染。其他 React API（如 useExternalStore）的调用也可能对 Fiber 节点进行标记，因此仍有可能导致重新渲染。
