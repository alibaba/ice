---
title: 隔离
order: 10
---

当应用拆分后，我们一方面希望能有一定的通信机制，同时希望应用之间能保持相当程度的隔离。icestark 针对隔离有很多的建议和尝试。

## CSS 隔离

样式隔离是应用数量不断增加时，必须考虑的问题。

我们建议在框架应用（Layout 层）：

- 尽量少使用基础组件（防止子应用有不同版本造成冲突）
- 尽量使用独有的 class，可以添加统一的前缀或者开启 CSS Module（防止与子应用混合）

### 动态加载

icestark 只会在子应用需要渲染前加载样式资源，同时在子应用之间切换（比如从 A -> B 时），会自动删除 A 应用的样式资源，再进行 B 应用样式资源的加载。因此能对子应用之间的样式进行有效隔离。

### shadowRoot

shadowRoot 是彻底隔离 css 的一个思路。icestark 支持将子应用包裹在 Shadow DOM 节点中，只需要将 shadowRoot 的 API 设置为 true。然而在实际使用 @alifd/next、antd 等基础组件时，Shadow DOM 的 css 隔离、dom 事件冒泡终止在 Shadow DOM 父节点的问题，会带来各种使用异常，特别是 Message、Dialog 等默认添加 DOM 元素至 document 时，css 隔离会造成显示异常，这类问题解决可以通过将组件样式注入到框架应用（Layout）层解决，但此时样式就混乱了；另一种解决方案，是将 Container 设置为 Shadow DOM 节点，这样对代码有更多侵入性。另外，针对 Select 等组件，源码实现上可能会有 DOM 事件、DOM 尺寸处理等 hack 处理，此时 dom 事件冒泡的差异也会导致组件使用异常，这类问题处理更为棘手一些。icestark 还在针对这些异常处理进行更多的尝试阶段，如有相关建议，欢迎在 [github](https://github.com/ice-lab/icestark) 中一起探讨。

### CSS Module

CSS Module 可以设置默认的前缀到不同的子应用中，是实际使用中非常广泛的处理 CSS 隔离的方法。我们建议在新项目中使用 CSS Module，此时的隔离不单单作用于应用之间，在应用内部各个页面、子模块之间也起到了非常好的隔离效果。然而，如果旧应用中没有采用 CSS Module，后期改造成本较大，同时 CSS Module 的使用也不能避免不同版本的 @alifd/next、antd 基础组件混用时的问题，比如框架应用使用 1._ 版本，而子应用使用 0._ 的版本，此时极易引发样式冲突。

## JS 隔离

随着业务不断迭代发展，应用数量不断增加，开发人员素质不一致等情况下，JS 隔离也是一个需要考虑的问题。

我们建议在框架应用（Layout 层）：

- 全局性的变量、函数需要添加统一前缀，避免重复
- 各个应用的开发团队之间，确定一些开发公约

### 动态加载

类似 CSS 的处理，icestark 只会在子应用需要渲染前加载 JS 资源，在子应用之间切换（比如从 A -> B 时），会自动删除 A 应用的 JS 资源，再进行 B 应用的 JS 资源加载。因此能有效对子应用之间的 JS 进行隔离。

### react 版本问题

icestark 并没有对应用之间的 react 版本有强制性要求，目前建议是在 15+ 的版本。同时 icestark 内部没有对子应用的 react、react-dom 版本有强依赖，因此 icestark 支持不用应用之间使用不同的 react 版本，彼此之间相互独立，因此也不能透传 context、props 等属性。

### todo

未来，icestark 会尝试使用 worker 等新方式实现更加彻底的 JS 隔离。关于 JS 隔离，如有相关建议，欢迎在 [github](https://github.com/ice-lab/icestark) 中一起探讨。
