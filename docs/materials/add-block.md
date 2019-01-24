---
title: 开发区块
order: 3
category: 物料
---

## 基础规范

- 区块名称: 大驼峰写法, 如 `ExampleBlock`, 遵循简练能表达组件含义的原则
- 基础编码码规范: [JavaScript Style Guide](https://github.com/airbnb/javascript)
- CSS 规范: [CSS-in-JS](https://github.com/MicheleBertoli/css-in-js)

## 添加区块

在快速入门中，大家应该有了初步的印象，接下来我们来了解如何开发一个自定义区块，进入初始化的项目，使用 `ice-devtools add` 添加区块，添加流程的规则如下：

```bash
➜ cd my-materials
➜ ice-devtools add
? 选择添加类型 (Use arrow keys)
❯ 区块
  模板

// 必须输入
? 名称(name)：

// 必须输入
? 中文名(title)：

// 可选
? version(1.0.0)

// 必须输入
? 描述(description)：

// 必须输入
？分类(categories):
❯◯ 表格
 ◯ 表单
 ◯ 图表
 ◯ 其他

// 可选
？作者(author):

```

根据提示输入对应的区块信息，添加完成后会在  `my-materials/blocks/`  目录下新增一个区块，进入到该目录下，运行以下命令进行开发，假设初始化的区块为 `Login` :

```plain
// 区块目录
$ cd blocks/Login

// 启动区块服务
$ npm start
```

运行 npm start 自动打开一个浏览器窗口如下：

![block](https://cdn.nlark.com/lark/0/2018/png/71071/1543760347827-a436a7bc-dd96-45c1-a77b-454c8ac67876.png)

## 目录结构

进入到我们刚刚初始化的区块，可以看到如下目录结构：

```
.
├── README.md                  // 说明文档
├── package.json               // pkg
├── screenshot.png             // 区块截图
└── src
    └── index.jsx              // 区块代码片段入口
```

#### 目文件说明

- `src/index.jsx`: 提供了基础的区块模板代码规范，方便快速开发一个区块

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import Container from '@icedesign/Container'

const Login = () => {
    return (
      <Container style={styles.container}>
        <h3 style={styles.title}>ICE Block</h3>
        <p style={styles.description}>Edit src/index.js and save to reload.</p>
      </Container>
    )
}

const styles = {
  container: { ... },
  title: { ...  },
  description: { ...  }
}

export default Login;
```

- package.json: 主要描述区块的信息

在物料设计中区块以 npm 包的形式存在，但区块并不是一个完整的 npm 包，因为它不能通过 `npm install` 的方式下载使用，其本质上只是代码片段，需要借助 Iceworks 下载生成到对应的项目中进行使用。 一个区块的 package.json 信息结构和正常 npm 包的形式是完全保持一致的，但除了遵循 npm 包的字段之外，还需要补充 blockConfig 字段，用于描述区块的名称，截图，标题，分类等信息，主要用于 Iceworks 和站点展示使用，在创建区块时这些字段会自动生成。

设计成 npm 包的形式原因主要是利用 npm 的托管服务和版本管理功能对区块进行维护管理，同时会根据这些元数据生成对应的数据源，详细可以查看物料数据规范。

```javascript
{
  "name": "<%= name %>",                   // 区块名
  "version": "1.0.0",
  "description": "<%= description %>",     // 区块描述
  "author": "",
  "files": [
    "src/",
    "build"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/<%= repo %>/<%= name %>" // git url
  },
  "license": "MIT",
  "keywords": ["block"],
  "dependencies": {
    "react": "^16.3.0",
  },
  "blockConfig": {                     // 区块的相关配置，用于 Iceworks 和站点的展示
    "name": "<% name %>",              // 名称 (必须)
    "title": "<% title %>",            // 标题 (必须)
    "categories": "<% categories %>"   // 分类 (必须）
  },
  "publishConfig": {
    "access": "public",
    "registry": "<% registry %>"       // npm 源
  },
}
```

- `README.md`: 说明文档

包含区块名、区块简介等基本字段，除此之外，你也可以按需添加其他说明，仅用于开发时作为参考文档使用。

```makedown
# ExampleBlock

简介：示例区块

```

## 编写区块

经过上面的步骤，对区块的定义应该有了初步的了解，接下来你可以按照实际的业务进行区块开发和区块沉淀。

这里简单演示下，进入 `src/index.js` ，将将初始化的区块模板代码进行简单的修改：

```diff
import React from 'react';
import PropTypes from 'prop-types';
import Container from '@icedesign/Container'

const Login = () => {
    return (
      <Container style={styles.container}>
-        <h3 style={styles.title}>ICE Block</h3>
+        <h3 style={styles.title}>My first block</h3>
        <p style={styles.description}>Edit src/index.js and save to reload.</p>
      </Container>
    )
}

const styles = {
  container: { ... },
  title: { ...  },
  description: { ...  }
}

export default Login;
```

回到浏览器窗口看到页面如下，说明你的第一个区块已经正常工作了，当然实际的区块开发可能并没有这么简单。

![block](https://cdn.nlark.com/lark/0/2018/png/71071/1543760395586-a00e6fa6-6a9a-4c3b-87cd-7e106c79a3d1.png)

## 发布区块

这里我们再来简单演示一下区块开发完成后，如何将新增的区块发布到 Iceworks 中，分享给其他的开发者进行使用。在上面对区块的 package.json 的详细介绍中我们知道，区块都是托管在 npm 上的，通过 npm 的机制进行发布和下载到项目中，因此发布区块的流程实际上也就是发布一个 npm 包的过程。

> 注：如果你还没有发过 npm 包或者对 npm 包的发布流程不了解，需要先简单了解下 npm 的相关知识，这里推荐 [npm 官网](https://www.npmjs.com/)  和阮一峰写的 [npm 模块管理器](http://javascript.ruanyifeng.com/nodejs/npm.html)。

```bash
# 在 blocks/Login 目录下
$ npm publish
```

## 生成数据

区块发布完成后，我们需要重新生成物料源数据，以此更新对应的区块信息。在项目根目录下执行 `npm run deploy` 即可重新生成并更新物料源数据。

```bash
# 在项目根目录下
$ npm run deploy
```

## 验证数据

当物料源更新后，我们打开 Iceworks 进入到区块界面，点击刷新按钮，如果看到对应的区块截图已经更新，即可说明区块的相关信息也已经更新。此时，下载到项目的代码也即是最新的区块代码。

## 皮肤配置

如果希望在预览区块时，也带上皮肤配置，可以参考这份[文档](#/advanced/webpackrc#主题配置%20-%20themeConfig)进行配置。