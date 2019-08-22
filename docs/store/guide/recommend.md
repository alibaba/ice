---
title: 最佳实践
order: 4
---

以下介绍一下使用 `icestore` 推荐的一些最佳实践，以提升状态管理的效率与性能。

## 目录结构组织

对于大多数的中小型项目，推荐将项目所有 store 集中管理在 `src/stores/` 目录下：

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

如果项目比较庞大或者更倾向于 store 跟随页面维护，那么可以在每个 page 目录都声明一个 store 示例，但是这种情况建立尽量避免跨页面的 store 调用。

## 不要在 action 之外直接修改 state

`icestore` 的架构设计中强制要求对 state 的变更只能在 action 中进行。在 action 之外的对 state 的修改不生效。这个设计的原因是在 action 之外修改 state 将导致 state 变更逻辑散落在 view 中，变更逻辑将会难以追踪和调试。

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

从 `icestore` 的内部设计来看，当某个 store 的 state 发生变化时，所有使用 useStore 监听 store 变化的 view 组件都会触发重新渲染，这意味着一个 store 中存放的 state 越多越可能触发更多的 view 组件重新渲染。因此从性能方面考虑，建议按照功能划分将 store 拆分成一个个独立的个体。

## 不要滥用 `icestore`

从工程的角度来看，store 中应该只用来存放跨页面与组件的状态。将页面或者组件中的内部状态放到 store 中将会破坏组件自身的封装性，进而影响组件的复用性。对于组件内部状态完全可以使用 useState 来实现，因此如果上面的 todo app 如果是作为工程中的页面或者组件存在的话，使用 useState 而不是全局 store 来实现才是更合理的。
