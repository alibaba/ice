---
title: 关于 icestark
order: 0
---

[icestark](https://github.com/ice-lab/icestark) 是一个极其轻量的，支持多仓库、模块化开发大型 react 项目的解决方案。我们大胆预判，未来大型中后台项目的场景会越来越多，包括应用改造上云、业务边界不断拓展、各类原有系统的前后端整合等等。大型中后台项目能带来统一入口、统一风格、统一体验、统一管理等优势。而传统 SPA 应用的开发方式都是一个代码仓库，随着业务不断发展，逐渐成为巨石（Monolithic）应用，不利于维护、跨团队协作和新需求开发。icestark 以路由为基础，支持多个 SPA 级别的项目，以模块化方式组合成一个大型系统，各个模块（子应用）支持多团队独立开发、独立仓库、独立运维、独立部署。

icestark 是飞冰（ICE）的工作台解决方案，面向大型中后台系统的前端架构方案。

## 应用架构

下图是使用 icestark 方案的应用架构图

![demo示例](https://img.alicdn.com/tfs/TB1JBLqXBCw3KVjSZFuXXcAOpXa-741-836.png)

- 使用 icestark 方案的应用，会按照 UI 进行框架应用、子应用的拆分
- 框架应用：负责子应用的注册，公共内容（Common Header、Common Sidebar、Common Footer等）展示
- 子应用：负责自身业务相关的内容展示

## 特性

- 极其轻量的库
- 代码侵入性少
- 面向 react 设计
- SPA 级用户体验
- TypeScript 支持

## 和 ice-scripts、iceworks 的关系？

- ice-scripts 是 react 链路的工程工具，目的是简化 react 项目配置
- iceworks 是前端快速可视化搭建的平台，目的是快速搭建前端项目，提升前端开发效率
- icestark 可以方便得将 iceworks / ice-scripts 管理的 react 项目，模块化的方式组合成一个复杂系统

## 为什么不是？

### SPA

传统 SPA 应用，随着逻辑代码逐渐转嫁至前端、业务发展/问题修复不断迭代新版本、维护人员的不断更替等原因，应用体量变得越来越大、越来越难以维护，同时后期任意的改动都需要整个前端应用重新打包、部署、测试，牵一发而动全身。而 icestark 支持将传统 SPA 应用进行拆分；或者将新建的 SPA 应用作为子应用嵌入到原有应用中，而不影响原有应用的业务逻辑。各个子应用能保持相对独立，便于跨团队协同开发、独立运维部署。

### iframe

iframe 需要将嵌入的应用单独部署，包括 html 的部署，伴随着域名申请、服务稳定性等一系列问题。同时安全性、网页性能、用户体验、SEO 都不太友好。相比 iframe，icestark 只需嵌入应用部署js、css的 cdn，通过路由方式控制嵌入应用之间的资源加载、切换、渲染，保留 SPA 的用户体验。

### Web Components

Web Components 是面向未来的模块化标准，但目前并没有明显流行的趋势，同时将 react 应用 Web Components 化的改造成本很高，伴随的风险也很大。而 icestark 只需极少的改造成本，API 设计完全面向 react 应用开发，上手成本很低。
