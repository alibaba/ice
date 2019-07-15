<p align="center">
  <a href="https://ice.work">
    <img alt="飞冰（ICE）" src="https://img.alicdn.com/tfs/TB1gOdQRCrqK1RjSZK9XXXyypXa-192-192.png" width="96">
  </a>
</p>

<h1 align="center">飞冰（ICE）</h1>

<div align="center">

简单而友好的前端研发体系

<a href="/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="GitHub license" /></a>
<a href="https://travis-ci.org/alibaba/ice"><img src="https://travis-ci.org/alibaba/ice.svg?branch=master" alt="Build Status" /></a>
<a href="https://github.com/alibaba/ice/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" /></a>
<a href="https://gitter.im/alibaba/ice"><img src="https://badges.gitter.im/alibaba/ice.svg" alt="Gitter" /></a>

</div>

![iceworks](https://img.alicdn.com/tfs/TB1khHTaX67gK0jSZPfXXahhFXa-7310-4970.png)

[English](./README.en-US.md) | 简体中文

## 特性

- :fire:**可视化开发**：通过 GUI 操作简化前端工程复杂度，同时通过适配器可接入不同的项目工程进行可视化管理，定制专有的前端工作台
- :100:**丰富的物料**：基于物料拼装提高项目开发效率，同时提供丰富的 React/Vue 物料
- :tophat:**最佳实践**：结合丰富的经验沉淀出的项目开发最佳实践，包括目录结果、开发调试、路由配置、状态管理等
- :whale:**自定义物料**：通过物料开发者工具快速开发构建私有物料体系

更多特性请参考站点 [ice.work](https://ice.work)。

## 快速开始

为了支持不同的用户群体，我们提供了 Web 界面和 CLI 两种使用方式，具体如下：

#### Web 界面 [推荐]

```bash
# 安装 CLI 工具
$ npm install iceworks -g

# 通过浏览器打开页面
$ iceworks  # 通过浏览器打开 http://127.0.0.1:8000
```

#### 命令行工具

```bash
# 安装 CLI 工具
$ npm install iceworks -g

# 新建目录
$ mkdir iceapp & cd iceapp

# 通过模板初始化项目
$ iceworks init
```

## 生态

|    项目         |    版本                                 |     文档    |   描述       |
|----------------|-----------------------------------------|--------------|-----------|
| [iceworks]     | [![iceworks-cli-status]][iceworks-cli-package] | [docs][iceworks-docs] |基于物料的一站式可视化源码研发工作台|
| [ice-devtools] | [![ice-devtools-status]][ice-devtools-package] | [docs][ice-devtools-docs] |物料开发工具，支持 React&Vue|
| [ice-scripts] | [![ice-scripts-status]][ice-scripts-package] | [docs][ice-scripts-docs] |基于 webpack 的高可配置开发构建工具|
| [icestore] | [![icestore-status]][icestore-package] | [docs][icestore-docs] |基于 React Hooks 的轻量级状态管理方案|
| [icestark] | [![icestark-status]][icestark-package] | [docs][icestark-docs] |面向大型应用的微前端解决方案|
| [react-materials] | / | [docs][react-materials-docs] |由官方提供的丰富的高质量 React 物料|
| [vue-materials] | / | [docs][vue-materials-docs] |由社区维护的高质量 Vue 物料|

[iceworks]: https://github.com/alibaba/ice
[ice-devtools]: https://github.com/ice-lab/ice-devtools
[ice-scripts]: https://github.com/ice-lab/ice-scripts
[icestore]: https://github.com/ice-lab/icestore
[icestark]: https://github.com/ice-lab/icestark
[react-materials]: https://github.com/ice-lab/react-materials
[vue-materials]: https://github.com/ice-lab/vue-materials

[iceworks-cli-status]: https://img.shields.io/npm/v/iceworks-cli.svg
[ice-devtools-status]: https://img.shields.io/npm/v/ice-devtools.svg
[ice-scripts-status]: https://img.shields.io/npm/v/ice-scripts.svg
[icestore-status]: https://img.shields.io/npm/v/@ice/store.svg
[icestark-status]: https://img.shields.io/npm/v/@ice/stark.svg

[iceworks-cli-package]: https://npmjs.com/package/iceworks-cli
[ice-devtools-package]: https://npmjs.com/package/ice-devtools
[ice-scripts-package]: https://npmjs.com/package/ice-scripts
[icestore-package]: https://npmjs.com/package/@ice/store
[icestark-package]: https://npmjs.com/package/@ice/stark

[vue-materials-docs]: https://ice.work/block?type=vue
[react-materials-docs]: https://ice.work/scaffold
[iceworks-docs]: https://ice.work/docs/iceworks/about
[ice-devtools-docs]: https://ice.work/docs/materials/about
[ice-scripts-docs]: https://ice.work/docs/cli/about
[icestark-docs]: https://github.com/ice-lab/icestark#icestark
[icestore-docs]: https://github.com/ice-lab/icestore#icestore

## 贡献代码

参考文档 [CONTRIBUTING.md](/.github/CONTRIBUTING.md)

## 社区

| 钉钉群                               | GitHub issues |  Gitter |
|-------------------------------------|--------------|---------|
|<img src="https://ice.alicdn.com/assets/images/qrcode.png" width="150" /> | [issues]     | [gitter]|

[issues]: https://github.com/alibaba/ice/issues
[gitter]: https://gitter.im/alibaba/ice

## License

[MIT](/LICENSE)
