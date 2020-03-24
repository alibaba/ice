---
title: 关于飞冰
order: 1
cover: https://gw.alicdn.com/tfs/TB1vBRYaVOWBuNjy0FiXXXFxVXa-2558-1306.jpg
---

> 简单而友好的前端研发体系

## 特性

- **可视化开发**：通过 IDE 简化前端工程复杂度，同时通过适配器可接入不同的项目工程进行可视化管理，定制专属的前端工作台
- **丰富的物料**：基于物料拼装提高项目开发效率，同时提供丰富的 React/Vue 物料
- **最佳实践**：结合丰富的经验沉淀出的项目开发最佳实践，包括目录结构、开发调试、路由配置、状态管理等
- **自定义物料**：通过物料开发者工具快速开发构建私有物料体系

## 生态

|    GitHub         |    npm                                 |     文档    |   描述       |
|----------------|-----------------------------------------|--------------|-----------|
| [iceworks](https://github.com/alibaba/ice) | ![](https://img.shields.io/npm/v/iceworks.svg) | [docs](https://ice.work/docs/iceworks/about) |面向企业级中后台领域的 IDE|
| [icejs](https://github.com/ice-lab/icejs) | ![](https://img.shields.io/npm/v/ice.js.svg) | [docs](https://ice.work/docs/guide/intro) |基于 React.js 的通用框架|
| [icestore](https://github.com/ice-lab/icestore) | ![](https://img.shields.io/npm/v/@ice/store.svg) | [docs](https://github.com/ice-lab/icestore#icestore) |基于 React Hooks 的轻量级状态管理方案|
| [icestark](https://github.com/ice-lab/icestark) | ![](https://img.shields.io/npm/v/@ice/stark.svg) | [docs](https://ice.work/docs/icestark/guide/about) |面向大型应用的微前端解决方案|

## 常见问题

#### 使用飞冰是否需要具备一定的前端基础？

毫无疑问是需要的，我们在努力降低前端开发的门槛，但一些基础的前端知识还是需要具备的，比如 JavaScript 的基础语法、前后端如何通信等。为了便于快速入门前端知识，我们整理了一份 [前端基础知识](/docs/guide-0.x/resource/front-basic)，希望能帮助到开发者。

#### 资深前端同学是否适合使用飞冰？

在 IDE 基础上，飞冰还提供了 [CLI 版本](/docs/guide/start#使用%20CLI%20方式创建项目)，因此如果你不需要 IDE 的能力，依然可以完全使用 CLI 的链路开发项目，同时使用到飞冰的项目最佳实践、工程工具以及状态管理方案。

#### 飞冰（ICE）的浏览器兼容策略是怎样的？

飞冰官方 React 物料默认使用 React 16+，其需要的最低 IE 版本为 11，如果您需要在以下的版本使用，您可能需要引入一些 polyfill 来支持 `Map`, `Set` 等特性。参考[React 官网说明](https://reactjs.org/blog/2017/09/26/react-v16.0.html#javascript-environment-requirements)。

#### 飞冰官方的 React 组件为什么使用 Fusion，而不是 antd？

Fusion 组件和 antd 组件本身是解决类似问题的，飞冰始于淘宝内部的业务场景，在最开始的阶段 Fusion 对这些业务做了非常多的支持，因此飞冰默认使用的是 Fusion 组件，在此基础上，Fusion 组件的可定制性（主题配置）高于 antd，这在面向多样性的业务场景时显得非常重要。

当然在飞冰的体系里你依然可以选择使用 antd 的组件，甚至你可以发起建设基于 antd 的物料。

## 谁在使用

- 淘宝中后台业务
- 飞猪中后台业务
- 阿里健康
- 村淘
- 优酷
- 阿里云
- ……

## 联系我们

* 邮件：<mailto:ice-admin@alibaba-inc.com>
* 反馈/建议：<https://github.com/alibaba/ice/issues/new>
* 答疑钉钉群，**内部同学请搜索「飞冰（ICE）万能群」**：

  <img src="http://ice.alicdn.com/assets/images/qrcode.png" width="300" />
