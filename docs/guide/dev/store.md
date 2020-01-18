---
title: 数据状态管理
order: 5
---

状态管理通常是一个应用最复杂的部分，React 原生提供了 setState, Context 等方式来实现本地与全局状态管理，对于更复杂的业务场景，原生方案也不能完全满足需求，因此社区中产生了大量状态管理框架来解决这个问题，比较有名的诸如 Redux, Mobx，但是这些框架引入了很多概念，有不小的学习成本，而且滥用框架也会带来一定性能上的问题，因此飞冰团队从易用性与性能上出发，基于 React Hooks 设计了一款面向 React 的轻量级的状态管理方案 `icestore`，本文介绍 `icestore` 的用法与最佳实践，关于 icestore 更详尽的文档请参考 [这里](/docs/icestore/about)。

## 安装

```bash
$ npm i @ice/store --save
```

## 目录结构

对于大多数的中小型项目，推荐将项目所有 store 集中管理在全局的 `src/stores/` 目录下：

```bash
├── src/
│   ├── components/
│   │   └── NotFound/
│   ├── pages/
│   │   └── Home
│   ├── stores/
│   │   ├── storeA.js
│   │   ├── storeB.js
│   │   ├── storeC.js
│   │   └── index.js
```

如果项目比较庞大或者更倾向于 store 跟随页面维护，那么可以在每个 page 目录都声明一个 store 实例，但是这种情况建议尽量避免跨页面的 store 调用。

## 定义 store

* 首先新建一个 js 文件，在其中定义以对象形式定义 store 对象。
* 对于函数类型的属性归类为 action（动作），非函数类型归类为 state（状态）。
* 在 action 中可以通过 this 访问并修改 state。

```javascript
// src/stores/todos.js，不同 store 对应不同的 js 文件
export default {
  dataSource: [],
  async fetchData() {
    // 模拟异步请求
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve([
          { name: 'react' },
          { name: 'vue', done: true},
          { name: 'angular' },
        ]);
      }, 1000)
    );
    this.dataSource = data;
  },

  add(todo) {
    this.dataSource.push(todo);
  },
};
```

## 注册 store

* 初始化 store 实例，然后将定义好的 store 对象注册到 icestore 实例上。
* store 实例上允许注册多个 store。

```javascript
// src/stores/index.js，所有的 store 都在这里注册
import todos from './todos';
import Store from '@ice/store';

const storeManager = new Store();
const stores = storeManager.registerStores({
  todos
});

export default stores;
```

## 视图绑定

* 在函数式组件中，通过 store 实例上的 useStore hook 访问定义的 state 与 action。
* action 调用后会触发 useStore 的组件重新渲染。

```javascript
// src/index.js
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import stores from './stores';

function Todo() {
  const todos = stores.useStore('todos');
  const { dataSource, fetchData, add, } = todos;

  useEffect(() => {
    fetchData();
  }, []);

  function handleAdd(name) {
    add({ name });
  }

  if (fetchData.loading) {
    return <span>loading...</span>;
  } else {
    return (
      <div>
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
        <div>
          <input
            onKeyDown={event => {
              if (event.keyCode === 13) {
                handleAdd(event.target.value);
                event.target.value = '';
              }
            }}
            placeholder="Press Enter"
          />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Todo />, document.getElementById('root'));
```

完整示例请参考线上 [codesandbox](https://codesandbox.io/s/icestore-ts-gduqw)。
