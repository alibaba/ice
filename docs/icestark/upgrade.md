---
title: 版本升级
order: 3
---

## 1.x -> 2.x

> icestark@2.0.0 于 2020 年 12 月发布，[Changelog](https://github.com/ice-lab/icestark/releases/tag/v2.0.0)

- 支持以 API 的方式初始化主应用，主应用不再限制 React/Vue/Angular 等不同框架
- 支持加载 UMD 格式的微应用产物

注意：`@ice/stark` 2.0.0 完全兼容 1.0.0 版本的 API，因此主应用可以非常低成本的升级 2.0.0 版本。

### 主应用升级

2.x 版本完全向前兼容，因此直接将 `@ice/stark` 依赖升级到 2.x 最新版本即可。
### 微应用升级

> 请确保主应用中 `@ice/stark` 的版本大于 2.0.0 (或者 1.6.0)

2.x 版本之后，微应用支持两种格式的导出方式：

1. [原有] 通过 `registerAppEnter/registerAppLeave` 注册生命周期
2. [新增] UMD 格式，通过 `mount/unmount` 注册生命周期，并通过 `setLibraryName` 配置微应用导出的[全局名称](https://webpack.js.org/configuration/output/#outputlibrary)。

通过 `build-plugin-icestark` 构建的微应用，只需将 `build-plugin-icestark` 的版本更新至 2.x，并开启插件选项 `umd: true`。

## 0.x -> 1.x

> icestark@1.0.0 于 2019 年 10 月发布，[Changelog](https://github.com/ice-lab/icestark/releases/tag/v1.0.0(2019-10-14))

- 将微应用相关 API 拆成独立的包 `@ice/stark-app`，保证兼容不同框架的微应用
- 支持 `onAppEnter/onAppLeave` 相关 API

### 迁移步骤

#### 主应用

将 `@ice/stark` 从 0.x 升级到 1.x 即可，API 跟 0.x 兼容。

#### 微应用

- 移除 `@ice/stark` 依赖：`npm rm @ice/stark --save`
- 安装 `@ice/stark-app` 依赖：`npm i @ice/stark-app --save`
- 批量替换代码中 `@ice/stark` 为 `@ice/stark-app`
