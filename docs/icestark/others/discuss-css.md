---
title: CSS 隔离
order: 4
---

样式隔离是应用数量不断增加时，必须考虑的问题。

我们建议在框架应用（Layout层）：

- 尽量少使用基础组件（防止子应用有不同版本造成冲突）
- 尽量使用独有的 class，可以添加统一的前缀或者开启 CSS Module（防止与子应用混合）

## 动态加载

icestark 只会在子应用需要渲染前加载样式资源，同时在子应用之间切换（比如从 A -> B 时），会自动删除 A 应用的样式资源，再进行 B 应用样式资源的加载。因此能对子应用之间的样式进行有效隔离。

## shadowRoot

shadowRoot 是彻底隔离 css 的一个思路。icestark 支持将子应用包裹在 Shadow DOM 节点中，只需要将 shadowRoot 的 API 设置为 true。然而在实际使用 @alifd/next、antd 等基础组件时，Shadow DOM 的 css 隔离、dom 事件冒泡终止在 Shadow DOM 父节点的问题，会带来各种使用异常，特别是 Message、Dialog 等默认添加 DOM 元素至 document 时，css 隔离会造成显示异常，这类问题解决可以通过将组件样式注入到框架应用（Layout）层解决，但此时样式就混乱了；另一种解决方案，是将 Container 设置为 Shadow DOM 节点，这样对代码有更多侵入性。另外，针对 Select 等组件，源码实现上可能会有 DOM 事件、DOM 尺寸处理等 hack 处理，此时 dom 事件冒泡的差异也会导致组件使用异常，这类问题处理更为棘手一些。icestark 还在针对这些异常处理进行更多的尝试阶段，如有相关建议，欢迎在 [github](https://github.com/ice-lab/icestark) 中一起探讨。

## CSS Module

CSS Module 可以设置默认的前缀到不同的子应用中，是实际使用中非常广泛的处理 CSS 隔离的方法。我们建议在新项目中使用 CSS Module，此时的隔离不单单作用于应用之间，在应用内部各个页面、子模块之间也起到了非常好的隔离效果。然而，如果旧应用中没有采用 CSS Module，后期改造成本较大，同时 CSS Module 的使用也不能避免不同版本的 @alifd/next、antd 基础组件混用时的问题，比如框架应用使用 1.* 版本，而子应用使用 0.* 的版本，此时极易引发样式冲突。
