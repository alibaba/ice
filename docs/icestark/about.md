---
title: 关于 icestark
order: 1
---

## 介绍

[icestark](https://github.com/ice-lab/icestark) 是一个面向大型系统的微前端解决方案，适用于以下业务场景：

- 后台比较分散，体验差别大，因为要频繁跳转导致操作效率低，希望能统一收口的一个系统内
- 单页面应用非常庞大，多人协作成本高，开发/构建时间长，依赖升级回归成本高
- 系统有二方/三方接入的需求

icestark 在保证一个系统的操作体验基础上，实现各个微应用的独立开发和发版，主应用通过 icestark 管理微应用的注册和渲染，将整个系统彻底解耦。

## 特性

- 主应用和微应用皆支持 React/Vue/Angular... 等不同框架
- 主应用只需依赖 npm 包 `@ice/stark`，不耦合任何工程体系
- 微应用独立开发、不耦合任何框架以及工程体系，已有应用迁移成本极低
- 整个系统用户体验好，跟 SPA 应用基本一致

## 架构设计

![应用架构](https://img.alicdn.com/tfs/TB1bvbieEY1gK0jSZFMXXaWcVXa-1421-1416.png)

- 按照 UI 结构进行主应用、微应用的拆分
- 主应用：负责微应用的注册与渲染，公共内容展示（Common Header、Common Sidebar、Common Footer等）
- 微应用：负责自身业务相关的内容展示

## 使用案例

### 阿里创作者平台

![](https://img.alicdn.com/tfs/TB1Nk4Ljxn1gK0jSZKPXXXvUXXa-1804-1526.png)

### 阿里健康-熙牛医疗云医院信息系统

![](https://img.alicdn.com/tfs/TB1gVFMjCf2gK0jSZFPXXXsopXa-1718-1090.png)

### 淘系小二工作台

![](https://img.alicdn.com/tfs/TB1rKxOjAT2gK0jSZPcXXcKkpXa-1434-1316.png)
