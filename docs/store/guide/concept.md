---
title: 核心概念
order: 1
---

## store 定义
icestore 的 store 由 state 与 action 组成，对于一个 store 对象，函数类型属性定义为 action，非函数类型属性定义为 state，例如一个 todo 的 store 如下示例：

```javascript
// todo.js
export default {
  dataSource: [], // state
  editingTodo: '', // state

  async fetchData() { // 异步 action
    this.dataSource = fetch('/foo/get');
  },

  add(todo) { // 同步 action
    this.dataSource.push(todo);
  },
};
```
### state

state 表示应用的状态，允许定义除函数类型外的任意数据类型，如字符串、数字、布尔值、对象、数组。

### action

action 表示改变状态的行为，支持定义同步与异步 action，在 action 中可以通过 this 访问到所有的 state 属性并对其进行修改。

## store 管理器
新建的 Icestore 对象为 store 管理器，在 store 管理器上可以注册用户定义的多个 store 对象，同时在 view 组件中可以访问 store 管理器上提供的 useStore hook。

``` javascript
import Icestore from '@ice/store';
const stores = new Icestore(); // 初始化 store 管理器实例
```

<img src="https://user-images.githubusercontent.com/5419233/63601116-6e526b80-c5f7-11e9-9e69-cad4f37e1f2c.png" width="350" />


## registerStore

store 对象定义好后，通过 registerStore 将 store 对象注册到全局的 store 管理器实例上，允许注册多个 store。

``` javascript
stores.registerStore('todos', todos); // 通过 namespace 区分不同的 store
```

## useStore

icestore 提供 useStore hook 供函数式组件使用，可以通过 useStore 的返回值获取 store 中定义的 state 和 action。在 action 被调用后会触发所有 useStore 的组件重新渲染，以保证这些组件使用到的 state 值更新到最新值，从而实现了状态的跨组件共享。

``` javascript

// viewA.jsx
const { fetchData } = stores.useStore('todo'); // 通过 namespace 访问注册的 store
useEffect(() => {
  fetchData(); //  action 调用后触发组件 viewA 和 viewB 重新渲染
}, []);

// viewB.jsx
const { dataSource } = stores.useStore('todo'); // viewA 组件中的 fetchData action 调用后触发 viewB 组件重新渲染，dataSource 值更新到最新

return (
  <div>
    {dataSource.map(item => item.name)}
  </div>
)
```


以上便是使用 icestore 需要掌握的核心概念，关于更高阶的一些用法请继续阅读后面的文档。
