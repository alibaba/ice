---
title: 从 0.x 版本迁移
order: 2
---

本文介绍使用 icestark@0.x 的项目如何迁移到 1.0 版本。

## 为什么升级 1.0

- icestark 目前的 api 基本稳定，能够满足 BrowserHistory 的使用场景
- 我们将子应用使用的 api 从 [@ice/stark](https://www.npmjs.com/package/@ice/stark) 抽离出来，单独封装成了 [@ice/stark-app](https://www.npmjs.com/package/@ice/stark-app) ，产生了不兼容升级

## 为什么要将子应用的 api 单独拆出来

- api 非常稳定，不必随着主包频繁更新
- api 不依赖 react 体系，兼容性更强，在 vue、angular、jQuery 等体系下都能正常使用
- 包拆分后，包的职责更清晰，框架应用、子应用的引用结构更加合理

## 手动迁移

框架应用不需要变更，因此这里只介绍子应用的迁移

### 删除 package.json -> dependencies 中的 @ice/stark 依赖

### 安装 @ice/stark-app

```bash
$ npm i @ice/stark-app --save
```

### 批量替换代码中 @ice/stark 为 @ice/stark-app

## 以下 api 从 [@ice/stark](https://www.npmjs.com/package/@ice/stark) 迁移到 [@ice/stark-app](https://www.npmjs.com/package/@ice/stark-app)

- getMountNode
- renderNotFound
- getBasename
- appHistory (此 api 两个包中共存)
- registerAppLeave (新增)