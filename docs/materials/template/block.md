---
title: 区块模版规范
order: 5
---

区块的文件结构如下所示，其中，`build/` 目录为构建生成。区块需满足如下文件及构建产物。

```bash
block
  ├── demo                    // 【必选】区块预览入口文件，用于生成区块开发预览
  │   └── index.html
  │   └── indes.js
  ├── build                   // 【必选】区块预览服务的静态资源，构建后生成
  │   └── index.html
  │   └── indes.js
  │   └── indes.css
  ├── src                     // 【必选】区块源码
  │   ├── index.js            // 【必选】区块出口文件
  │   └── main.scss           // 【必选】仅包含区块自身样式的源码文件
  ├── README.md               // 【必选】项目说明文档
  ├── ice.config.js           // 【可选】ice-scripts 工程配置，根据区块的 React 工程工具不同而有所区别
  └── package.json            // 【必选】
```

**强烈建议 React 区块使用 ice-scripts 工具进行开发**，官方 React 基础物料已提供了针对区块开发的 ice config，使用 ice-scripts 参考以下配置即可：

```javascript
module.exports = {
  entry: 'demo/index.js',            // 入口配置
  publicPath: './',
  outputAssetsPath: {
    css: '',
    js: '',
  },
  plugins: [
    ['ice-plugin-fusion', {}],       // 基于 fusion 体系的区块需要使用 fusion 插件
  ],
  chainWebpack: (config) => {        // 处理 demo 目录下的 html 文件
    config.plugin('HtmlWebpackPlugin').tap(args => [
      {...(args[0] || {}), template: require.resolve('./demo/index.html')},
    ]);
  },
};
```

若使用其他 React 工程工具，则需满足以下特点：

- 支持 devServer 预览服务，构建时支持将预览服务构建为静态 html、js、css 文件存放于 `build/` 目录

### package.json

区块的 package.json 模版（即区块的 `_package.json` 文件）需满足以下功能：

- 模版化 `name`、`version`、`description`、`componentConfig` 字段，以便 ice-devtools 动态写入
- files 至少包含 `build/` 和 `src/` 目录及 `screenshot.png` 文件，`build/` 存放着文档静态文件，`src/` 则是 js 源码模块，`screenshot.png` 是该区块的截图
- 至少包含 `start` 、`build` 和 `screenshot` 三个命令，screenshot 能力由 ice-devtools 提供
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
    "screenshot": "ice-devtools screenshot",
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
