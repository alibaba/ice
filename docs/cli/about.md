---
title: 关于 ice-scripts
order: 1
---

[ice-scripts](https://github.com/alibaba/ice/tree/master/tools/ice-scripts) 是飞冰（ICE）团队提供的React 链路的工程工具。

ice-scripts 提供了丰富的功能帮助我们开发 React 项目。完善的默认配置，让开发者专注于项目开发，不必理会复杂的工程配置问题。同时它提供灵活的配置能力，无需
像 create-react-app 那样 eject 所有 webpack 配置。通过丰富的插件体系涵盖不同场景，支持各种功能拓展和业务需求。

我们致力于将 ice-scripts 打造为 React 生态下高可配置性、高可用的工程工具。

## 特性

- 提供完善基础配置，通过设置 `ice.config.js` 配置文件快捷支持大多数项目的工程配置需求
- 提供插件机制，帮助扩展工程能力，丰富的插件体系，满足 Fusino/AntD 体系自定义主题配置、 资源本地化等功能
- 提供丰富的功能，如 ES6+ 语言特性、TypeScript、样式方案（Less/Sass/CSS Modules）等开箱即用支持
- 支持不同类型 React 项目的开发&构建，包括项目开发、业务组件开发和区块开发
- 灵活的自定义 webpack 配置，满足定制需求场景

## 为什么不是

### 自定义 webpack 配置

### create react app