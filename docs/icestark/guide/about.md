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

[icestark](https://github.com/ice-lab/icestark) 是针对大型中后台多应用共存的解决方案。他可以：

- 以路由为基础，模块化方式组合多个 SPA 应用
- 多个应用间保持仓库独立，实现业务解耦、独立开发部署
- 通过公共的框架应用统一入口、页面风格
- 通过很少的改造成本，就能将已有的 react 应用迁移到 icestark 体系，完全面向 react 设计
- 保留 SPA 级用户体验

## 应用架构

使用 icestark 方案的应用架构图

![demo示例](https://img.alicdn.com/tfs/TB1PayIdqWs3KVjSZFxXXaWUXXa-806-820.jpg)

- 使用 icestark 方案的应用，会按照 UI 进行框架应用、子应用的拆分
- 框架应用：负责子应用的注册，公共内容（Common Header、Common Sidebar、Common Footer等）展示
- 子应用：负责自身业务相关的内容展示
