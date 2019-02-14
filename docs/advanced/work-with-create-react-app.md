---
title: 在 create-react-app 中使用飞冰组件
order: 8
category: 进阶指南
---

Iceworks 默认提供了基于 `create-react-app` 的模板，该模板可以无缝使用飞冰组件、区块、模板等能力，[参见文档](#docs/advanced/work-with-create-react-app)。

如果上述模板不能满足你的需求，请参考本篇文章，本文讲述如何在使用 create-react-app 创建的项目中使用飞冰相关的物料。PS: 其他工程工具或自行配置 webpack 原理相同。

## 初始化项目

使用 `npx` 命令执行 `create-react-app` 创建一个项目：

```bash
npx create-react-app my-app
cd my-app
npm start
```

> npx 命令在 npm 5.2+ 自带，如果没有 npx 您可能需要按照官方文档操作

此时浏览器会打开本地调试地址 http://localhost:3000/ 。

## 引入组件

```bash
# 根据组件文档，安装对应的组件。
npm install @alifd/next @icedesign/img --save

# create-react-app 支持 sass https://facebook.github.io/create-react-app/docs/adding-a-sass-stylesheet
tnpm install node-sass --save-dev
```

修改 `src/App.js`，引入 `Button` 和 `Img` 组件。

```jsx
import React, { Component } from 'react';
// 全量引入基础组件样式
import '@alifd/next/index.scss';
// 引入基础组件脚本，无工程辅助情况下 import { Button } from '@alifd/next'; 会引入所有 js
import Button from '@alifd/next/lib/button';
// 引入业务组件脚本
import Img from '@icedesign/img';
// 引入业务组件样式
import '@icedesign/img/lib/style.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button type="primary">Button</Button>
        <Img src="https://img.alicdn.com/tfs/TB1saOBbYGYBuNjy0FoXXciBFXa-218-58.png' />
      </div>
    );
  }
}

export default App;
```

现在你应该能看到页面上已经有了蓝色的 `Button` 组件，接下来就可以继续选用其他组件开发应用了。

其他开发流程你可以参考 `create-react-app` 的官方文档。

这种方式引入的基础组件样式为全量引入，如果需要按需引入请看下面文档。

## 优化组件引入

上面的方法虽然能够正常运行组件，但是可以发现几个问题：

- 基础组件的样式需要全量引入的
- 引入基础组件需要额外增加 `lib/button` 的二级路径并且每个组件都需要单独 import
- 业务组件需要分开引入脚本和样式

要解决这些问题，我们需要对 `create-react-app` 进行一些工程定制。我们建议使用社区流行的 [react-app-rewired](https://github.com/timarney/react-app-rewired) 进行自定义配置。

首先安装 `react-app-rewired`

```bash
npm i react-app-rewired --save-dev
```

修改 `package.json` 文件的 `scripts` 字段

```json
{
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom"
  }
}
```

在您的项目根目录创建 `config-overrides.js` 文件来修改默认配置。

### 使用 babel-plugin-import 实现基础组件的按需加载

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一个用于按需加载组件代码和样式的 babel 插件，现在我们尝试安装它并修改 `config-overrides.js` 文件。

```bash
npm i babel-plugin-import --save-dev
```

```diff
+ const { injectBabelPlugin } = require('react-app-rewired');

  module.exports = function override(config, env) {
+   config = injectBabelPlugin(['import', {
+     libraryName: '@alifd/next'
+   }], config);
    return config;
  };
```

这样我们只需要在代码里 `import { Button } from '@alifd/next';` 就可以实现按需打包构建了。

### 使用 webpack-plugin-import 实现样式自动引入

`webpack-plugin-import` 是用于自动加载样式的 webpack 插件，它的原理是对引入模块路径下存在 `style.js` 的样式进行自动加载，这意味着你可能需要同时配置 `less` 或 `sass` 等预处理器的 `loader`。

修改 `config-overrides.js` 的内容

```js
// ...
const WebpackPluginImport = require('webpack-plugin-import');

module.exports = function override(config, env) {
  // ...
  config.plugins.push(
    new WebpackPluginImport([
      {
        // 基础组件 0.x
        libraryName: /^@icedesign\/base\/lib\/([^/]+)/
      },
      {
        // 基础组件 1.x
        libraryName: /^@alifd\/next\/lib\/([^/]+)/
      },
      {
        // ICE 业务组件
        libraryName: /@icedesign\/.*/
      },
    ])
  );
  // ...
  return config;
};
```

### 配置 sass-loader 和 ice-skin-loader

`ICE` 官方提供的组件依赖了 Sass 作为 CSS 预处理器，所以您需要手动配置并引入 `sass-loader`。同时 `ICE` 使用了 `ice-skin-loader` 支持自定义皮肤的定制。首先安装以下依赖：

```bash
npm i @icedesign/theme --save
npm i sass-loader node-sass ice-skin-loader --save-dev
```

在根目录创建 `rewire-scss.js` 文件，添加以下内容。

```js
const getRules = (config) =>
  config.module.rules.find((rule) => Object.keys(rule).includes('oneOf')).oneOf;
const findFileLoaderRuleFn = (rule) =>
  typeof rule.loader === 'string' && rule.loader.includes('file-loader');
const findStyleLoaderRuleFn = (rule) =>
  rule.test.toString() === /\.css$/.toString();

function rewireSass(config, env, sassOptions = {}) {
  // find the non-javascript ruleset in the webpack config
  const rules = getRules(config);

  // find the file-loader and add a rule excluding sass files from being loaded as text
  config.module.rules[1].oneOf
    .find(findFileLoaderRuleFn)
    .exclude.push(/\.scss$/);

  // find the current rule for loading css files
  const styleLoaderRule = rules.find(findStyleLoaderRuleFn);

  // allows the test to be pre-defined by react-scripts as an array or a single regex
  const currentTests = Array.isArray(styleLoaderRule.test)
    ? [...styleLoaderRule.test]
    : [styleLoaderRule.test];

  // add regexes for scss files
  styleLoaderRule.test = [...currentTests, /\.scss$/, /\.sass$/];

  styleLoaderRule.use.push({
    loader: require.resolve('sass-loader'),
    options: sassOptions,
  });
  styleLoaderRule.use.push({
    loader: require.resolve('ice-skin-loader'),
    options: {
      themeFile: theme && path.join(__dirname, 'node_modules/@icedesign/theme/variables.scss'),
      themeConfig: {},
    },
  });

  return config;
}

module.exports = rewireSass;
```

修改 `config-overrides.js` 的内容

```js
// ...
const rewireSass = require('./rewire-scss');

module.exports = function override(config, env) {
  // ...
  config = rewireSass(config);
  // ...
  return config;
};
```

### 使用组件

在项目的任意 `js` 文件中，您都可以使用类似如下的方法直接按需引入某一组件，不用担心全量引入和样式缺失的问题。

```jsx
import { Button } from '@alifd/next';
import Img from '@icedesign/img';

<Button type="primary">ICE</Button>;
```

# 如何通过 Iceworks 生成 create-react-app 项目

如果你觉得使用 create-react-app 自定义太麻烦，我们也提供了基于 Iceworks 模板创建项目的流程生成 create-react-app 项目，使用 react-app-rewired 进行自定义配置，支持按需引入飞冰基础组件，添加区块。

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
