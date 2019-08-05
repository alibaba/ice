---
title: 关于 icestark
order: 0
---

## 背景

大型中后台系统开发，往往涉及到多团队协作的情况。传统 SPA 应用都是基于一个代码仓库，业务逻辑交织，随着业务不断发展，逐渐成为巨石（Monolithic）应用，不利于维护。而为了解决这些问题，往往采用 iframe 做隔离。但 iframe 方案有以下问题：

- 网页性能，onload 事件延迟和复用连接池问题
- 用户体验，页面跳转生硬、多滚动条和弹窗的遮罩问题
- 通讯模式，iframe 需要自定义通讯协议以及安全校验（如 postMessage）

## 什么是 icestark

[icestark](https://github.com/ice-lab/icestark) 是面向大型应用的微前端解决方案，包含以下特性：

- 基于路由，模块化管理多个独立应用
- 不同应用独立仓库、独立开发与部署
- 统一管理页面公共内容（Common Header、Common Sidebar 等）
- 支持应用低成本迁移
- SPA 用户体验

## 应用架构

![应用架构](https://img.alicdn.com/tfs/TB1kbF7bbY1gK0jSZTEXXXDQVXa-1421-1416.png)

- 按照 UI 结构进行框架应用、子应用的拆分
- 框架应用：负责子应用的注册，公共内容展示（Common Header、Common Sidebar、Common Footer等）
- 子应用：负责自身业务相关的内容展示
