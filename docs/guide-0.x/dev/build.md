---
title: 工程方案
order: 2
---

前端项目普遍都需要使用 webpack 进行构建，但是 webpack 的配置相当繁琐，因此我们封装了 [ice-scripts](/docs/cli/about.md) 这个工具简化工程的使用链路。

## 安装依赖

> 如果是基于模板创建的，这一步可以忽略

安装依赖：

```bash
$ npm i --save-dev ice-scripts
```

在 package.json 中配置 `npm scripts`：

```json
{
  "scripts": {
    "start": "ice-scripts dev",
    "build": "ice-scripts build"
  }
}
```

然后执行 `npm start` 即可进行项目开发，正常情况下执行命令后自动打开浏览器 `http://localhost:4444` 进行页面预览。修改源码内容后将自动刷新页面。执行 `npm run build` 进行项目构建，构建产物默认输出到 `./build` 目录下。

## 工程配置

`ice-scripts` 提供常用的工程配置，满足大多数项目开发需求。如果项目工程存在定制需求，可以直接编辑项目根目录下的 `ice.config.js` 文件：

```js
const path = require('path');

module.exports = {
  // 指定 entry 入口文件
  entry: 'src/index.js',
  alias: {
    // 配置 alias，解决项目模块引用相对路径过长问题
    '@': path.resolve(__dirname, 'src')
  },
  plugins: [
    // 添加 ice-plugins-fusion 支持 fusion 体系下主题定制 / 多主题等能力
    ['ice-plugins-fusion', { themePackage: '@icedesign/theme' }],
  ]
}
```

更多配置相关信息，参考 [ice-scripts 配置指南](/docs/cli/config/config-file.md)。

## IDE 配置

如果使用了 webpack 的 alias 能力（`ice.config.js` 里的 alias 配置），会发现 IDE 无法识别&跳转 import 的文件路径了，此时推荐在项目里创建 `jsconfig.json` 文件，并配置以下内容：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "jsx": "react",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

通过上述的配置来指定 `@/` 引用相对于 `baseUrl` 的路径映射，可以快速定位引用模块，从而提升项目开发的体验。