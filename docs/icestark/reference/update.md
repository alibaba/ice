---
title: 版本迁移
order: 3
---

## 0.x -> 1.x

icestark@0.x 的项目如何迁移到 1.0 版本。

### 1.x 做了什么

- 将微应用相关 API 拆成独立的包 `@ice/stark-app`，保证兼容不同框架的微应用
- 支持 `onAppEnter/onAppLeave` 相关 API

### 迁移步骤

#### 框架应用

将 `@ice/stark` 从 0.x 升级到 1.x 即可，API 跟 0.x 兼容。

#### 微应用

- 移除 `@ice/stark` 依赖：`npm rm @ice/stark --save`
- 安装 `@ice/stark-app` 依赖：`npm i @ice/stark-app --save`
- 批量替换代码中 `@ice/stark` 为 `@ice/stark-app`


## 1.x -> 2.x

### 2.x 做了什么

- 支持以 API 的方式初始化框架应用，让不同技术栈架构（React/Vue/Angular）的框架应用都可以快速接入 icestark 架构
- React 技术栈下 AppRouter 的初始化方式保留

### 迁移步骤

存量 1.x 的应用将 `@ice/stark` 升级到 2.x 最新版本即可，AppRouter 注册方式同 1.x 完全兼容