---
title: 快速开始
order: 2
---

让我们使用 icestore 开发一个简单的 todo 应用，包含以下几个步骤：

## 目录组织

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

如果项目比较庞大或者更倾向于 store 跟随页面维护，那么可以在每个 page 目录都声明一个 store 实例，但是这种情况应该尽量避免跨页面的 store 调用。

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
storeManager.registerStore('todos', todos);

export default storeManager;
```

## State 与 View 绑定
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

完整示例请参考线上 [codesandbox](https://codesandbox.io/s/icestore-hs9fe)。
