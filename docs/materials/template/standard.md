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
