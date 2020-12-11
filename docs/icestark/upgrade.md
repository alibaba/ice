---
title: 版本升级
order: 3
---

## 1.x -> 2.x

> icestark@2.0.0 于 2020 年 12 月发布，[Changelog](https://github.com/ice-lab/icestark/releases/tag/v2.0.0)

- 支持以 API 的方式初始化框架应用，让不同技术栈架构（React/Vue/Angular）的框架应用都可以快速接入 icestark 架构
- 支持加载 UMD 格式的子应用产物

### 子应用升级


### 框架应用升级


### 迁移步骤

存量 1.x 的应用将 `@ice/stark` 升级到 2.x 最新版本即可，AppRouter 注册方式同 1.x 完全兼容。

## 不同版本混用情况

微应用本身不依赖 `@ice/stark` 的版本变化，原先通过 `registerAppEnter` 和 `registerAppLeave` 方式注册生命周期的方式，均可以在 1.x 和 2.x 版本下运行。
基于微应用标准的支持，增量微应用模版的打包方式将变更为 UMD 的打包方式。

## 1.x 框架应用加载 UMD 微应用

`@ice/stark@1.6.0` 版本开始支持加载 UMD 标准微应用，在配置上指定以 UMD 方式加载模块：

```js
...

<AppRoute
  umd
  path="/seller"
  title="标题"
  url={[
    '//ice.alicdn.com/icestark/child-seller-react/index.js',
    '//ice.alicdn.com/icestark/child-seller-react/index.css',
  ]}
/>
...
```

## 2.x 框架应用加载 UMD 微应用

2.x 同样支持加载 UMD 应用，通过 `AppRoute` 配置方式同 1.x 版本相同，API 方式注册如下：

```js
regsiterMicroApps([
  {
    name: 'app1',
    activePath: ['/seller'],
    umd: true
    title: '通用页面',
    container: document.getElementById('icestarkNode'),
    url: ['//ice.alicdn.com/icestark/child-seller-react/index.js'],
  }
]);
```

## 0.x -> 1.x

> icestark@1.0.0 于 2019 年 10 月发布，[Changelog](https://github.com/ice-lab/icestark/releases/tag/v1.0.0(2019-10-14))

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
