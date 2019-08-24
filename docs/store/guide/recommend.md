---
title: 使用原则
order: 2
---

以下介绍一下使用 icestore 的一些基本原则，以提升状态管理的效率与性能。

## 不要在 action 之外直接修改 state

icestore 的架构设计中强制要求对 state 的变更只能在 action 中进行。`useStore` 的返回值会返回当前 state 的浅拷贝，这有助于防止对于常规数据类型（如 string, number, boolean）的更改，但是对于引用类型（如 object, array）仍能修改，我们不建议通过这种方式直接修改 state，原因是在 action 之外修改 state 将导致 state 变更逻辑散落在 view 中，变更逻辑将会难以追踪和调试。

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

## 尽可能小的拆分 store

从 icestore 的内部设计来看，当某个 store 的 state 发生变化时，所有使用 useStore 监听 store 变化的 view 组件都会触发重新渲染，这意味着一个 store 中存放的 state 越多越可能触发更多的 view 组件重新渲染。因此从性能方面考虑，建议按照功能划分将 store 拆分成一个个独立的个体。

## 不要滥用 icestore

从工程的角度来看，store 中应该只用来存放跨页面与组件的状态。将页面或者组件中的内部状态放到 store 中将会破坏组件自身的封装性，进而影响组件的复用性。对于组件内部状态完全可以使用 useState 来实现，因此如果上面的 todo app 如果是作为工程中的页面或者组件存在的话，使用 useState 而不是全局 store 来实现才是更合理的。
