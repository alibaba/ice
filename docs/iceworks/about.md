---
title: 概述
order: 1
---

## Iceworks: 可视化智能开发助手

[![Version for VS Code Extension](https://vsmarketplacebadge.apphb.com/version-short/iceworks-team.iceworks.svg?logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=iceworks-team.iceworks)
[![Installs](https://vsmarketplacebadge.apphb.com/installs-short/iceworks-team.iceworks.svg)](https://marketplace.visualstudio.com/items?itemName=iceworks-team.iceworks)
[![Rating](https://vsmarketplacebadge.apphb.com/rating-short/iceworks-team.iceworks.svg)](https://marketplace.visualstudio.com/items?itemName=iceworks-team.iceworks&ssr=false#review-details)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/ice-lab/iceworks/pulls)
[![The MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)

社会、经济、民生正在加速数字化，微软预测：未来五年，我们开发的应用程序将超过过去所有时代的总和 —— 这是一个爆炸式的发展。爆炸式发展对先进生产力提出了更高的要求，但现状却是：应用程序开发高门槛、质量无保障和效率遇瓶颈的困局。

Iceworks 就是在此背景下诞生的可视化智能开发助手，旨在驱动软件开发工具和方法产生巨大变革。

Iceworks 通过「 双引擎和双模型」，运用可视化引擎和智能化引擎、质量和效率评估模型：**降低应用开发的门槛**、**保障开发质量**，**提高开发效率**。Iceworks 客户端通过插件的形式集成在 IDE 中，目前实现了与 [VS Code](https://code.visualstudio.com/) / WebIDE / O2(阿里内部) 等主流集成开发工具（平台）的无缝对接，方便开发者随时随地快速使用可视化、智能化的能力进行应用开发。

## 产品特点

### 可视化开发

Iceworks 可视化开发提供两个基本功能：可视化搭建和可视化配置。

可视化搭建提供所见即所得的拖拽能力，助力快速完成前端页面的开发。该能力不与具体平台绑定、和具体框架无关，搭建完成后可以继续二次编码，它在极大降低前端开发的门槛和提升前端开发的效率同时，还兼顾了程序的可维护性和灵活性：

![可视化搭建](https://img.alicdn.com/tfs/TB1yTO8i8Bh1e4jSZFhXXcC9VXa-1440-900.png_790x10000.jpg)

可视化配置旨在降低前端开发门槛、提升开发体验，提供了流程引导生成代码和表单操作生成代码的能力，该能力支持自定义模板或物料，为开发者提供个性化代码的生成能力：

![可视化配置](https://img.alicdn.com/tfs/TB1VzS_i8Bh1e4jSZFhXXcC9VXa-1024-768.png_790x10000.jpg)

### 智能编程

Iceworks 智能编程当前提供了两个基本功能：代码自动补全和代码信息提示。

在开发者编写代码的过程中，智能引擎能够自动预测开发者的编程意图，连续向开发者推荐「即将书写的下一段代码」，开发者可以通过「一键补全」的方式，直接确认接下来要输入的代码，从而大大提升代码的编写效率。例如输入样式字段和值时，Iceworks 提供的代码自动补全效果如下：

![使用示例](https://user-images.githubusercontent.com/56879942/87412958-3895e700-c5fc-11ea-88e2-3e3e78a07f9e.gif)

Iceworks 的代码自动补全能力基于语言语义和源代码分析，完全本地执行，确保代码安全；毫秒级响应，流畅进行编码！

### 丰富的物料体系

Iceworks 内置 Fusion Design、Rax UI 组件库，丰富的模板开箱即用。同时支持接入自定义物料，对物料开发的链路提供了全流程的支持，开发者可轻松定制业务专属的物料集合：

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

我们会研究相关技术，以实现低成本在更多的 IDE 上进行集成，服务更广大的开发者。但目前没有明确的时间表。

### Iceworks 支持哪些应用类型？

Iceworks 目前支持前端应用的开发，支持 Web 前端应用和无线应用（H5、小程序）的开发，内置使用 [icejs](https://github.com/alibaba/ice) 框架，你可以通过添加[自定义物料](/docs/iceworks/)的方式使用更多的前端框架。

## 如何获取更多帮助？

### 加入钉钉交流群

![二维码](https://img.alicdn.com/tfs/TB1OdxtgIVl614jSZKPXXaGjpXa-490-672.png_360x10000.jpg)

> 阿里内部钉钉群号：23161909

### 提交问题

向 Iceworks Github 仓库提交 [issue](https://github.com/ice-lab/iceworks/issues/new?labels=iceworks) ，我们会快速跟进你遇到的问题。

### 预约培训

对于打算大规模使用的公司或团队，Iceworks 可以提供免费的培训，具体请咨询 @梧忌(wuji.xwt@alibabab-inc.com)