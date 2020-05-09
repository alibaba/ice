---
title: 从 0.x 版本迁移
order: 2
---

## 0.x -> 1.0

icestark@0.x 的项目如何迁移到 1.0 版本。

### 1.0 做了什么

- 将子应用相关 API 拆成独立的包 `@ice/stark-app`，保证兼容不同框架的子应用
- 支持 `onAppEnter/onAppLeave` 相关 API

### 迁移步骤

#### 框架应用

将 `@ice/stark` 从 0.x 升级到 1.x 即可，API 跟 0.x 兼容。

#### 子应用

- 移除 `@ice/stark` 依赖：`npm rm @ice/stark --save`
- 安装 `@ice/stark-app` 依赖：`npm i @ice/stark-app --save`
- 批量替换代码中 `@ice/stark` 为 `@ice/stark-app`