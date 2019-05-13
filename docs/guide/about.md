---
title: 关于飞冰
order: 1
cover: https://gw.alicdn.com/tfs/TB1vBRYaVOWBuNjy0FiXXXFxVXa-2558-1306.jpg
---

飞冰（ICE）诞生于阿里巴巴内部大量的中后台业务，我们在中后台场景沉淀了大量的物料、工具以及经验，同时也抽象出一套从物料到项目的完整开发流程。如果你符合以下两种场景之一，那么欢迎了解下飞冰（ICE）体系：

- 如果你所在的团队使用 React 开发前端项目，那么你可以最大限度的发挥飞冰（ICE）的能力：丰富的物料体系、完善的工程构建工具、GUI 开发能力，同时你也可以定制私有的物料体系
- 如果你所在的团队使用 Vue 或者其他框架开发前端项目，那么你可以基于飞冰（ICE）的工具体系开发私有的物料体系，然后通过 GUI 开发工具串联使用

## 特性

- **由官方维护的高质量 React 物料**：包含 [Fusion](https://fusion.design) 基础组件，30+ 业务组件，40+ 模板，200+ 区块，赋能业务
- **基于 iceworks 的 GUI 开发链路**：基于 Electron 开发的桌面端工具，让开发链路更加简单易用
- **基于 ice-scripts 的工程构建能力**：屏蔽 webpack/babel 等的复杂配置，同时提供丰富的自定义能力，让 React 项目的开发构建更加简单
- **基于 ice-devtools 快速构建物料体系**：支持构建 React/Vue/Angular/…… 等不同的前端框架的物料体系；支持业务根据自身需求开发私有物料，同时在 iceworks 端灵活使用

## 概念

### 物料

物料即组成一个前端项目的不同单位，我们将物料从小到大依次抽象为：组件 -> 区块 -> 模板，具体定义如下：

- 组件：
  - 基础组件：同一公司同类业务应该只有一套基础组件，基础组件需要足够原子化以及灵活性，比如 Button, Menu 等
  - 业务组件：面向业务的组件体系，一般功能比较确定同时复杂度较高，业务里通过 npm 依赖使用，不可随意更改业务组件代码
- 区块：与组件相比灵活性较高，功能相对比较简单，对应代码量也比较少，业务里会将区块的代码复制到项目里使用
- 模板：样板工程，通常会包含通用的布局、常用页面、工程配置等，常在初始化项目时使用

基于这套理念，我们建设了一些社区通用物料，同时业务也可以建设自己的私有物料体系，具体请参考 [自定义物料](/docs/materials/about.md)。

### iceworks

基于 Electron 开发的 GUI 开发工具，iceworks 核心解决如下两个问题：

1. 通过 GUI 屏蔽前端工程及环境配置的复杂度
2. 借助 GUI 提供更加丰富的能力：比如基于丰富的模板创建项目、根据区块组装新页面、Git 面板、依赖管理等

关于 iceworks 更完善的使用介绍，请参考文档 [关于 iceworks](/docs/iceworks/about.md)

### ice-scripts

基于 Webpack 的工程工具，支持命令行方式使用，主要用于开发构建 React 项目，与 Create React App 相比主要有以下差异化：

- 基于飞冰物料体系的定制能力，如主题配置、资源本地化等
- 更加简单的自定义配置能力
- 支持业务组件的开发构建
- 支持根据模板创建项目、添加区块等能力

关于 ice-scripts 更完善的使用介绍，请参考文档 [关于 ice-scripts](/docs/cli/about.md)

### ice-devtools

物料开发&管理工具，ice-devtools 提供了物料从初始化到发布的完整链路，在此基础上我们约定了一套物料协议，保证基于 ice-devtools 开发的物料可以直接在 iceworks 中使用。

ice-devtools 不仅支持 React/Vue 等不同框架的物料模板，同时也支持业务自定义自身的物料模板，具体请参考 [自定义物料](/docs/materials/about.md)。

## 常见问题

#### 使用飞冰是否需要具备一定的前端基础？

毫无疑问是需要的，我们在努力降低前端开发的门槛，但一些基础的前端知识还是需要具备的，比如 JavaScript 的基础预发、前后端如何通信等。为了便于快速入门前端知识，我们整理了一份 [前端基础知识](/docs/guide/dev/front-basic.md)，希望能帮助到开发者。

#### 常用的组件有哪些推荐？

参考资源 [社区组件推荐](/docs/guide/resource/npms.md)

#### 飞冰（ICE）的浏览器兼容策略是怎样的？

由于 ICE 默认使用 React 16+，其需要的最低 IE 版本为 11，如果您需要在以下的版本使用，您可能需要引入一些 polyfill 来支持 `Map`, `Set` 等特性。参考[React 官网说明](https://reactjs.org/blog/2017/09/26/react-v16.0.html#javascript-environment-requirements)。

#### 飞冰官方的 React 组件为什么使用 Fusion，而不是 Antd？

Fusion 组件和 Antd 组件本身是解决类似问题的，飞冰始于淘宝内部的业务场景，在最开始的阶段 Fusion 对这些业务做了非常多的支持，因此飞冰默认使用的是 Fusion 组件，在此基础上，Fusion 组件的可定制性（主题配置）高于 Antd，这在面向多样性的业务场景时显得非常重要。

当然在飞冰的体系里你依然可以选择使用 Antd 的组件，甚至你可以发起建设基于 Antd 的物料。

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

  <img src="https://img.alicdn.com/tfs/TB1pzg_QhjaK1RjSZKzXXXVwXXa-970-1280.jpg" width="300" />