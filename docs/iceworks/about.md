---
title: 概述
order: 1
---

<p align="center">
  <a href="https://ice.work">
    <img alt="Iceworks" src="https://img.alicdn.com/tfs/TB1kDZlXBBh1e4jSZFhXXcC9VXa-256-256.png" width="96">
  </a>
</p>
<h1 align="center">Iceworks</h1>
<p align="center">可视化智能开发助手</p>
<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=iceworks-team.iceworks">
    <img src="https://vsmarketplacebadge.apphb.com/version/iceworks-team.iceworks.svg?logo=visual-studio-code" />
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=iceworks-team.iceworks">
    <img src="https://vsmarketplacebadge.apphb.com/installs-short/iceworks-team.iceworks.svg" />
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=iceworks-team.iceworks&ssr=false#review-details">
    <img src="https://vsmarketplacebadge.apphb.com/rating-short/iceworks-team.iceworks.svg" />
  </a>
  <a href="https://github.com/ice-lab/iceworks/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" />
  </a>
  <a href="http://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT license" />
  </a>
</p>

社会、经济、民生正在加速数字化， Gartner 预测：未来五年，我们开发的应用程序将超过过去所有时代的总和 —— 这是一个爆炸式的发展。爆炸式发展对先进生产力提出了更高的要求，但当前现状却是：应用程序开发高门槛、质量无法保障和效率瓶颈的困局。

Iceworks 就是在此背景下诞生的可视化智能开发助手，旨在驱动软件开发工具和方法产生巨大变革。

Iceworks 通过「 2 个引擎 2 个模型」，运用可视化引擎和智能化引擎、质量和效率评估模型**降低应用开发的门槛**、**保障开发质量**，**提高开发效率**。Iceworks 客户端通过插件的形式集成在 IDE 中，实现了与 VS Code / WebIDE / O2(阿里内部) 等主流集成开发平台的无缝对接，方便开发者随时随地快速使用可视化智能能力进行应用开发。

## 产品特点

### 可视化开发

Iceworks 可视化开发提供两个基本功能：可视化搭建和可视化配置。

可视化搭建提供所见即所得的拖拽能力快速完成前端页面的开发，该能力不与具体平台绑定、和具体框架无关，搭建完成后可以继续二次编码，它在极大降低前端开发的门槛和提升前端开发的效率同时，还兼顾程序的可维护性和灵活性：

![可视化搭建](https://img.alicdn.com/tfs/TB1yTO8i8Bh1e4jSZFhXXcC9VXa-1440-900.png_790x10000.jpg)

可视化配置旨在降低前端开发门槛、提升开发体验，提供了流程或表单操作的方式生成代码，配合模板或物料，为开发者提供自定义的代码生成能力：

![可视化配置](https://img.alicdn.com/tfs/TB1VzS_i8Bh1e4jSZFhXXcC9VXa-1024-768.png_790x10000.jpg)

### 智能编程

Iceworks 智能编程当前提供了两个基本功能：代码自动补全和信息提示。

在开发者编写代码的过程中，智能引擎能够自动预测开发者的编程意图，连续向开发者推荐「即将书写的下一段代码」，开发者可以通过「一键补全」的方式，直接确认接下来输入的代码，从而大大提升代码的编写效率。例如输入样式字段和值时，Iceworks 提供的代码自动补全：

![使用示例](https://user-images.githubusercontent.com/56879942/87412958-3895e700-c5fc-11ea-88e2-3e3e78a07f9e.gif)

Iceworks 的代码自动补全能力基于语言语义和源代码分析，无需上传代码，确保代码安全，本地顺畅运行！

### 丰富的物料体系

Iceworks 内置 Fusion Design、Rax UI 组件库，丰富的模板做到开箱即用。同时支持接入自定义物料，对物料开发的链路提供了全流程支持， 可轻松定制业务专属的物料集合：

![物料示例](https://img.alicdn.com/tfs/TB1UjO9SET1gK0jSZFrXXcNCXXa-1000-750.png)

## 指南导航

- [概述](/docs/iceworks/about)
- [快速开始](/docs/iceworks/quick-start)：介绍如何安装和使用 Iceworks。
- 用户指南
    - [创建应用](/docs/iceworks/create-application)：介绍如何使用 Iceworks 创建前端应用。
    - [信息概览](/docs/iceworks/application-view)：介绍 Iceworks 入口包含的功能，按图索引了解 Iceworks 全部功能。
    - [调试、构建和发布](/docs/iceworks/flow)：介绍如何通过 Iceworks 对前端应用进行基本的开发。
    - [可视化搭建](/docs/iceworks/ui-builder)：介绍如何使用 Iceworks 的可视化搭建功能。
    - [可视化配置](/docs/iceworks/ui-settings)：介绍如何使用 Iceworks 的可视化配置功能。
    - [依赖包管理](/docs/iceworks/dependency)：介绍如何使用 Iceworks 进行应用依赖包管理。
    - [编码辅助](/docs/iceworks/intelli-sense)：介绍 Iceworks 包含的智能编码辅助功能。
    - [自定义物料](/docs/iceworks/material)：介绍如何通过自定义物料定制使用 Iceworks。
- 附加说明
    - [功能配置和插件管理](/docs/iceworks/settings)：介绍如何禁止和启用 Iceworks 的相关功能。
    - [从老版本升级](/docs/iceworks/upgrade-guidelines)：介绍如何从 2.0 、3.0、4.0 版本进行升级
- VS Code 指南
    - [安装](/docs/iceworks/install)
    - [用户界面](/docs/iceworks/user-interface)
    - [资源管理器](/docs/iceworks/explorer)
    - [代码编辑](/docs/iceworks/editor)
    - [源代码管理(Git)](/docs/iceworks/version-control)
    - [集成终端(Terminal)](/docs/iceworks/integrated-terminal)
    - [设置](/docs/iceworks/settings)

## 常见问题

### 会不会提供其他 IDE 的插件，例如 WebStorm ？

我们会研究相关技术，以实现低成本在更多 IDE 进行集成，服务广大的开发者，但目前没有明确的时间表。

### Iceworks 支持哪些应用类型？

Iceworks 目前支持前端应用的开发，支持 Web 前端应用和无线应用（H5、小程序）的开发，内置使用 [icejs](https://github.com/alibaba/ice) 框架，你可以通过添加[自定义物料](/docs/iceworks/)的方式使用更多的前端框架。

## 如何获取更多帮助？

### 加入钉钉交流群

加入钉钉群了解 Iceworks 最新进展：

![二维码](https://img.alicdn.com/tfs/TB1OdxtgIVl614jSZKPXXaGjpXa-490-672.png_360x10000.jpg)

> 阿里内部钉钉群号：23161909

### 提交问题

向 Iceworks Github 仓库提交 [issue](https://github.com/ice-lab/iceworks/issues/new?labels=iceworks) ，我们会快速跟进你遇到的问题。

### 预约培训

对于打算大规模使用的公司或团队，Iceworks 可以提供免费的培训，具体请咨询 @梧忌(wuji.xwt@alibabab-inc.com)