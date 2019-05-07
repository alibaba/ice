---
title: 数据状态管理
order: 3
---

> 如果你的项目 React 版本不支持 Hooks（低于 16.8.0），那么推荐使用社区的 Redux, mobx, dva 等方案

在一个前端项目里，经常会出现一些全局的状态、组件间的联动等，如果都通过 props 的方式传递，时间长了代码会越来越难以维护，因此需要一个前端状态管理的方案。飞冰团队基于 React Hooks 设计了一个非常轻量简洁的数据状态管理方案 icestore，本文用来讲解如何在项目中使用 icestore。

## 安装

```bash
$ npm i icestore --save
```

## 快速上手

声明 Store：

```javascript
// src/stores/todos.js
export default {
  dataSource: [],
  async refresh() {
    this.dataSource = await (await fetch(/* api */)).json();
  },
  async action() {
    // ...
  },
  actionSync() {
    // ...
  },
};
```

注册 Store：

```js
// src/stores/index.js
import todos from './todos';
import Icestore from 'icestore';

const icestore = new Icestore();
icestore.registerStore('todos', todos);

export default icestore;
```

在 View 中使用：

```js
// src/index.js
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import stores from './stores';

function Todo() {
  const todos = stores.useStore('todos');
  const { dataSource } = todos;

  useEffect(() => {
    todos.refresh();
  }, []);

  return (
    <div>
      <h2>Todo</h2>
      <ul>
        {dataSource.map(({ name }) => (
          <li>{name}</li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(
  <Todo />,
  document.body
);
```

## 示例

- Todos：[Sandbox](https://codesandbox.io/s/2017600okp)

## 相关链接

- [icestore 代码](https://github.com/ice-lab/icestore)