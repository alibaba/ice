---
title: 开发业务组件
order: 4
category: 物料
---

## 基础规范

- 组件名称: 大驼峰写法, 如 `ExampleComponent`, 遵循简练能表达组件含义的原则
- 基础编码码规范: [JavaScript Style Guide](https://github.com/airbnb/javascript)
- CSS 规范: [CSS-in-JS](https://github.com/MicheleBertoli/css-in-js)

## 添加组件

进入初始化的项目，使用 `ice-devtools add` 添加组件，添加流程的规则如下：

```bash
➜ cd my-materials
➜ ice-devtools add
? 选择添加类型 (Use arrow keys)
  区块
❯ 组件
  模板

// 必须输入
? 组件名(name)：

// 必须输入
? 中文名(title)：

// 可选
? version(1.0.0)

// 必须输入
? 描述(description)：

// 可选
？分类(categories):
❯◯ 表格
 ◯ 表单
 ◯ 图表
 ◯ 其他

// 可选
？作者(author):

```

根据提示输入对应的组件信息，添加完成后会在  `my-materials/components/`  目录下新增一个组件，进入到该目录下，运行以下命令进行开发，假设初始化的组件为 `Login` :

```plain
// 区块目录
$ cd components/Login

// 启动组件服务
$ npm start
```

## 目录结构

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

## 编写组件

以上面创建的 `Login` 组件为例，进入 `src/index.js` , 修改初始代码，就可以开始组件的开发了。

## 编写 DEMO

组件的 DEMO 演示文件，位于 `demo` 目录下，使用 `yaml-markdown` 语法。

可以修改默认的 `usage.md` ，来调整组件 DEMO，或通过增加 *.md 文件，来创建多个 DEMO。

每个 DEMO 的形式如下：

```
---
title: Simple Usage
order: 1
importStyle: true
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
````

## 发布组件

发布组件的流程实际上也就是发布一个 npm 包的过程。

> 注：如果你还没有发过 npm 包或者对 npm 包的发布流程不了解，需要先简单了解下 npm 的相关知识，这里推荐 [npm 官网](https://www.npmjs.com/)  和阮一峰写的 [npm 模块管理器](http://javascript.ruanyifeng.com/nodejs/npm.html)。

```bash
# 在 components/Login 目录下
$ npm publish
```

## 生成数据

更新物料源中的组件信息，可以在项目根目录下执行 `npm run deploy` 即可重新生成并发布物料源数据。

```bash
# 在项目根目录下
$ npm run deploy
```

附：独立的组件开发链路，可以查看[文档](https://github.com/alibaba/ice/wiki/%E7%8B%AC%E7%AB%8B%E7%BB%84%E4%BB%B6%E5%BC%80%E5%8F%91%E6%B5%81%E7%A8%8B)
