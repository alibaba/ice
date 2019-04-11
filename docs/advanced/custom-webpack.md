---
title: 自定义 webpack 配置使用飞冰物料
order: 9
---

飞冰默认使用 [ice-scripts](https://github.com/alibaba/ice/tree/master/tools/ice-scripts) 作为开发工具，这个开发工具里包含了很多对于组件的定制能力以及我们多年在工程领域的沉淀，同时也通过良好的机制支持业务自定义很多工程能力，因此我们非常不推荐自建 webpack 的方式，如果你在使用 ice-scripts 中遇到任何问题都可以直接反馈给飞冰（ICE）团队支持。

注意，如果是想使用社区的 [create-react-app](https://github.com/facebook/create-react-app) 开发项目：

- Iceworks 里提供了基于 create-react-app 的模板，支持 ice-scripts 核心的工程能力，直接使用即可（虽然也不是非常推荐）
- 如果自己想基于 create-react-app 配置，可以参考模板代码，也可以参考本文档，除了 create-react-app 自身特殊的重写配置机制外其余都是 webpack 通用的能力

## 基础组件引入

默认情况下，组件样式需要手动引入，同时不加处理的话也可能出现只用了 Button 组件但实际打包构建了所有组件代码，这里可以通过 `babel-plugin-import` 实现组件的按需构建以及样式自动引入。

首先安装以下依赖：

```bash
npm i babel-plugin-import --save-dev
```

然后增加 babel 配置如下：

```js
module.exports = {
  // ...
  plugins: [
    ['babel-plugin-import', {
      libraryName: '@alifd/next', // 0.x 的话使用 @icedesign/base
      style: true
    }]
  ]
}
```

增加这段配置之后，只需要如下引入代码：

```js
import { Button } from '@alifd/next';
```

这段代码最终会被转换成：

```js
import Button from '@alifd/next/lib/button';
import '@alifd/next/lib/button/style';
```

## 业务组件的样式自动引入

> babel-plugin-import 只能按照白名单方式配置，但是业务组件的包名是无限的，因此这里需要使用 webpack 插件

通过 `webpack-plugin-import` 可以实现自动引入业务组件样式，它的原理是对引入模块路径下存在 `style.js` 的样式进行自动加载。

首先安装以下依赖：

```bash
npm i webpack-plugin-import --save-dev
```

然后增加以下配置：

```js
const WebpackPluginImport = require('webpack-plugin-import');

module.exports = {
  // ...
  plugins: [
    new WebpackPluginImport(),
  ]
  // ...
}
```

增加这段配置之后，只需要如下引入代码：

```js
import IceTitle from '@icedesign/title';
```

这段代码最终会被转换成：

```js
import IceTitle from '@icedesign/title';
import '@icedesign/title/lib/style';
```

## 支持主题能力

飞冰（ICE）直接使用了 Fusion 的基础组件，因此从基础组件到业务组件都支持丰富的主题定制，同时我们也在工程上通过 `ice-skin-loader` 支持了快速配置主题的能力。

首先安装以下依赖：

```bash
npm i @icedesign/theme --save
npm i sass-loader node-sass ice-skin-loader --save-dev
```

然后增加以下配置：

```js
const ICE_SKIN_LOADER = require.resolve('ice-skin-loader');

// 也可以从配置里读取，需要将主题包安装在项目依赖里
const theme = '@icedesign/theme';
// 项目的 node_modules 路径
const projectNodeModules = '';
const themeFile = path.join(projectNodeModules, `${theme}/variables.scss`);

module.exports = {
  // ...
  rules: [
    {
      test: /\.scss$/,
      use: [
        {
          loader: SASS_LOADER,
          options: {},
        },
        {
          loader: ICE_SKIN_LOADER,
          options: {
            themeFile: themeFile,
          },
        }
      ]
    }
  ]
  // ...
}
```

最后，我们不推荐自建 webpack 的方式，如果你在使用 ice-scripts 中遇到任何问题都可以直接反馈给飞冰（ICE）团队。