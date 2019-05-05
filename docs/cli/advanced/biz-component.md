---
title: 业务组件开发规范
order: 6
---

### 初始化组件

```bash
// 新建组件文件夹
$ mkdir my-component & cd my-component

$ ice init component
```

根据提示输入对应的组件信息，添加完成后会在当前目录下新增一个组件，进入到该目录下，运行以下命令进行开发 :

```
// 启动组件服务
$ npm run start
```

### 目录结构

组件的基本目录结构如下：

```
.
├── README.md                  // 说明文档
├── package.json
└── lib                        // 组件构建后的结果
│   └── index.js
└── src
│   ├── index.js               // 组件入口
│   ├── main.scss              // 组件自身的样式代码
└── demo
    └── useage.md              // 组件 demo
```

### 编写组件

以上面创建的组件为例，进入 `src/index.js` , 修改初始代码，就可以开始组件的开发了。

### 编写 DEMO

组件的 DEMO 演示文件，位于 `demo` 目录下，使用 `yaml-markdown` 语法。

可以修改默认的 `usage.md` ，来调整组件 DEMO，或通过增加 *.md 文件，来创建多个 DEMO。

每个 DEMO 的形式如下：

```
---
title: Simple Usage
order: 1
---

本 Demo 演示一行文字的用法。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ExampleComponent from 'example-component';

class App extends Component {

  render() {

    return (
      <div>
        <ExampleComponent />
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
```

## 发布组件

发布组件的流程实际上也就是发布一个 npm 包的过程。

> 注：如果你还没有发过 npm 包或者对 npm 包的发布流程不了解，需要先简单了解下 npm 的相关知识，这里推荐 [npm 官网](https://www.npmjs.com/)  和阮一峰写的 [npm 模块管理器](http://javascript.ruanyifeng.com/nodejs/npm.html)。


```bash
# 在组件根目录下
$ npm publish
```