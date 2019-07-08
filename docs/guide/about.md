---
title: 关于飞冰
order: 1
cover: https://gw.alicdn.com/tfs/TB1vBRYaVOWBuNjy0FiXXXFxVXa-2558-1306.jpg
---

> 简单而友好的前端研发体系

飞冰（ICE）诞生于阿里巴巴内部大量的中后台业务，我们在中后台场景沉淀了大量的物料、工具以及经验，同时也抽象出一套从物料到页面的高效开发流程。如果你符合以下场景之一，那么欢迎了解下飞冰（ICE）：

- 你正在使用 React/Vue 开发大量的后台（PC）页面，你可以使用飞冰已有的物料或者建设自定义物料提高开发效率
- 你所在的公司在前端研发流程上处于不完整或者缺失状态，那么你可以直接使用 iceworks 的开发流程

## 特性

- 研发生态：
  - 物料：官方维护的丰富的 [React 物料](https://ice.work/scaffold)，社区共建的 [Vue 物料](https://ice.work/block?type=vue)
  - React 项目构建工具：配置简单、插件化能力等，参考文档 [ice-scripts](https://ice.work/docs/cli/about)
  - 场景化解决方案：面向状态管理、表单、权限、菜单管理等常见业务领域的解决方案
- 研发流程：
  - 基于 iceworks 通过 GUI 方式完成项目管理、物料管理、项目开发以及发布的完成流程
  - 通过 ice-devtools 支持业务根据自身需求建设自定义的物料体系，提效项目开发

## 相关产品

- [iceworks](https://ice.work/iceworks): GUI 开发工具
- [ice-devtools](https://ice.work/docs/materials/about): 物料管理与开发工具
- [ice-scripts](https://ice.work/docs/cli/about): React 项目的工程构建工具
- [icestore](https://github.com/ice-lab/icestore): 基于 React Hooks 的非常轻量的状态管理方案
- [React 官方物料](https://github.com/ice-lab/react-materials): 由官方维护的基于 [Fusion 组件](https://fusion.design/component)的 React 官方物料，30+ 模板、200+ 区块
- [Vue 社区物料](https://github.com/ice-lab/vue-materials): 由社区共建的基于 ElementUI 的 Vue 物料

## 常见问题

#### 使用飞冰是否需要具备一定的前端基础？

毫无疑问是需要的，我们在努力降低前端开发的门槛，但一些基础的前端知识还是需要具备的，比如 JavaScript 的基础预发、前后端如何通信等。为了便于快速入门前端知识，我们整理了一份 [前端基础知识](/docs/guide/dev/front-basic.md)，希望能帮助到开发者。

#### 飞冰（ICE）的浏览器兼容策略是怎样的？

飞冰官方 React 物料默认使用 React 16+，其需要的最低 IE 版本为 11，如果您需要在以下的版本使用，您可能需要引入一些 polyfill 来支持 `Map`, `Set` 等特性。参考[React 官网说明](https://reactjs.org/blog/2017/09/26/react-v16.0.html#javascript-environment-requirements)。

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

  <img src="http://ice.alicdn.com/assets/images/qrcode.png" width="300" />
