---
title: 关于飞冰
order: 1
cover: https://gw.alicdn.com/tfs/TB1vBRYaVOWBuNjy0FiXXXFxVXa-2558-1306.jpg
---

飞冰（ICE）诞生于阿里巴巴内部大量的中后台业务，我们在中后台场景沉淀了大量的物料、工具及经验，同时也抽象出一套从物料到项目的完整开发流程。如果你符合以下两种场景之一，那么欢迎了解下飞冰（ICE）体系

- 如果你所在的团队使用 React 开发前端项目，那么你可以最大限度的发挥飞冰（ICE）的能力：丰富的物料体系、完善的工程构建工具、GUI 开发能力，甚至你也可以定制私有的物料体系
- 如果你所在的团队使用 Vue 或者其他框架开发前端项目，那么你可以基于飞冰（ICE）的工具体系开发私有的物料体系，然后通过可视化开发工具串联使用

## 特性

- **由官方维护的高质量 React 物料**：包含 [Fusion](https://fusion.design) 基础组件，30+ 业务组件，40+ 模板，200+ 区块，赋能业务
- **基于 Iceworks 的 GUI 开发链路**：基于 Electron 开发的桌面端工具，让开发链路更加简单易用
- **基于 ice-scripts 的工程构建能力**：屏蔽 webpack/babel 等的复杂配置，同时提供丰富的自定义能力，让 React 项目的开发构建更加简单
- **基于 ice-devtools 快速构建物料体系**：支持构建 React/Vue/…… 等不同的前端框架的物料体系；支持业务根据自身需求开发私有物料，同时在 Iceworks 端灵活使用

## 概念

### 物料

物料即组成一个前端项目的不同单位，我们将物料从小到大依次抽象为：组件 -> 区块 -> 模板，具体定义如下：

- 组件：
  - 基础组件：同一公司同类业务应该只有一套基础组件，基础组件需要足够原子化以及灵活性，比如 Button, Menu 等
  - 业务组件：面向业务的组件体系，一般功能比较确定同时复杂度较高，业务里通过 npm 依赖使用，不可随意更改业务组件代码
- 区块：与组件相比灵活性较高，功能相对比较简单，对应代码量也比较少，业务里会将区块的代码复制到项目里使用
- 模板：样板工程，通常会包含通用的布局、常用页面、工程配置等，常在初始化项目时使用

基于这套理念，飞冰（ICE）在社区的参与下目前主要建立起如下物料体系：

|  物料名称  |  维护者  |  框架 |  工程体系  |  基础组件 | 代码仓库 |
|-----------|---------|------|-----------|----------|---------|
|React 物料 | 官方     | React |ice-scripts| Fusion | [github](https://github.com/ice-lab/react-materials) |
|Vue 物料   | 社区+官方 | Vue   | Vue CLI  | Element | [github](https://github.com/ice-lab/vue-materials) |

如果有兴趣共建社区物料体系，比如小程序、Angular 等，欢迎联系飞冰（ICE）团队，我们会给予社区参与者最大的帮助。

### Iceworks

基于 Electron 开发的 GUI 开发工具，Iceworks 核心解决如下两个问题：

1. 通过 GUI 屏蔽前端工程及环境配置的复杂度
2. 借助 GUI 提供更加丰富的能力：比如基于丰富的模板创建项目、根据区块组装新页面、Git 面板、依赖管理等

[了解更多](#/docs/iceworks)

### ice-scripts

基于 Webpack 的工程工具，主要用于开发构建 React 项目，与 Create React App 相比主要有以下差异化：

- 基于飞冰物料体系的定制能力，如主题配置、资源本地化等
- 更加简单的自定义配置能力
- 支持业务组件的开发构建

[了解更多](#/docs/basis/ice-scripts)

### ice-devtools

物料开发&管理工具，ice-devtools 提供了物料从初始化到发布的完整链路，在此基础上我们约定了一套物料协议，保证基于 ice-devtools 开发的物料可以直接在 Iceworks 中使用。

ice-devtools 不仅支持业务自定义自身的物料模板，同时也支持 React/Vue 等不同框架的物料模板，如有除此之外的需求，欢迎联系我们。

[了解更多](#/docs/advanced/custom-materials)

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
* 答疑钉钉群，内部同学请搜索「飞冰（ICE）万能群」：

  <img src="https://img.alicdn.com/tfs/TB1pzg_QhjaK1RjSZKzXXXVwXXa-970-1280.jpg" width="300" />