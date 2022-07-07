---
title: 关于
order: 1
---

![cover](https://gw.alicdn.com/tfs/TB1vBRYaVOWBuNjy0FiXXXFxVXa-2558-1306.jpg)

飞冰 (ICE) 是一套基于 React 的前端解决方案，围绕应用研发框架 (ICE 3) 提供了应用的构建、路由、调试等基础能力以及微前端、一体化等领域能力，同时结合可视化操作、物料复用等方案降低研发门槛。

## 特性 🎉

- 🐒 开箱即用：TypeScript/Webpack5/CSS Modules/Mock/SSR，各种方案 All in One
- 🦊 贴合业务的最佳实践：目录规范、代码规范、路由方案、状态管理、数据请求等
- 🐯 多种应用模式：支持服务端渲染 SSR 以及静态构建 SSG
- 🐦 强大的插件能力：官方所有能力都通过插件实现，业务可以通过插件扩展各种能力
- 🐘 丰富的领域方案：微前端 ICESTARK、一体化方案等

在应用框架之上，我们还提供了 NPM 包开发工具 [ICE PKG](https://pkg.ice.work)：

- 提供 React 组件开发、Node.js 模块开发、前端通用库等[多场景需求](https://pkg.ice.work/scenarios/component)
- 组件开发提供基础研发范式，提供组件文档、示例、预览等功能，[查看文档](https://pkg.ice.work/guide/preview)
- 更多场景可以通过插件的方式完成定制，查看[插件开发](https://pkg.ice.work/reference/plugins-development)

你也可以搭配 VS Code 插件 AppWorks 享受到更多功能：

- 通过大量的官方模板（fusion/antd）可视化创建项目，[查看更多](https://appworks.site/materialCenter/react.html)
- 基于 VS Code 插件可视化的调试、管理依赖、拼装区块等，[查看文档](https://appworks.site)
- 业务可以根据规范定制自己的物料体系（含项目模板），[查看物料开发文档](https://appworks.site/materials/about.html)
- ……

## 常见问题 📝

### 与直接使用 Webpack 相比，使用 ICE 有什么优势？

Webpack 只提供了基础的构建能力，ICE 在此基础上扩展了很多能力：

- 默认集成好的框架能力，无需再引入繁冗的构建插件和配置
- 不止是构建，更有面向业务领域的最佳实践，如路由、目录组织、状态管理等
- 让很多业务接入成本高的能力可以开箱即用，如 SSR/SSG、微前端、一体化，基于原始的 Webpack 建设这些能力需要付出很高成本
- 通过插件化让以上这些能力可以被扩展以及跨项目复用，尽可能保证不同项目的一致性

### 我正在使用 icejs (ICE 2)，需要升级到 ICE 3 吗？

ICE 3 相比之前的版本，增加了更多对移动端能力的优化和适配，同时提升了页面性能体验。对于新项目推荐 ICE 3 进行开发，对于历史项目原先的 icejs 依然是可用的，并且我们仍会持续修复已知的问题。

如果你的页面会同时运行在移动端和桌面端，使用 ICE 3 可能会是更好的选择，亦或者是你对 ICE 3 提供的更新的构建工具链、更优更多的解决方案感兴趣，你都可以选择升级到 ICE 3。

### 使用飞冰 (ICE) 是否需要具备一定的前端基础？

毫无疑问是需要的，同时我们也在努力降低前端开发的门槛，但一些基础的前端知识还是需要具备的，比如 JavaScript 的基础语法、前后端如何通信等。为了便于快速入门前端知识，我们整理了一份 [前端基础知识](https://ice.work/docs/resource/front-basic)，希望能帮助到开发者。

### 资深前端同学是否适合使用飞冰？

适合，面向前端场景飞冰团队有大量的最佳实践，无论是构建、规范、状态管理还是微前端都可以开箱即用。

### 飞冰的浏览器兼容策略是怎样的？

应用框架 ICE 默认使用的是 React 18，你可以查看 React 18 官方说明[对 JavaScript 环境的要求](https://zh-hans.reactjs.org/docs/javascript-environment-requirements.html)。如果你支持旧的浏览器和设备，可能需要引入对应的 Polyfill。

此外，飞冰官方 React 物料默认使用 React 16+ 进行开发，所以通常情况下这些物料在 ICE 中是可以正常运行的，如果你遇到任何问题，也可以通过 [Issue](https://github.com/alibaba/ice/issues) 或其它方式反馈给我们。

### 飞冰可以使用哪些 UI 组件？

飞冰的应用框架和工具都不耦合 UI 组件，因此开发者可以选择任意的 React UI 组件使用，比如 Fusion/Antd 等。

### 飞冰跟低代码方案有什么关系？

低代码方案一般指以可视化拖拽搭建为主，少量地方使用代码辅助，此类方案往往是面向具体领域而非通用场景的，飞冰是面向通用领域的，以源码研发为主，通过框架、物料、GUI 操作等能力降低研发门槛，因此飞冰并不是通俗意义的低代码方案。

## 联系我们 🧼

- 反馈/建议：<https://github.com/alibaba/ice/issues/new>
- 答疑钉钉群：

<img src="https://ice.alicdn.com/assets/images/qrcode.png" width="300px" align="left"/>
