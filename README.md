[English](./README.en-US.md) | 简体中文

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
<a href="https://codecov.io/gh/alibaba/ice"><img src="https://img.shields.io/codecov/c/github/alibaba/ice/master.svg" alt="Test Coverage" /></a>
<a href="https://github.com/alibaba/ice/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" /></a>
<a href="https://gitter.im/alibaba/ice"><img src="https://badges.gitter.im/alibaba/ice.svg" alt="Gitter" /></a>

<div align="center">
  <img src="https://img.alicdn.com/tfs/TB1lMLdtXY7gK0jSZKzXXaikpXa-2763-1449.png" width="1000" />
</div>
</div>

## 特性

- :fire:**可视化开发**：通过 IDE 简化前端工程复杂度，同时通过适配器可接入不同的项目工程进行可视化管理，定制专属的前端工作台
- :100:**丰富的物料**：基于物料拼装提高项目开发效率，同时提供丰富的 React/Vue 物料
- :tophat:**最佳实践**：结合丰富的经验沉淀出的项目开发最佳实践，包括目录结构、开发调试、路由配置、状态管理等
- :whale:**自定义物料**：通过物料开发者工具快速开发构建私有物料体系

更多特性请参考站点 [ice.work](https://ice.work)。

## 快速开始

为了支持不同的用户群体，我们提供了 IDE 和 CLI 两种使用方式，具体如下：

#### 使用 IDE [推荐]

> 以 macOS 平台为例。

1. 下载 [iceworks IDE for macOS](https://iceworks.oss-cn-hangzhou.aliyuncs.com/mac/iceworks-setup.dmg)；
2. 双击下载的 .dmg 文件；
3. 拖动 iceworks 的图标到 `Applications` 文件夹；
4. 进入应用程序文件夹，双击 iceworks 启动；
5. 在 iceworks 的欢迎界面点击 `+` 号按钮开始创建项目。

#### 使用命令行工具

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
| [iceworks]     | [![iceworks-cli-status]][iceworks-cli-package] | [docs][iceworks-docs] |面向企业级中后台领域的 IDE|
| [ice-scripts] | [![ice-scripts-status]][ice-scripts-package] | [docs][ice-scripts-docs] |基于 webpack 的高可配置开发构建工具|
| [icestore] | [![icestore-status]][icestore-package] | [docs][icestore-docs] |基于 React Hooks 的轻量级状态管理方案|
| [icestark] | [![icestark-status]][icestark-package] | [docs][icestark-docs] |面向大型应用的微前端解决方案|
| [react-materials] | / | [docs][react-materials-docs] |由官方提供的丰富的高质量 React 物料|
| [vue-materials] | / | [docs][vue-materials-docs] |由社区维护的高质量 Vue 物料|

[iceworks]: https://github.com/alibaba/ice
[ice-scripts]: https://github.com/ice-lab/ice-scripts
[icestore]: https://github.com/ice-lab/icestore
[icestark]: https://github.com/ice-lab/icestark
[react-materials]: https://github.com/ice-lab/react-materials
[vue-materials]: https://github.com/ice-lab/vue-materials

[iceworks-cli-status]: https://img.shields.io/npm/v/iceworks.svg
[ice-scripts-status]: https://img.shields.io/npm/v/ice-scripts.svg
[icestore-status]: https://img.shields.io/npm/v/@ice/store.svg
[icestark-status]: https://img.shields.io/npm/v/@ice/stark.svg

[iceworks-cli-package]: https://npmjs.com/package/iceworks
[ice-scripts-package]: https://npmjs.com/package/ice-scripts
[icestore-package]: https://npmjs.com/package/@ice/store
[icestark-package]: https://npmjs.com/package/@ice/stark

[vue-materials-docs]: https://ice.work/block?type=vue
[react-materials-docs]: https://ice.work/scaffold
[iceworks-docs]: https://ice.work/docs/iceworks/about
[ice-scripts-docs]: https://ice.work/docs/cli/about
[icestark-docs]: https://ice.work/docs/icestark/guide/about
[icestore-docs]: https://github.com/ice-lab/icestore#icestore

## 贡献代码

参考文档 [CONTRIBUTING.md](/.github/CONTRIBUTING.md)

## 社区

| 钉钉群                               | GitHub issues |  Gitter |
|-------------------------------------|--------------|---------|
| <a href="https://ice.alicdn.com/assets/images/qrcode.png"><img src="https://ice.alicdn.com/assets/images/qrcode.png" width="150" /></a> | [issues]     | [gitter]|

[issues]: https://github.com/alibaba/ice/issues
[gitter]: https://gitter.im/alibaba/ice

## License

[MIT](/LICENSE)
