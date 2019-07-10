---
title: 物料模板规范
order: 1
---

## 组件规范

- 构建时支持将预览服务构建为静态 html、js、css 文件存放于 `build/` 目录

### package.json

组件的 package.json 模版（即组件模版的 `_package.json` 文件）需满足以下功能：

- 模版化 `name`、`version`、`description`、`componentConfig` 字段，以便 ice-devtools 动态写入
- files 至少包含 `build/`，这个目录存放着文档静态预览文件
- 包含 `componentConfig` 字段，描述组件的 name、title 及 category

```JSON
{
  "name": "<%= npmName %>",
  "version": "<%= version %>",
  "description": "<%= description %>",
  "files": [
    "demo/",
    "lib/",
    "build/"
  ],
  "main": "lib/index.js",
  "stylePath": "style.js",
  "scripts": {
    "start": "ice-scripts dev",
    "build": "ice-scripts build",
    "prepublishOnly": "npm run build"
  },
  "keywords": [],
  "dependencies": {
    // more dependencies...
  },
  "componentConfig": {
    "name": "<%= name %>",
    "title": "<%= title %>",
    "category": "<%- category %>"
  }
}
```

## 区块规范

- 源码在 `src/` 目录下
- 支持 devServer 预览服务，构建时支持将预览服务构建为静态 html、js、css 文件存放于 `build/` 目录

### package.json

区块的 package.json 模版（即区块模版的 `_package.json` 文件）需满足以下功能：

- 模版化 `name`、`version`、`description`、`blockConfig` 字段，以便 ice-devtools 动态写入
- files 至少包含 `build/` 和 `src/` 目录及 `screenshot.png` 文件，`build/` 存放着文档静态文件，`src/` 则是 js 源码模块，`screenshot.png` 是该区块的截图
- 包含 `blockConfig` 字段，描述区块的 name、title 及 category

```json
{
  "name": "<%= npmName %>",
  "version": "<%= version %>",
  "description": "<%= description %>",
  "files": [
    "src/",
    "build/",
    "screenshot.png"
  ],
  "scripts": {
    "start": "ice-scripts dev",
    "build": "ice-scripts build",
    "screenshot": "screenshot -l -s \\#mountNode",
    "prepublishOnly": "npm run build && npm run screenshot"
  },
  "dependencies": {
    // more dependencies...
  },
  "blockConfig": {
    "name": "<%= name %>",
    "title": "<%= title %>",
    "category": "<%- category %>"
  }
}
```

## 项目规范

- 源码在 `src/` 目录下
- 支持 devServer 预览服务，构建时支持将项目构建为静态 html、js、css 文件存放于 `build/` 目录

### routerConfig.js

在项目中，路由是按照一定的约定进行配置，用来描述路由的结构关系。路由主要分为【路由配置】和【路由生成】两部分：

- 路由配置：在 `src/routerConfig.js` 中配置路由
- 路由生成：在 `src/router.js` 中生成路由

这样设计的目的主要是分离路由配置信息和路由生成部分，配置和生成进行解耦，有利于在新增路由时只需要关注路由配置，除了顶层路由，其余路由列表都是自动生成，其中关键的就是中心化配置文件 `src/routerConfig.js`，它的主要作用是：

- 配置路由相关信息，可以配置对应路由的路径，渲染组件，权限，布局等字段
- 根据路由配置生成路由数据，并将路由数据挂载到每条路由对应的组件上
- 约定后的路由数据结构本质上是一份固定的数据协议，在 iceworks 新增页面时，也会按照约定的格式写入路由信息

一般情况下，`routerConfig.js` 内容由 iceworks 生成，用户无需关心，**也不建议开发者直接编辑该文件**。

### menuConfig.js

与 `routerConfig.js` 类似，在项目中，菜单也按照一定的约定进行配置，用来描述菜单栏的结构关系。菜单信息配置在 `src/menuConfig.js` 中，这样设计的目的主要有以下几点：

- 菜单配置包含 `headerMenuConfig` 和 `asideMenuConfig` 两种形式，`headerMenuConfig` 用于顶部导航的渲染，`asideMenuConfig` 用于侧边栏导航的渲染，这样方便在统一的位置管理应用的导航信息
- 约定后的菜单数据结构本质上是一份固定的数据协议，在 Iceworks 新增页面时，也会按照约定的格式写入菜单信息

同样的，`menuConfig.js` 内容由 iceworks 生成，用户无需关心，**也不建议开发者直接编辑该文件**。

### package.json

组件的 package.json 模版（即组件模版的 `_package.json` 文件）需满足以下功能：

- 模版化 `name`、`version`、`description`、`scaffoldConfig` 字段，以便 ice-devtools 动态写入
- files 至少包含 `build/`、`src/` 目录及 `screenshot.png`、`_gitignore` 文件
- 包含 `scaffoldConfig` 字段，描述项目的 name、title、builder（构建方式）及 category
- 包含 `iceworks` 字段，描述 type（前端框架类型）

```json
{
  "name": "<%= npmName %>",
  "version": "<%= version %>",
  "description": "<%= description %>",
  "files": [
    "src/",
    "build/",
    "public/",
    "tests/",
    "_gitignore",
    ".editorconfig",
    ".eslintignore",
    ".eslintrc",
    ".eslintrc",
    "screenshot.png"
  ],
  "scripts": {
    "start": "ice-scripts dev",
    "build": "ice-scripts build",
    "screenshot": "screenshot -l",
    "prepublishOnly": "npm run build && npm run screenshot"
  },
  "dependencies": {
    // more dependencies...
  },
  "scaffoldConfig": {
    "builder": "ice-scripts",
    "name": "<%= name %>",
    "title": "<%= title %>",
    "category": "<%- category %>"
  },
  "iceworks": {
    "type": "react",
  }
}
```
