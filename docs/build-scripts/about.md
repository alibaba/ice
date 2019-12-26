---
title: 关于 build-scripts
order: 1
---

build-scripts 基于 webpack 构建体系，提供了丰富的能力覆盖 React 链路的开发：通过完善的基础配置屏蔽复杂的工程概念，让开发者更加专注与于项目的开发；通过丰富的插件体系涵盖不同场景，支持各种功能拓展和业务需求。

## 特性

- 支持多类型项目构建，包括 React 项目、Rax 多端项目和 React/Rax 业务组件开发
- 提供完善基础配置，通过 `build.json` 配置文件快捷支持大多数项目的工程配置需求
- 提供插件机制，帮助扩展工程能力，丰富的插件体系，满足项目开发中各种定制需求，如 Fusion/AntD 体系自定义主题配置、 资源本地化等功能
- 开箱即用的工程能力，核心插件提供丰富的内置工程能力，如 ES6+ 语言特性、TypeScript、样式方案（Less/Sass/CSS Modules）等
- 基于 webpack-chain 提供灵活的自定义 webpack 配置能力
- 基于 Jest 提供前端单元测试解决方案

## 与 ice-scripts 的关系

build-scripts 是基于 ice-scripts 架构的全面升级，在原先的基础上解耦了核心的工程链路，让 build-scripts 能够更加灵活的配置和管理多个 webpack 任务。同时 build-scripts 提供个更加丰富的插件 API，以满足不同场景下的开发和定制需求。