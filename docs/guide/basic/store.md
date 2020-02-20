---
title: 状态管理
order: 5
---

框架内置集成了 icestore 状态管理方案，并在此基础上进一步遵循 “约定优于配置” 原则，进行抽象和封装，使得状态变得非常容易，只需要定义一个 model 即可。

## 目录约定

框架规范和约定了应用的状态主要分为 **全局状态** 和 **页面状态**，目录组织如下：

```md
src
├── models               // 全局状态：通常会有多个 model
|   ├── foo.ts
│   └── user.ts
└── pages
├── Home
|   │   ├── index.tsx
|   │   └── model.ts     // 页面级状态：通常只有一个 model
|   ├── Dashboard
|   │   ├── index.tsx
│   |   └── model.ts
└── app.ts
```

## 状态声明

状态定义方式如下：

```ts
// src/models/todos.ts
const todos = {
  state: {
    dataSource: [],
  },
  actions: {
    async fetch(prevState, actions) {
      await delay(1000);
      const dataSource = [
        { name: 'react' },
        { name: 'vue', done: true},
        { name: 'angular' },
      ];
      return {
        ...prevState,
        dataSource,
      }
    },
    add(prevState, todo) {
      return {
        ...prevState,
        dataSource: [
          ...prevState.dataSource,
          todo,
        ]
      };
    },
  },
};

export default todos;
```

## 视图绑定状态

定义好全局状态和页面级状态后，在视图中即可获取定义好的数据：

```tsx
// pages/Home/index.jsx
import { store as appStore } from 'ice';
import { store as pageStore } from 'ice/Home';

const HomePage = () => {
  // 全局状态：model 名称即文件名称 user.ts -> user
  const [ userState, userAction ] = appStore.useModel('todos');

  // 页面状态：一个 model 的情况 model 名称约定为 default
  const [ pageState, pageAction ] = pageStore.useModel('default');

  // 页面状态：多个 model 的情况，model 名称即文件名
  const { store: pageStore } = usePage();
  const [ fooState, fooAction ] = pageStore.useModel('foo');

  return (
    <>
      // jsx code
    </>
  );
}
```

更多使用详见：[icestore](https://github.com/ice-lab/icestore)
