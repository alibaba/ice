---
title: 核心概念
order: 1
---

icestark 根据 UI 结构进行了框架应用和子应用的拆分。

## 框架应用

框架应用作为统一入口，负责子应用注册，菜单、侧边栏等公共基础内容的实现，起到收口域名、统一管理页面公共内容的作用。简单的框架应用代码示例：

## 子应用

子应用是一个 react/vue/anguler 等流行框架搭建的前端应用（spa、mpa等），以 `AppRoute` 的方式在框架应用中注册，交由 icestark 管理。icestark 并不会主动介入子应用内部的路由逻辑，因此子应用整体的改造成本很低，甚至能做到 0 改动，简单的子应用的代码示例：

> 通过 `getMountNode` 获取 icestark 动态创建的渲染 DOM 节点；也可以通过给 `AppRoute` 配置 `rootId` 通知 icestark 动态创建对应的 DOM 节点，此时子应用内部不再需要配置`getMountNode`，**此时注意不要跟框架应用自己的 DOM 节点 id 重复**
> 通过 `registerAppLeave` 注册子应用卸载事件，保证 react 组件 unmount 生命周期会被触发