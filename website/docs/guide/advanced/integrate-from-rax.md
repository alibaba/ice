---
title: 从 Rax App 迁移
order: 0901
---

本文档面向的是使用 Rax App 的开发者，提供迁移到 ice.js 的方式。React 的社区生态显著优于 Rax，切换到 React 之后可以享受到更多的 React 生态，复用复杂场景（富文本、脑图等）社区生态可以大幅度降低成本。

## ice.js 与 Rax App 的差异

ice.js 和 Rax App 都是应用研发框架，它们默认使用的 UI Framework 不同，前者使用 React，而后者使用 rax.js。但是在 ice.js 3.x 中，你可以使用 [Rax 兼容模式](./rax-compat.md)来运行 Rax 组件。

核心差异包括：
- 路由差异
- 构建配置差异
- 运行时配置差异

## Rax App 项目迁移

对于之前使用 Rax App 的用户，我们提供了项目自动化迁移工具 [rax-migrate](https://www.npmjs.com/package/rax-migrate)，它可以辅助平滑迁移大部分工程配置，一些无法自动迁移的功能需要用户手动确认。

### 安装

```bash
$ npm i rax-migrate -g
```

### 使用

命令行进入 rax-app 工程（如工程名为 rax-project）所在的目录，通过运行 `rax-migrate` 可生成对应配置的同目录下的 ice.js 工程。

```bash
$ rax-migrate transform ./rax-project 
```

### 注意⚠️

该工具不是全自动迁移工具，部分功能点无法自动迁移，需要用户手动确认以及迁移，包括但不限于：

* webpack 插件
* 无法完全匹配的工程配置
* rax-migrate 的 warning 以及 error 输出
* ...
