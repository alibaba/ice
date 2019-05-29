---
title: React 物料开发指南
order: 6
---

> 工程统一使用 ice-scripts

React 推荐基于 ice-scripts + Fusion 进行物料开发。通过 ice-devtools 初始化的模版物料中已经默认添加了 Fusion（@alifd/next）依赖。

## 业务组件规范

### 初始化组件

> 仅在独立开发业务组件时需要单独初始化业务组件

```bash
// 新建组件文件夹
$ mkdir my-component & cd my-component

$ idev init --type component
```

根据提示输入对应的组件信息，添加完成后会在当前目录下新增一个组件，进入到该目录下，运行以下命令进行开发 :

```bash
// 安装依赖
$ npm install
// 启动组件服务
$ npm run start
```

### 目录结构

组件的基本目录结构如下：

```
component
  ├── demo                      // 【必选】组件文档，用于生成组件开发预览，以及生成组件文档
  │   └── basic.md
  ├── lib                       // 【必选】组件编译后的文件
  │   ├── index.js              // 【必选】src/index.js 编译生成
  │   ├── style.js              // 【必选】自动生成，引入 main.scss 以及依赖组件的 style.js
  │   ├── main.scss             // 【必选】src/main.scss 编译生成
  │   └── index.scss            // 【必选】自动生成，包含组件自身样式，以及依赖组件样式，正常情况下不需要
  ├── src                       // 【必选】组件源码
  │   ├── index.js              // 【必选】组件出口文件
  │   └── main.scss             // 【必选】仅包含组件自身样式的源码文件
  ├── README.md                 // 【必选】组件说明及API
  └── package.json              // 【必选】
```

### package.json

package.json 中包含了一些依赖信息和配置信息，示例如下：

```js
{
  "name": "@alife/1688-button",
  "version": "0.0.1",
  "main": "lib/index.js",
  "stylePath": "style.js",
  "files": [
    "build/",
    "lib/",
    "demo/",
  ],
  "scripts": {
    "start": "ice-scripts dev",
    "build": "ice-scripts build",
    "prepublishOnly": "npm run build"
  },
  "dependencies": {
    "@alifd/next": "1.x"
  },
  "devDependencies": {
    "react": "^16.5.0",
    "react-dom": "^16.5.0",
    "ice-scripts": "^2.0.0"
  },
  "peerDependencies": {
    "react": "^16.5.0"
  }
}
```

### 编写组件

以上面创建的组件为例，进入 `src/index.js` , 修改初始代码，就可以开始组件的开发了。

#### src/index.js

包含组件的出口文件，示例如下：

```js
import Button from './Button.jsx';
import ButtonGroup from './ButtonGroup.jsx';

Button.Group = ButtonGroup;

export default Button;
```

#### src/main.scss

```scss
// 不需要引入依赖组件的样式

// 如果需要使用主题变量请引入该文件
@import "~@alifd/next/variables.scss";

.custom-component {
  .title {
    color: $color-brand1-6;
  }
  .text {
    color: red;
  }
}
```

### 编写 Demo

组件的 Demo 演示文件，位于 `demo` 目录下，使用 `yaml-markdown` 语法。

可以修改默认的 `usage.md`，来调整组件 DEMO，或通过增加 *.md 文件，来创建多个 DEMO。

每个 Demo 的形式如下：

```
---
order: {文档的排序，数字，0最小，从小到大排序}
---

# 按钮类型

按钮有三种视觉层次：主按钮、次按钮、普通按钮。不同的类型可以用来区别按钮的重要程度。

​````jsx
import Button from '@icedesign/title';

// 默认渲染到 mountNode
ReactDOM.render(<div className="test">
    <Button type="normal">普通</Button> &nbsp;&nbsp;
</div>, mountNode);
​````
```

### 编写 README

README.md应该包含业务组件的源信息、使用说明以及API，示例如下：

```
# 按钮

按钮用于开始一个即时操作。

## API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| type | 类型 | String | `primray`、`normal` | normal |
```

### 发布组件

发布组件的流程实际上也就是发布一个 npm 包的过程。

> 注：如果你还没有发过 npm 包或者对 npm 包的发布流程不了解，需要先简单了解下 npm 的相关知识，这里推荐 [npm 官网](https://www.npmjs.com/)  和阮一峰写的 [npm 模块管理器](http://javascript.ruanyifeng.com/nodejs/npm.html)。

```bash
# 在组件根目录下
$ npm publish
```