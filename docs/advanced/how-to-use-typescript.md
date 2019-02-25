---
title: 如何使用 TypeScript
order: 10
category: 进阶指南
---

## 为什么使用 TypeScript

TypeScript 拥有媲美 C# 的强大语法特性，比如类、函数重载、多态、抽象方法、接口、继承、泛型、属性、类似 Lambda 表达式的函数定义写法等等，社区基于 TypeScript 的应用也越来越多。

相对于 JavaScript，TypeScript 拥有以下这些独有的特性：

- 更完善的类型定义，支持静态类型检查
- 更完善的面向对象编程
- 更完善的模块系统
- 其他...

## 安装和初始化

ICE 提供了基于 TypeScript 的基础模板，可以从 Iceworks 模板界面进行下载使用。

![](https://img.alicdn.com/tfs/TB1.YxLHY2pK1RjSZFsXXaNlXXa-954-684.png)

## 功能预览

- 内置 @alifd/next 基础组件
- 支持组件按需加载
- 支持 css-modules 语法
- 支持 TypeScript 语法
- 支持热更新

![ts-scaffold](https://img.alicdn.com/tfs/TB1JfdIH9zqK1RjSZPxXXc4tVXa-2861-1568.png)

## 使用 TypeScript 编写 React 组件

1. 安装类型依赖包

在你的项目里为 JSX 和 React 安装声明文件

```
$ npm i @types/react @types/react-dom -D
```

2. 将项目根目录的 `tsconfig.json` 配置文件的 `compilerOptions` 里设置选项 `"jsx": "react"`

3. 使用文件后缀 `.tsx` 替代 `.jsx`

4. 在 TypeScript 开发环境下写 React 组件，与 ES6 的区别主要就是 Props 和 State 的定义不同，如下两种写法：

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

#### 迁移步骤

- 升级构建工具 ice-scripts

```bash
#  最新版支持 TypeScript 构建
$ npm update ice-script
```

- 项目安装 TypeScript 开发依赖

```bash
$ npm install typescript -D
```

- 新建 .tsconfig 文件

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

- 替换文件后缀

在 TypeScript 工程中推荐使用 `.tsx` 替代 `.jsx`、使用 `.ts` 替代 `.js`，以此保证构建工具的正常构建。这意味着需要批量将项目的后缀名进行相应的替换，这里推荐社区的一个工具包 [renamex-cli](https://www.npmjs.com/package/renamex-cli)

```bash
# 安装
$ npm i -g renamex-cli

# 使用
$ renamex start -p "src/**/*.js" -r "[name].ts" -t no
```

- 修改 Entry 入口

```js
// packgae.json
// 将 src/index.js 改为 src/index.tsx
buildConfig: {
  entry: './src/index.tsx'
}
```

按照以上步骤，可按需迁移项目到 TypeScript 工程。如有疑问，请通过飞冰钉钉群联系我们。
