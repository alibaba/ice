---
title: iceworks 是什么
order: 1
---

## iceworks 是什么

> 企业级的一站式研发工作台

* 项目管理：覆盖项目研发的全流程管理，提供页面管理、路由管理、依赖管理、OSS 发布管理等丰富多样的项目管理面板。
* 工程管理：可视化配置工程，屏蔽复杂的工程体系，降低开发门槛。
* 物料市场：提供丰富的垂直领域模板和区块，可视化拖拽搭建页面，提升项目的开发效率。
* 定制工作台：通过 adapter 机制自由扩展工作台，打造开发者专属的一站式研发工作台，让开发者可以快速地创建和管理前端项目。

## 产品设计

iceworks 工作台提供一站式的研发生命周期管理能力，覆盖从源码到上线的完整研发流程，下图是 iceworks 基于物料市场从源码到上线的一个流程图：

![iceworks-workbench](https://img.alicdn.com/tfs/TB1YjEudLWG3KVjSZFPXXXaiXXa-970-633.png)

## 项目管理

页面管理、路由管理、依赖管理、OSS 发布管理等丰富多样的项目管理面板覆盖项目研发的全流程管理。

![项目管理](https://img.alicdn.com/tfs/TB1LdRYd9WD3KVjSZSgXXcCxVXa-2876-1582.png)

## 工程管理

可视化配置工程，支持一键启动调试、构建、代码检查等工程任务，屏蔽复杂的工程体系，降低开发门槛。

![工程管理](https://img.alicdn.com/tfs/TB1HpB1d8Kw3KVjSZFOXXarDVXa-2880-1584.png)

## 物料市场

官方提供海量高质量物料，包含丰富的垂直领域模板和区块，多种风格自由切换，满足个性化需求，同时还支持自定义物料接入工作台。基于物料提供可视化的搭建方式，一键快速创建项目，减少重复的开发。

![物料市场](https://img.alicdn.com/tfs/TB1TY01d8Kw3KVjSZFOXXarDVXa-2878-1580.png)

## 定制工作台

iceworks 通过提供 adapter 的机制，支持开发者实现定制工作台的能力；adapter 本质上是某一类前端项目的最佳实践的抽象，通过 adapter 机制可以接入 iceworks 进行可视化的项目工程管理，定制专有的前端工作台。

![iceworks-adapter-design](https://img.alicdn.com/tfs/TB1wwsmcAxz61VjSZFrXXXeLFXa-2384-1404.png)
