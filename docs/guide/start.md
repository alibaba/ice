---
title: 快速创建开发一个 React 项目
order: 2
---

飞冰（ICE）本身不限定使用 React/Vue 或其他前端框架，只要选择对应的物料源即可。但是相比其他框架，我们在 React 领域有更多的沉淀，因此整个创建及后续的开发流程都会以 React 为例，其他框架相关知识可自行查看对应文档。

## 使用 GUI 方式创建项目

> iceworks@3.0 版本已经发布，欢迎[使用](https://github.com/alibaba/ice/issues/2369)

[iceworks](/iceworks) 是一个通过 CLI 方式启动的 GUI 开发工具，我们希望通过 iceworks 屏蔽前端工程环境的复杂度，让开发者可以零配置的开始一个项目，详细请参考 [《iceworks 快速开始》](/docs/guide/start) 章节。

## 使用 CLI 方式创建项目

### 1. 安装 CLI 工具

```bash
$ npm i -g iceworks
$ iceworks --help
```

### 2. 初始化项目

```bash
$ mkdir ice-project
$ cd ice-project
$ iceworks init
# 或者基于指定模板创建项目
$ iceworks init <npmName>
```

执行命令后根据需求选择对应模板即可完成项目的创建

### 3. 项目调试

```bash
# 安装依赖，也可使用 yarn
$ npm install
# 启动调试服务
$ npm run start
```

接着通过代码编辑器编写代码就可以在浏览器中看到效果。

### 4. 项目构建

```bash
# 启动调试服务
$ npm run build
```

执行完成后会在 `build` 目录下生成 `js/index.js` 和 `css/index.css` 文件，只需要在对应 HTML 中引入这两个文件即可渲染出页面。
