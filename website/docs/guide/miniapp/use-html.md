---
title: 使用 HTML 标签
order: 5
---

ice.js 支持在开发小程序时直接使用 HTML 标签：

```js
export default function Home() {
  return (
    <div> Hello World!</div>
  )
}
```

## 样式相关问题

### 浏览器默认样式

ice.js 提供了两种内置的浏览器默认样式，可以根据项目需要进行引入。

根据经验，在 Web 端的项目中常常会写一些样式去重置部分浏览器的默认样式，因此一般情况下开发者并不需要所有的这些默认样式。我们建议手动挑选项目需要的默认样式添加到全局样式中。

首先需要安装 `@ice/miniapp-html-styles` 包：

```shell
$ npm install @ice/miniapp-html-styles --save
```

1. HTML4
W3C HTML4 的内置样式。只有 HTML4 标签样式，体积较小，兼容性强，能适应大多数情况。

用法：

```css title=src/global.css
@import '@ice/miniapp-html-styles/html';
```

2. HTML5
Chrome(Blink) HTML5 的内置样式。内置样式丰富，包括了大多数 HTML5 标签，体积较大，不一定支持所有小程序容器。

用法：

```css title=src/global.css
@import '@ice/miniapp-html-styles/html5';
```

### `<span>` 默认表现为块级样式

`<span>` 是行内元素，本来需要映射为同样是行内元素的 `<Text>` 组件。

但小程序的 `<Text>` 组件有一个限制，它只能嵌套 `<Text>` 自身，嵌套 `<View>`、`<Image>` 等组件都会不显示。也就是说，如果 `<span>` 映射为 `<Text>`，`<span>` 只能嵌套同样映射为 `<Text>` 的 `<i>`、`<b>` 等行内元素。

但是我们发现 `<span>` 里很可能会嵌套 `<div>`、`<img>` 等标签，用法十分多样。因此我们决定把 `<span>` 映射为 `<View>`，以兼容 H5 标签写法的多样性。

这样做的缺点是，开发者需要自行使用样式令 `<span>` 默认表现为行内样式：

```css title=src/global.css
/* 方法一：只使用部分需要的浏览器默认样式 */
.h5-span {
  display: inline;
}

/* 方法二：直接引入全套浏览器默认样式 */
@import '@ice/miniapp-html-styles/html';
```

至于 `<i>` 等行内标签还是默认映射为 `<Text>`。

### 不支持部分 CSS 选择器

在小程序中部分 CSS 选择器不会生效，如：

- 通配符 *
- 媒体查询
- 属性选择器，当属性不是对应小程序组件的内置属性时

### 不支持使用 rem

暂不支持 rem。

## 其他限制

HTML 标准和小程序标准存在着很大的差异，有一些能够抹平，但仍有部分差异无法处理。

### 表单组件

HTML 标签和小程序组件两种规范之间，存在较大差异的部分主要是表单组件。

1. 在使用 `<input type='checkbox'>` 或 `<input type='radio'>` 时，需要手动补充 `<checkbox-group>`、`<radio-group>` 组件。
HTML 使用 `<select>` + `<option>` 实现选择器，而小程序使用 `<Picker>`。两者差异巨大，因此不作映射。当用户使用了 `<select>` 时，会提示用户直接使用 `<Picker>` 组件。

### 不能同步获取元素尺寸

在 H5 中我们可以调用 DOM API 同步获取元素的尺寸：

```js title=h5
const el = document.getElementById('#inner');
const res = el.getBoundingClientRect();
console.log(res);
```

但是在小程序中，获取元素尺寸的 API 是异步的：

```js title=小程序
const query = Taro.createSelectorQuery();
query.select('#inner')
  .boundingClientRect()
  .exec(res => {
    console.log(res)
  });
```

因此 ice.js 提供了这些 API 的异步版本，如 getBoundingClientRect。

```js title=ice.js
const el = document.getElementById('#inner');
const res = await el.getBoundingClientRect();
console.log(res);
```

### DOM API 差异

`canvas`、`video`、`audio` 等元素在 H5 端可以直接调用 `HTMLElement` 上的方法。

```js title=h5
const el = document.getElementById('myVideo');
el.play();
```

但是在 ice.js 小程序中，要调用组件上的原生方法，必须先创建对应的 Context：

```js title=小程序
// 配合 Uni API 提供的能力
import { createVideoContext } from '@uni/video';

const videoContext = createVideoContext('myVideo');
videoContext.play();
```

### `<img>` 图片尺寸问题

在 H5 中，不设置 `<img>` 的宽高时，浏览器会使用原图的宽高作为标签的宽高。

而在小程序中，不设置 `<Image>` 的宽高时，会使用默认样式中规定的宽高。

解决办法：用户在使用 `<img>` 时必须显式设置它的宽高。

### 不支持 ReactDOM 部分 API

ice.js 使用 React Reconciler 实现了自定义的渲染器，相对于 ReactDOM 来说功能十分精简。

因此部分基于 ReactDOM 实现的 H5 组件会无法使用，如：`unstable_renderSubtreeIntoContainer`。

### 不支持 React Portal

### 不支持使用 SVG

暂不支持使用 SVG。
