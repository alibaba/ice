[English](./README.md) | 简体中文

<p align="center">
  <a href="https://www.npmjs.com/package/ice.js"><img src="https://badgen.net/npm/dm/ice.js" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/ice.js"><img src="https://badgen.net/npm/v/ice.js" alt="Version"></a>
  <a href="/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="GitHub license" /></a>
  <a href="https://github.com/alibaba/ice/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" /></a>
  <a href="https://gitter.im/alibaba/ice"><img src="https://badges.gitter.im/alibaba/ice.svg" alt="Gitter" /></a>
</p>

> 基于 React.js 的通用框架

## 特性

- 🐒 **工程**：开箱即用的工程配置，支持 ES6+、TypeScript、样式方案（Less/Sass/CSS Modules）等
- 🦊 **路由**：默认使用配置式路由，同时支持约定式路由
- 🐯 **数据流**：内置集成 icestore，基于 React Hooks 的轻量级状态管理方案
- 🐶 **日志**：内置集成 logger，类似 `console.log` 的统一日志方案
- 🐱 **工具函数**：内置集成 helper，提供常用的工具函数
- 🦁 **应用配置**：内置集成 config，支持多环境配置
- 🐴 **Hooks**：提供应用级别 useApp 和页面级别 usePage 等 Hooks API
- 🐌 **插件体系**：提供插件机制，可以扩展框架的核心功能
- 🐘 **typescript**：默认使用 typescript 
- 🐂**Modern**：支持 SPA、SSR、MPA、微前端等流行的应用类型

## 快速开始

创建项目

```bash
$ npm init ice <YourProjectName>
```

`npm init <initializer>` 需要 npm 6+ 版本

启动项目

```bash
$ cd <YourProjectName>
$ npm install
$ npm run start
```

## 贡献代码

```bash
# 1. clone and setup
$ git clone git@github.com:ice-lab/icejs.git
$ cd icejs && npm run setup

# 2. watch packages
$ npm run watch

# 3. run example
$ cd examples/spa-basic
$ npm link ../../packages/icejs
$ npm start
```

贡献代码请参考 [CONTRIBUTING.md](/.github/CONTRIBUTING.md)

## 生态

|    Project         |    Version                                 |     Docs    |   Description       |
|----------------|-----------------------------------------|--------------|-----------|
| [icejs] | [![icejs-status]][icejs-package] | [docs][icejs-docs] |A universal framework based on react.js|
| [iceworks]     | [![iceworks-cli-status]][iceworks-cli-package] | [docs][iceworks-docs] |One-stop visual source code development workbench based on materials|
| [icestark] | [![icestark-status]][icestark-package] | [docs][icestark-docs] |Micro Frontends solution for large application|
| [icestore] | [![icestore-status]][icestore-package] | [docs][icestore-docs] |Lightweight state management solution based on React Hooks|

[icejs]: https://github.com/ice-lab/icejs
[iceworks]: https://github.com/alibaba/ice
[icestark]: https://github.com/ice-lab/icestark
[icestore]: https://github.com/ice-lab/icestore

[icejs-status]: https://img.shields.io/npm/v/icejs.svg
[iceworks-cli-status]: https://img.shields.io/npm/v/iceworks.svg
[icestark-status]: https://img.shields.io/npm/v/@ice/stark.svg
[icestore-status]: https://img.shields.io/npm/v/@ice/store.svg

[icejs-package]: https://npmjs.com/package/ice.js
[iceworks-cli-package]: https://npmjs.com/package/iceworks
[icestark-package]: https://npmjs.com/package/@ice/stark
[icestore-package]: https://npmjs.com/package/@ice/store

[icejs-docs]: https://ice.work/docs/icejs/about
[iceworks-docs]: https://ice.work/docs/iceworks/about
[icestark-docs]: https://ice.work/docs/icestark/guide/about
[icestore-docs]: https://github.com/ice-lab/icestore#icestore

## 社区

| 钉钉群                               | GitHub issues |  Gitter |
|-------------------------------------|--------------|---------|
| <a href="https://ice.alicdn.com/assets/images/qrcode.png"><img src="https://ice.alicdn.com/assets/images/qrcode.png" width="150" /></a> | [issues]     | [gitter]|

[issues]: https://github.com/alibaba/ice/issues
[gitter]: https://gitter.im/alibaba/ice

## License

[MIT](/LICENSE)
