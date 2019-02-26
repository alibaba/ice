---
title: 如何使用 TypeScript
order: 10
category: 进阶指南
---

## 为什么使用 TypeScript

TypeScript 是微软开发一款开源的编程语言，本质上是向 JavaScript 增加静态类型系统。它是 JavaScript 的超集，所有现有的 JavaScript 都可以不加改变就在其中使用。它是为大型软件开发而设计的，它最终编译产生 JavaScript，所以可以运行在浏览器、Node.js 等等的运行时环境。

TypeScript 拥有媲美 C# 的强大语法特性，比如强类型、类、函数重载、接口、继承等等，近两年来 TypeScript 在前端社区的发展越来越火热，也有越来越多的应用采用 TypeScript 书写，与此同时，飞冰（ICE）也在积极的拥抱 TypeScript 社区。

本文就来介绍如何在飞冰（ICE）里使用 TypeScript。

## 选择 TypeScript 模板初始化项目

ICE 提供了基于 TypeScript 的基础模板，该模板将飞冰（ICE）本身的能力和 TypeScript 能力做了很好的融合：

- 内置 @alifd/next 基础组件
- 支持组件按需加载
- 支持 css-modules 语法
- 支持 TypeScript 语法
- 支持热更新

![ts-scaffold](https://img.alicdn.com/tfs/TB1JfdIH9zqK1RjSZPxXXc4tVXa-2861-1568.png)

你只需要在 Iceworks 模板界面选择对应模板进行初始化：

![](https://img.alicdn.com/tfs/TB1.YxLHY2pK1RjSZFsXXaNlXXa-954-684.png)

初始化完成之后，接下来就是使用 TypeScript 编写代码了，所有以 `.tsx` 或者 `.ts` 结尾的文件都支持其语法。

通过 TypeScript 写 React 组件，主要区别就是 Props 和 State 的定义，如下两种写法：

- ES6 语法

```jsx
import React from 'react';

class App extends React.PureComponent {
  state = {
    name: 'ice',
    age: 1,
  };
}

App.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};
```

- TypeScript 语法

```jsx
import * as React from 'react';

interface IProps {
  name: string;
  age: number;
}

interface IState {
  name: string;
  age: number;
}

class App extends React.PureComponent<IProps, IState> {
  state = {
    name: 'ice',
    age: 1,
  };
}
```

## 已有项目如何迁移到 TypeScript

迁移步骤如下：

- 升级构建工具 ice-scripts

```bash
# ice-scripts 最新版支持 TypeScript 的语法构建
$ npm update ice-script
```

- 项目安装 TypeScript 开发依赖

```bash
$ npm install typescript -D
```

- 新增 .tsconfig 文件

```js
{
  "compileOnSave": false,
  "buildOnSave": false,
  "compilerOptions": {
    "outDir": "build",      // 指定输出目录
    "module": "esnext",     // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "target": "es6",        // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "jsx": "react",        // 允许编译 javascript 文件
    "moduleResolution": "node", // 选择模块解析策略
    "allowSyntheticDefaultImports": true,
    "lib": ["es6", "dom"],
    "sourceMap": true,     // 生成相应的 '.map' 文件
    "allowJs": true,       // 扩展名可以是 .js/.jsx
    "noUnusedLocals": true // 有未使用的变量时，抛出错误
  },
  "include": ["src/*"],  // 需要编译的文件目录
  "exclude": ["node_modules", "build", "public"] // 排除编译的文件目录
}
```

- 按需修改文件后缀

在 TypeScript 工程中推荐使用 `.tsx` 替代 `.jsx`、使用 `.ts` 替代 `.js`，这里可以根据自身需求按需更改，一般情况下更改后缀之后需要修改部分语法，否则 ts 语法检测可能会不通过

- 按需修改 Entry 入口

如果将 `src/index.js` 的后缀做了修改，那么同步需要修改 `package.json` 里的 entry 字段：

```diff
// packgae.json
buildConfig: {
-  entry: './src/index.js'
+  entry: './src/index.ts'
}
```

按照以上步骤，可按需迁移项目到 TypeScript 工程。如有疑问，请通过飞冰钉钉群联系我们。