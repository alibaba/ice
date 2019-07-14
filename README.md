<p align="center">
  <a href="https://ice.work">
    <img alt="飞冰（ICE）" src="https://img.alicdn.com/tfs/TB1gOdQRCrqK1RjSZK9XXXyypXa-192-192.png" width="96">
  </a>
</p>

<p align="center">
  <a href="/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="GitHub license" /></a>
  <a href="https://travis-ci.org/alibaba/ice"><img src="https://travis-ci.org/alibaba/ice.svg?branch=master" alt="Build Status" /></a>
  <a href="https://github.com/alibaba/ice/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" /></a>
  <a href="https://gitter.im/alibaba/ice"><img src="https://badges.gitter.im/alibaba/ice.svg" alt="Gitter" /></a>
</p>

---

简单而友好的前端研发体系，通过 iceworks 支持项目的可视化开发调试，同时为开发者提供丰富的物料选择以及项目最佳实践，降低前端研发门槛同时不断提高研发效率。

## 特性

- **可视化开发**：通过 GUI 方式简化前端工程复杂度，同时可通过适配器支持不同的项目类型
- **丰富的物料**：基于物料拼装提高项目开发效率，同时提供丰富的 React/Vue 物料
- **最佳实践**：结合丰富的经验沉淀出的项目开发最佳实践，包括目录结果、开发调试、路由配置、状态管理等
- **自定义物料**：通过工具可快速开发&使用公司自定义的物料体系

更多特性请参考站点 [ice.work](https://ice.work)。

## 快速开始

为了支持不同的用户群体，我们提供了 Web 界面以及 CLI 两种使用方式，具体如下：

#### 浏览器打开页面

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

# 安装项目依赖
$ npm install

# 本地开发调试
$ npm start
```

## 生态

|    项目         |    版本                                 |     文档    |   描述       |
|----------------|-----------------------------------------|--------------|-----------|
| [iceworks]     | [![iceworks-cli-status]][iceworks-cli-package] | [iceworks-docs] |通过 GUI+物料提效项目开发的工具|
| [ice-devtools] | [![ice-devtools-status]][ice-devtools-package] | [ice-devtools-docs] |物料开发工具|
| [ice-scripts] | [![ice-scripts-status]][ice-scripts-package] | [ice-scripts-docs] |React 体系的开发调试工具|
| [icestore] | [![icestore-status]][icestore-package] | [icestore-docs] |基于 React Hooks 的状态管理方案|
| [icestark] | [![icestark-status]][icestark-package] | [icestark-docs] |面向大型系统的微前端解决方案|
| [react-materials] | / | [react-materials-docs] |由官方维护的高质量丰富的 React 物料|
| [vue-materials] | / | [vue-materials-docs] |由社区维护的高质量 Vue 物料        |

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
|<img src="https://ice.alicdn.com/assets/images/qrcode.png" width="100" /> | [issues]     | [gitter]|

[issues]: https://github.com/alibaba/ice/issues
[gitter]: https://gitter.im/alibaba/ice

## License

[MIT](/LICENSE)