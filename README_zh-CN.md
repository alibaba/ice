[English](./README.md) | 简体中文

<p align="center">
  <a href="https://www.npmjs.com/package/ice.js"><img src="https://badgen.net/npm/dm/ice.js" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/ice.js"><img src="https://badgen.net/npm/v/ice.js" alt="Version"></a>
  <a href="/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="GitHub license" /></a>
  <a href="https://github.com/alibaba/ice/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" /></a>
  <a href="https://gitter.im/alibaba/ice"><img src="https://badges.gitter.im/alibaba/ice.svg" alt="Gitter" /></a>
</p>

> 基于 React 的渐进式研发框架

## 特性

- 🐒 **工程**：开箱即用的工程配置，支持 ES6+、TypeScript、样式方案（Less/Sass/CSS Modules）等
- 🦊 **路由**：默认使用配置式路由，同时支持约定式路由
- 🐯 **数据流**：内置集成 icestore，基于 React Hooks 的轻量级状态管理方案
- 🐦 **环境配置**：内置集成 config， 支持多环境变量的配置
- 🐶 **日志**：内置集成 logger，类似 `console.log` 的统一日志方案
- 🦁 **应用配置**：提供强大的和可扩展的应用程序配置
- 🐴 **Hooks**：提供 useModel、useHistory 等 Hooks API
- 🐌 **插件体系**：提供插件机制，可以扩展框架的核心功能
- 🐘 **TypeScript**：默认使用 TypeScript
- 🐂 **Modern**：支持 SPA、SSR、MPA、微前端等流行的应用类型

## 快速开始

### 使用 VS Code 可视化创建项目

我们推荐你安装 [AppWorks](https://marketplace.visualstudio.com/items?itemName=iceworks-team.iceworks)，然后通过该插件的引导进行项目的创建：

![使用示例](https://img.alicdn.com/imgextra/i3/O1CN01ZwcNtw1oJ1PhRkykl_!!6000000005203-2-tps-2406-1536.png_790x10000.jpg)

> 参考[《AppWorks 快速开始》](https://appworks.site/pack/quick-start)了解更多细节。

### 使用 CLI 创建项目

创建项目

```bash
$ npm init ice <project-name>
```

`npm init <initializer>` 需要 npm 6+ 版本

启动项目

```bash
$ cd <project-name>
$ npm install
$ npm run start # running on http://localhost:3333.
```

## 项目示例

- [hello-world](https://codesandbox.io/s/github/ice-lab/icejs/tree/master/examples/hello-world)
- [basic-spa](https://codesandbox.io/s/github/ice-lab/icejs/tree/master/examples/basic-spa)
- [basic-ssr](https://codesandbox.io/s/github/ice-lab/icejs/tree/master/examples/basic-ssr)
- [basic-mpa](https://codesandbox.io/s/github/ice-lab/icejs/tree/master/examples/basic-mpa)
- [basic-store](https://codesandbox.io/s/github/ice-lab/icejs/tree/master/examples/basic-store)
- [basic-request](https://codesandbox.io/s/github/ice-lab/icejs/tree/master/examples/basic-request)
- [icestark-child](https://codesandbox.io/s/github/ice-lab/icejs/tree/master/examples/icestark-child)
- [icestark-layout](https://codesandbox.io/s/github/ice-lab/icejs/tree/master/examples/icestark-layout)
- [with-fusion-design](https://codesandbox.io/s/github/ice-lab/icejs/tree/master/examples/with-fusion-design)

## 贡献代码

贡献代码请参考 [CONTRIBUTING.md](/.github/CONTRIBUTING.md)

## 生态

| Project    | Version                                | Docs                  | Description                    |
| ---------- | -------------------------------------- | --------------------- | ------------------------------ |
| [icejs]    | [![icejs-status]][icejs-package]       | [docs][icejs-docs]    | 基于 React 的企业级研发框架    |
| [icestark] | [![icestark-status]][icestark-package] | [docs][icestark-docs] | 面向大型应用的微前端解决方案   |
| [icestore] | [![icestore-status]][icestore-package] | [docs][icestore-docs] | 简单友好的轻量级状态管理方案   |
| [formily]  | [![formily-status]][formily-package]   | [docs][formily-docs]  | 能力完备性能出众的表单解决方案 |
| [ahooks]   | [![ahooks-status]][ahooks-package]     | [docs][ahooks-docs]   | React Hooks Library            |

[icejs]: https://github.com/ice-lab/icejs
[icestark]: https://github.com/ice-lab/icestark
[icestore]: https://github.com/ice-lab/icestore
[icejs-status]: https://img.shields.io/npm/v/ice.js.svg
[icestark-status]: https://img.shields.io/npm/v/@ice/stark.svg
[icestore-status]: https://img.shields.io/npm/v/@ice/store.svg
[icejs-package]: https://npmjs.com/package/ice.js
[icestark-package]: https://npmjs.com/package/@ice/stark
[icestore-package]: https://npmjs.com/package/@ice/store
[icejs-docs]: https://ice.work/docs/guide/intro
[icestark-docs]: https://ice.work/docs/icestark/guide/about
[icestore-docs]: https://github.com/ice-lab/icestore#icestore
[formily]: https://github.com/alibaba/formily
[formily-status]: https://img.shields.io/npm/v/@formily/react.svg
[formily-package]: https://npmjs.com/package/@formily/react
[formily-docs]: https://formilyjs.org/
[ahooks]: https://github.com/alibaba/hooks
[ahooks-status]: https://img.shields.io/npm/v/ahooks.svg
[ahooks-package]: https://npmjs.com/package/ahooks
[ahooks-docs]: https://ahooks.js.org

## 社区

| 钉钉群                                                                                                                                  | GitHub issues | Gitter   |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------- |
| <a href="https://ice.alicdn.com/assets/images/qrcode.png"><img src="https://ice.alicdn.com/assets/images/qrcode.png" width="150" /></a> | [issues]      | [gitter] |

[issues]: https://github.com/alibaba/ice/issues
[gitter]: https://gitter.im/alibaba/ice

## License

[MIT](/LICENSE)
