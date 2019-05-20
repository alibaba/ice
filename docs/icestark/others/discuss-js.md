---
title: JS 隔离
order: 5
---

随着业务不断迭代发展，应用数量不断增加，开发人员素质不一致等情况下，JS 隔离也是一个需要考虑的问题。

我们建议在框架应用（Layout层）：

- 全局性的变量、函数需要添加统一前缀，避免重复
- 各个应用的开发团队之间，确定一些开发公约

## 动态加载

类似 CSS 的处理，icestark 只会在子应用需要渲染前加载 JS 资源，在子应用之间切换（比如从 A -> B 时），会自动删除 A 应用的 JS 资源，再进行 B 应用的 JS 资源加载。因此能有效对子应用之间的 JS 进行隔离。

## react 版本问题

icestark 并没有对应用之间的 react 版本有强制性要求，目前建议是在 15+ 的版本。同时 icestark 内部没有对子应用的 react、react-dom 进行干预 / hack 操作，因此 icestark 支持不用应用之间使用不同的 react 版本，彼此之间相互独立，因此也不能透传 context、props 等属性。

## todo

未来，icestark 会尝试使用 worker 等新方式实现更加彻底的 JS 隔离。关于 JS 隔离，如有相关建议，欢迎在 [github](https://github.com/ice-lab/icestark) 中一起探讨。
