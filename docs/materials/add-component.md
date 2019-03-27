---
title: 开发业务组件
order: 4
---

## 添加组件

```bash
$ cd my-materials
$ idev add component
```

根据提示输入对应的组件信息，添加完成后会在  `my-materials/components/`  目录下新增一个组件，进入到该目录下，运行以下命令进行开发，假设初始化的组件为 `Login` :

```bash
$ cd components/Login

# 启动组件服务
$ npm start
```

## 开发组件

### 组件目录

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

以上面创建的 `Login` 组件为例，进入 `src/index.js` , 修改初始代码，就可以开始组件的开发了。

### 编写 DEMO

组件的 DEMO 演示文件，位于 `demo` 目录下，使用 `yaml-markdown` 语法。

可以修改默认的 `usage.md` ，来调整组件 DEMO，或通过增加 *.md 文件，来创建多个 DEMO。

每个 DEMO 的形式如下：

```md
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
```

## 发布组件

开发完成后，按照 npm 的命令将模板发布到 npm。