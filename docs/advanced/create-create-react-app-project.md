---
title: 使用 Iceworks 创建 create-react-app 的项目
order: 7
category: 进阶指南
---

飞冰默认使用 [ice-scripts](https://github.com/alibaba/ice/tree/master/tools/ice-scripts) 作为开发工具，但是如果你想使用社区的 [create-react-app](https://github.com/facebook/create-react-app) 开发项目，我们也在 Iceworks 里提供了基于 create-react-app 的模板，支持按需引入飞冰基础组件，添加区块等能力。

## 初始化项目

在 Iceworks 模板界面选择 create-react-app 模板，以该模板创建项目

![Iceworks](https://img.alicdn.com/tfs/TB1GTwcm7yWBuNjy0FpXXassXXa-1908-1368.png)

## 预览

创建项目后，可以在 Iceworks 项目界面启动调试服务, 会自动打开浏览器窗口，看到如下页面说明创建项目成功

![create-react-app](https://img.alicdn.com/tfs/TB1u1gxm1uSBuNjy1XcXXcYjFXa-1768-1064.png)

## 添加区块

使用 Iceworks create-react-app 模板创建的项目与官方 create-react-app 模板基本保持一致，不同的点在于使用了 react-app-rewired 进行自定义配置，支持按需引入 ICE 基础组件，目录结构如下：

### 目录结构

```
.
├── README.md
├── .gitignore
├── config-overrides.js
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── rewire-scss.js
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── registerServiceWorker.js
```

### 添加区块

通过 Iceworks 新建页面添加的区块默认会在项目 `src` 下新建 `pages` 目录，用于存放添加的区块，如添加一个 TabTable 区块后，目录结构如下：

```
.
└── src
    ├── pages/     // 新增 pages 目录
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── registerServiceWorker.js
```

使用 create-react-app 模板创建的项目默认只支持添加区块；接下来，可以按照你熟悉的开发方式自定义开发。
