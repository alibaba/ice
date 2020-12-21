---
title: 版本升级
order: 3
---

## 1.x -> 2.x

> icestark@2.0.0 于 2020 年 12 月发布，[Changelog](https://github.com/ice-lab/icestark/releases/tag/v2.0.0)

- 支持以 API 的方式初始化主应用，主应用不再限制 React/Vue/Angular 等不同框架
- 支持加载 UMD 格式的子应用产物

注意：`@ice/stark` 2.0.0 完全兼容 1.0.0 版本的 API，因此主应用可以非常低成本的升级 2.0.0 版本。

### 主应用升级

存量 1.x 的应用将 `@ice/stark` 升级到 2.x 最新版本即可，AppRouter 注册方式同 1.x 完全兼容。

### 不同版本混用

微应用本身不依赖 `@ice/stark` 的版本变化，原先通过 `registerAppEnter` 和 `registerAppLeave` 方式注册生命周期的方式，均可以在 1.x 和 2.x 版本下运行。

增量的微应用推荐通过 UMD 的规范导出，如需渲染 UMD 格式的微应用，需要将主应用中 `@ice/stark` 升级到 2.0.0 (或者 1.6.0)，同时在应用列表中显示声明 umd：

`AppRoute` API 渲染 UMD 规范的子应用：
 
```diff
<AppRoute
+  umd={true}
  path="/seller"
  title="标题"
  url={[]}
/>
```

`regsiterMicroApps` API 渲染 UMD 规范的子应用：

```diff
regsiterMicroApps([
  {
    name: 'app1',
    activePath: ['/seller'],
+    umd: true
    title: '通用页面',
    url: [],
  }
]);
```

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
