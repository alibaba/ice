---
title: 组件模版规范
order: 4
---

## React 组件

ICE React 组件的文件结构如下所示，其中，`build/` 和 `lib/` 目录为构建时生成。React 组件需满足如下文件及构建产物。

```bash
component
  ├── demo                    // 【必选】组件文档，用于生成组件开发预览，以及生成组件文档
  │   └── basic.md
  ├── build                   // 【必选】组件预览服务的静态资源，构建后生成
  │   └── index.html
  │   └── indes.js
  │   └── indes.css
  ├── lib                     // 【必选】组件编译后的文件，构建后生成
  │   ├── index.js            // 【必选】src/index.js 编译生成
  │   ├── style.js            // 【必选】自动生成，引入 main.scss 以及依赖组件的 style.js
  │   ├── main.scss           // 【必选】src/main.scss 编译生成
  │   └── index.scss          // 【必选】自动生成，包含组件自身样式，以及依赖组件样式，正常情况下不需要
  ├── src                     // 【必选】组件源码
  │   ├── index.js            // 【必选】组件出口文件
  │   └── main.scss           // 【必选】仅包含组件自身样式的源码文件
  ├── README.md               // 【必选】组件说明及API
  ├── ice.config.js           // 【可选】ice-scripts 工程配置，根据组件的 React 工程工具不同而有所区别
  └── package.json            // 【必选】
```

**强烈建议 React 组件使用 ice-scripts 工具进行开发**，ice-scripts 提供了对 React 组件构建产物配置及 markdonw 解析，只需使用 ice-scripts 官方提供的 [ice-plugin-component](https://ice.work/docs/cli/plugin-list/component) 插件即可。

若使用其他 React 工程工具，则需满足以下特点：

- 支持 devServer 预览服务，构建时支持将预览服务构建为静态 html、js、css 文件存放于 `build/` 目录
- 支持 jsx 语法编译为 ES5 语法存放于 `lib/` 目录，不会将 React 等依赖打入

### package.json

组件的 package.json 模版（即组件的 `_package.json` 文件）需满足以下功能：

- 模版化 `name`、`version`、`description`、`componentConfig` 字段，以便 ice-devtools 动态写入
- files 至少包含 `build/` 和 `lib/` 目录，这两个目录中分别存放着文档静态文件和 js 模块
- 入口文件为 `lib/index.js`
- 至少包含 `start` 和 `build` 两个 npm scripts
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
