---
title: 关于 ice-scripts
order: 1
---

[ice-scripts](https://github.com/alibaba/ice/tree/master/tools/ice-scripts) 是飞冰（ICE）团队提供的 React 链路的工程工具。

ice-scripts 提供了丰富的功能帮助我们开发 React 项目。完善的默认配置，让开发者专注于项目开发，不必理会复杂的工程配置问题。同时它提供灵活的配置能力，无需像 create-react-app 那样 eject 所有 webpack 配置。通过丰富的插件体系涵盖不同场景，支持各种功能拓展和业务需求。

我们致力于将 ice-scripts 打造为 React 生态下高可配置性、高可用的工程工具。

![架构图](https://img.alicdn.com/tfs/TB12LBZawKG3KVjSZFLXXaMvXXa-2844-2133.png)

## 特性

- 提供完善基础配置，通过设置 `ice.config.js` 配置文件快捷支持大多数项目的工程配置需求
- 提供插件机制，帮助扩展工程能力，丰富的插件体系，满足 Fusino/AntD 体系自定义主题配置、 资源本地化等功能
- 提供丰富的工程能力，如 ES6+ 语言特性、TypeScript、样式方案（Less/Sass/CSS Modules）等开箱即用支持
- 支持不同类型 React 项目的开发&构建，包括项目开发、业务组件开发和区块开发
- 基于 webpack-chain 提供灵活的自定义 webpack 配置能力

## 为什么不是？

### 自定义 webpack 配置

自定义 webpack 配置可以让你掌握项目工程的每一个细节，开发者需要熟悉 `webpack` + `babel` 这些主流工程工具的配置和概念，比如 webpack loader、webpack plugins、babel plugins 和 babel presets 等等。对于不熟悉工程配置的开发者而言，将是一个不低的门槛。`ice-scripts` 致力于收敛一系列工程工具概念，提供一系列开箱即用的能力，让开发者专注于项目开发。

### create-react-app

create-react-app 提供了基于 React 项目的一套最佳工程配置实践，它的细节体验做的很好。可惜它支持的自定义配置能力太弱。如果要定制化工程方案，就需要执行 `npm run eject`，官方并不推荐这种做法，eject 出来的 webpack 配置对开发者而言太过于复杂。`ice-scripts` 则选择在提供一套完善基础配置的基础上，提供快捷定制 webpack 工程配置的能力，并且提供插件机制和自定义 webpack 的接口，满足不同项目工程的定制和复用需求。
