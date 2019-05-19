---
title: 关于 icestark
order: 0
---

icestark 是一个极其轻量的，支持多仓库、模块化开发大型 react 项目的解决方案。传统 SPA 应用都是一个代码仓库，随着业务不断发展，逐渐成为巨石（Monolithic）应用，不利于维护、跨团队协作和新需求开发。icestark 以路由为基础，支持多个 SPA 级别的项目，以模块化方式组合成一个大型系统，各个模块（子应用）支持多团队独立开发、独立仓库、独立运维、独立部署。

icestark 是飞冰（ICE）的工作台解决方案，面向大型中后台系统的前端架构方案。

![demo示例](https://img.alicdn.com/tfs/TB1aup3XA9E3KVjSZFGXXc19XXa-640-360.gif)

## 特性

- 极其轻量的库
- 代码侵入性少
- 使用方式简单（React Component）
- SPA 级别用户体验
- TypeScript 支持

## 和 icescripts、iceworks 的关系？

- icescripts 是 react 链路的工程工具，目的是简化 react 项目配置
- iceworks 是前端快速可视化搭建的平台，目的是快速搭建前端项目，提升前端开发效率
- icestark 可以方便得将 iceworks / icescripts 管理的 react 项目，模块化的方式组合成一个复杂系统

## 为什么不是？

### iframe

iframe 需要将嵌入的应用单独部署，包括 html 的部署，伴随着域名申请、服务稳定性等复杂性增加。同时安全性、网页性能、用户体验、SEO都不太友好。相比 iframe，icestark 只需嵌入应用部署js、css的cdn，通过路由方式控制嵌入应用之间的资源加载、切换、渲染，保留 SPA 的用户体验。

### Web Components

Web Components 是面向未来的模块化标准，但目前并没有明显流行的趋势，同时将 react 应用 Web Components 化的改造成本很高，伴随的风险也很大。而 icestark 只需极少的改造成本，API 设计完全面向 react 应用开发，上手成本很低。
