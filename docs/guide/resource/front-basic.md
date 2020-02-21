---
title: 前端基础知识
order: 0
---

开发一个前端应用，一些基础的前端知识是必不可少的，本文就来带领大家对这些知识体系做一个大概的了解。

## 前端三剑客

前端三剑客即 HTML/CSS/JavaScript，大部分网页都离不开这三者：

### HTML

是一种用于创建网页的标准标记语言，描述整个页面的结构，每一个 HTML 标签都对应着网页上的一个实体，示例：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1" />
    <meta name="viewport" content="width=device-width" />
    <title>ICE Demo</title>
  </head>
  <body>
    <div id="ice-container"></div>
  </body>
</html>
```

### CSS

用于描述 HTML 标签的样式，比如颜色、字体、布局等，示例：

```css
/* 页面背景色为红色 */
body {
  background-color: red;
}
```

### JavaScript

常缩写为 JS，是一种脚本语言，在网页端用于完成用户交互、前后端数据通信、操作 HTML 标签等功能，随着 Node.js 的兴起，JavaScript 已经可以运行在服务端完成诸如文件读写、服务托管等能力。

需要了解 JS 知识，请参考 [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)。

## 前端框架

正常情况下用上述的前端三剑客即可完成网页的制作，但是为了不断提高开发效率，提升前端代码的可维护性，前端社区逐渐诞生了一些框架，比如近几年比较流行的 React/Vue 等框架。

React 核心解决两个问题：

1. 组件化的开发思路：提供完整的组件规范，然后借助组件快速的搭出一个页面
2. 数据驱动视图：开发者无需再频繁操作页面上的每个节点，而是通过定义数据模型来驱动整个页面视图

React 组件示例：

```jsx
// 开发一个简单的 React 组件
function Button(props) {
  return <div>{props.text}</div>;
}

// 使用组件
function App(props) {
  return (
    <div>
      <Button text="确定" />
      <Button text="取消" />
    </div>
  );
}
```

关于 React 更多的知识强烈推荐阅读 [React 官方文档](https://reactjs.org/docs/getting-started.html)。

## 包管理

任何一个编程语言都会有自己的包管理体系，基于包管理我们可以实现代码的复用，减少很多重复开发的成本。在前端体系里这个包管理体系叫做 npm，一个组件、一个工具方法、一个框架都可以发布为一个 npm。

### 使用 npm 包

在项目里可以很方便的使用 npm 包：

```bash
# package.json 的 dependencies 字段声明了当前项目依赖了哪些 npm 包
$ cat package.json
# 执行 npm install 会安装当前项目的所有依赖，依赖会被放在 node_modules 目录下，这个目录不需要提交到 git 里
$ npm install
# 安装单个 npm 包，会同时记录到 dependencies 字段里
$ npm install --save url-parse
# 安装某个包的指定版本
$ npm install --save url-parse@1.x
```

> 注意：阿里内部同学请使用 tnpm 命令

安装完成后就可以通过 `import` 的方式引用并使用这些包了：

```js
// src/index.js
import urlParse from 'url-parse';

const urlData = urlParse('https://example.com/foo/bar', true);
```

同时，我们整理了一些 [常用的社区包](/docs/guide/resource/npms.md)，方便开发者查找。

### npm 版本管理

npm 遵循 [semver 版本规范](https://semver.org/lang/zh-CN/)，每个 npm 包都会有多个版本，项目依赖的包或者版本都会在 `package.json` 文件中有所体现：

```json
{
  "name": "example",
  "dependencies": {
    "moment": "^2.23.0",
    "prop-types": "^15.5.8",
    "react": "^16.4.1",
    "react-dom": "^16.4.1",
    "react-router-dom": "^4.2.2"
  }
}
```

## 构建流程

JavaScript 的语言标准一直在发展，但是总会有一些老版本的浏览器无法支持这些语法，为了保证开发者可以使用最新的 JavaScript 标准，前端社区诞生了诸如 Babel, Webpack, Rollup 这些工具构建代码。开发者只需要在 src 目录下按照最新的语言标准以及工程实践书写代码，上线前对代码执行构建任务生成一个 bundle.js 的文件，页面引入这个 bundle.js 即可运行。

为了降低构建的配置成本，我们开发了 ice-scripts 这个工具，用户只需要按照文档执行 `dev` `build` 命令即可。
