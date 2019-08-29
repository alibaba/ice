---
title: 数据状态管理
order: 5
---

状态管理通常是一个应用最复杂的部分，React 原生提供了 setState, Context 等方式来实现本地与全局状态管理，对于更复杂的业务场景，原生方案也不能完全满足需求，因此社区中产生了大量状态管理框架来解决这个问题，比较有名的诸如 Redux, Mobx，但是这些框架引入了很多概念，有不小的学习成本，而且滥用框架也会带来一定性能上的问题，因此飞冰团队从易用性与性能上出发，基于 React Hooks 设计了一款面向 React 的轻量级的状态管理方案 `icestore`，本文介绍 `icestore` 的用法与最佳实践，关于 icestore 更详尽的文档请参考 [这里](/docs/icestore/about)。

## 安装

```bash
$ npm i @ice/store --save
```

## 快速开始

以下示例中我们使用 `icestore` 从头开始搭一个 todo 应用：

* 定义 store 配置，store 是一个普通的 js 对象，对象上函数类型属性对应 action，非函数类型对应 state。

```javascript
// src/stores/todos.js
export default {
  dataSource: [],
  async refresh() {
    this.dataSource = await new Promise(resolve =>
      setTimeout(() => {
        resolve([
          {
            name: "react"
          },
          {
            name: "vue",
            done: true
          },
          {
            name: "angular"
          }
        ]);
      }, 1000)
    );  },
  add(todo) {
    this.dataSource.push(todo);
  },
  remove(index) {
    this.dataSource.splice(index, 1);
  },
  toggle(index) {
    this.dataSource[index].done = !this.dataSource[index].done;
  },
};
```

* 初始化 store 实例，并且按 namespace 将定义好的 store 配置注册到 store 实例中。

```javascript
// src/stores/index.js
import todos from './todos';
import Icestore from '@ice/store';

const icestore = new Icestore();
icestore.registerStore('todos', todos);

export default icestore;
```

* 在 view 组件中，import store 实例，通过 `useStore` hook 获取 store 配置(包含 state 和 actions)，然后在 `useEffect` hook 或者事件回调中触发 actions，最后将 state 绑定到 view 模板上。

```javascript
// src/index.js
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import stores from './stores';

function Todo() {
  const todos = stores.useStore('todos');
  const { dataSource, refresh, add, remove, toggle } = todos;

  useEffect(() => {
    refresh();
  }, []);

  function onAdd(name) {
    add({ name });
  }

  function onRemove(index) {
    remove(index);
  }

  function onCheck(index) {
    toggle(index);
  }

  const noTaskView = <span>no task</span>;
  const loadingView = <span>loading...</span>;
  const taskView = dataSource.length ? (
    <ul>
      {dataSource.map(({ name, done }, index) => (
        <li key={index}>
          <label>
            <input
              type="checkbox"
              checked={done}
              onClick={() => onCheck(index)}
            />
            {done ? <s>{name}</s> : <span>{name}</span>}
          </label>
          <button onClick={() => onRemove(index)}>-</button>
        </li>
      ))}
    </ul>
  ) : (
    noTaskView
  );

  return (
    <div>
      <h2>Todos</h2>
      {!refresh.loading ? taskView : loadingView}
      <div>
        <input
          onKeyDown={event => {
            if (event.keyCode === 13) {
              onAdd(event.target.value);
              event.target.value = '';
            }
          }}
          placeholder="Press Enter"
        />
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Todo />, rootElement);
```

完整示例请参考线上的[Sandbox](https://codesandbox.io/s/icestore-hs9fe)

## 高级用法

### 使用内置的异步状态

`icestore` 中内置了对于异步action的状态支持，用户可以通过异步 action 上的 loading 和 error 属性拿到执行中与执行结果的状态，免去了在 store 中定义这些状态的冗余操作。
参考以下示例，从 `refresh` action 上可以拿到 loading 与 error 状态，在这些状态的值发生变更时 `icestore` 会通知 view 组件重新渲染。

```javascript
const todos = store.useStore('todos');
const { refresh, dataSource } = todos;

useEffect(() => {
  refresh();
}, []);

const loadingView = (
  <div>
    loading.......
  </div>
);

const taskView = !refresh.error ? (
  <ul>
   {dataSource.map(({ name }) => (
     <li>{name}</li>
   ))}
  </ul>
) : (
  <div>
    {refresh.error.message}
  </div>
);


return (
  <div>
    {!refresh.loading ? taskView : loadingView}
  <Loading />
);
```

由于 loading 状态展示是一个高频的业务需求，因此对于所有异步 action 默认开启 loading 功能，这意味着每次 loading 状态变更关联的 view 都会多刷新一次，如果用不到 loading 功能想关闭我们提供以下两种方式，其中 action 上的 disableLoading 优先级要高于 store 上的属性。

* store 上设置 disableLoading 属性

```javascript
  store.disableLoading = true;
```
* action 调用前设置 disableLoading 属性

```javascript
  todos.refresh.disableLoading = true;
  todos.refresh();
```

## 最佳实践

### 不要在 action 之外直接修改 state

`icestore` 的架构设计中强制要求对state的变更只能在 action 中进行。在 action 之外的对 state的修改将直接 throw 错误。这个设计的原因是在 action 之外修改 state 将导致 state 变更逻辑散落在 view 中，变更逻辑将会难以追踪和调试。

```javascript
  // store.js
  export default {
    inited: false,
    setInited() {
      this.inited = true;
    }
  }

  // view.js
  const todos = useStore('todos');

  useEffect(() => {
    // bad
    todos.inited = true;

    // good
    todos.setInited();
  });
```

### 尽可能小的拆分 store

从 `icestore` 的内部设计来看，当某个 store 的 state 发生变化时，所有使用 useStore 监听 store 变化的 view 组件都会触发重新渲染，这意味着一个 store 中存放的 state 越多越可能触发更多的 view 组件重新渲染。因此从性能方面考虑，建议按照功能划分将 store 拆分成一个个独立的个体。

### 不要滥用 `icestore`

从工程的角度来看，store 中应该只用来存放跨页面与组件的状态。将页面或者组件中的内部状态放到 store 中将会破坏组件自身的封装性，进而影响组件的复用性。对于组件内部状态完全可以使用 useState来实现，因此如果上面的 todo app 如果是作为工程中的页面或者组件存在的话，使用 useState 而不是全局 store 来实现才是更合理的。

## 相关链接

- [icestore GitHub 仓库](https://github.com/ice-lab/icestore)
