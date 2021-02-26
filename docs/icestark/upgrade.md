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
2. [新增] UMD 格式，通过 `mount/unmount` 注册生命周期，如果微应用是 UMD 格式，则在主应用里配置时必须加上 `umd={true}` 的标识：

```diff
<AppRoute
+  umd={true}
  path="/seller"
  title="标题"
  url={[]}
/>
```

当工程配置添加了 umd 相关配置，或者 `build-plugin-icestark` 版本大于 2.0 并且开启了 `umd: true`，则会构建出 UMD 格式的微应用，这种情况下必须在主应用里添加上述所说的 `umd={true}` 配置，否则微应用将无法正常渲染出来。

如果无法快捷的在主应用里添加 `umd={true}` 配置，可以将微应用从 UMD 格式切回到 `registerAppEnter/registerAppLeave`。（如果微应用基于 icejs，则只需要将 build-plugin-icestark 的选项 `umd: true` 置为 `false` 即可）

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
