---
title: 在 create-react-app 中使用
order: 1
category: 进阶指南
---

[create-react-app](https://github.com/facebook/create-react-app) 是社区广泛使用的 React 开发工具，本文讲述如何在使用 create-react-app 创建的项目中使用 ICE。

## 初始化项目

使用 `npx` 命令执行 `create-react-app` 创建一个项目

```bash
npx create-react-app my-app
cd my-app
npm start
```

> npx 命令在 npm 5.2+ 自带，如果没有 npx 您可能需要按照官方文档操作

此时浏览器会打开本地调试地址 http://localhost:3000/ 。

## 引入组件

根据组件文档，安装对应的组件。

```bash
npm install @icedesign/base @icedesign/img --save
```

修改 `src/App.js`，引入 `Button` 和 `Img` 组件。

```jsx
import React, { Component } from 'react';
import Button from '@icedesign/base/lib/button';
import Img from '@icedesign/img';
import './App.css';

const image =
  'https://img.alicdn.com/tfs/TB2NU_nmRUSMeJjy1zkXXaWmpXa_!!10-2-luban.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button type="primary">Button</Button>
        <Img src={image} />
      </div>
    );
  }
}

export default App;
```

修改 `src/App.css`，在文件顶部引入组件的样式。

```css
@import '~@icedesign/base/dist/ICEDesignBase.css';
@import '~@icedesign/img/dist/Img.css';

.App {
  text-align: center;
}

...
```

现在你应该能看到页面上已经有了蓝色的 `Button` 组件，接下来就可以继续选用其他组件开发应用了。

其他开发流程你可以参考 `create-react-app` 的官方文档。

这种方式引入的基础组件样式为全量引入，如果需要按需引入请看下面。

## 自定义按需引入

上面的方法虽然能够正常运行组件，但是可以发现样式是全量引入的，`Button` 的引入需要额外增加 `lib/button` 的二级路径。

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

### 使用 babel-plugin-import 实现按需加载

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一个用于按需加载组件代码和样式的 babel 插件，现在我们尝试安装它并修改 `config-overrides.js` 文件。

```bash
npm i babel-plugin-import --save-dev
```

```diff
+ const { injectBabelPlugin } = require('react-app-rewired');

  module.exports = function override(config, env) {
+   config = injectBabelPlugin(['import', {
+     libraryName: '@icedesign/base'
+   }], config);
    return config;
  };
```

### 使用 webpack-plugin-import 实现样式自动引入

`webpack-plugin-import` 是用于自动加载样式的 webpack 插件，它的原理是对引入模块路径下存在 `style.js` 的样式进行自动加载，这意味着您可能需要同时配置 `less` 或 `sass` 等预处理器的 `loader`。

修改 `config-overrides.js` 的内容

```js
// ...
const WebpackPluginImport = require('webpack-plugin-import');

module.exports = function override(config, env) {
  // ...
  config.plugins.push(
    new WebpackPluginImport([
      {
        libraryName: /^@icedesign\/base\/lib\/([^/]+)/,
        stylePath: 'style.js',
      },
      {
        libraryName: /@icedesign\/.*/,
        stylePath: 'style.js',
      },
    ])
  );
  // ...
  return config;
};
```

### 配置 sass-loader 和 ice-skin-loader

`ICE` 官方提供的组件依赖了 Sass 作为 CSS 预处理器，所以您需要手动配置并引入 `sass-loader`。同时 `ICE` 使用了 `ice-skin-loader` 支持自定义皮肤的定制。首先安装以下依赖。

```bash
npm i @icedesign/skin --save
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

  styleLoaderRule.loader.push({
    loader: require.resolve('sass-loader'),
    options: sassOptions,
  });
  styleLoaderRule.loader.push({
    loader: require.resolve('ice-skin-loader'),
    options: {
      themeFile: require.resolve('@icedesign/skin'),
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

### 如何使用

在项目的任意 `js` 文件中，您都可以使用类似如下的方法直接按需引入某一组件，不用担心全量引入和样式缺失的问题。

```jsx
import { Button } from '@icedesign/base';
import Img from '@icedesign/img';

<Button type="primary">ICE</Button>;
```
