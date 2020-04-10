---
title: 状态管理
order: 5
---

icejs 内置集成了 icestore 状态管理方案，并在此基础上进一步遵循 “约定优于配置” 原则，进行抽象和封装，使得状态管理变得非常容易。

## 目录约定

icejs 支持 **全局状态** 和 **页面状态** 两种纬度：

- 全局状态：应用级别，整个应用都可以使用
- 页面状态：只针对单个页面，比如 `src/pages/Home`，仅在 `Home/` 中可以被使用

目录组织如下：

```md
src
├── models               // 全局状态：通常会有多个 model
|   ├── counter.ts
│   └── user.ts
└── pages
|   ├── Home
|   │   ├── index.tsx
|   │   └── model.ts     // 页面级状态：通常只有一个 model
|   ├── About
|   │   ├── index.tsx
│   |   └── model.ts
└── app.ts
```

## 状态声明

状态定义方式如下：

```ts
// src/models/counter.ts
import { IRootDispatch } from 'ice';

const delay = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

export default {
  state: {
    count: 0
  },

  reducers: {
    increment (prevState) {
      prevState.count += 1;
    },
    decrement (prevState) {
      prevState.count -= 1;
    }
  },

  effects: (dispatch: IRootDispatch) => ({
    async decrementAsync () {
      await delay(10);
      dispatch.counter.decrement();
    },
  }),
};
```

## 视图绑定状态

定义好全局状态和页面级状态后，在视图中即可获取定义好的数据：

```tsx
// pages/Home/index.tsx
import { store as appStore } from 'ice';
import { store as pageStore } from 'ice/Home';

const HomePage = () => {
  // 1. 全局状态：model 名称即文件名称，如 src/models/counter.ts -> counter
  const [ counterState, counterDispatchers ] = appStore.useModel('counter')

  // 2. 页面状态：一个 model 的情况 model 名称约定为 default， 如 src/pages/*/model.ts -> default
  // const [ pageState, pageDispatchers ] = pageStore.useModel('default');

  // 3. 页面状态：多个 model 的情况，model 名称即文件名，如 src/pages/*/models/foo.ts -> foo
  // const [ fooState, fooDispatchers ] = pageStore.useModel('foo');

  return (
    <>
      <button type="button" onClick={counterDispatchers.increment}>+</button>
      <span>{counterState.count}</span>
      <button type="button" onClick={counterDispatchers.decrementAsync}>-</button>
    </>
  );
}
```

大部分情况下，按照上面两个步骤的操作就可以在项目里正常的使用状态管理能力了。

## 配置参数

```ts
import { createApp } from 'ice';

const appConfig = {
  store: {
    // 可选，初始化状态
    initialStates: {};

    // 可选，获取初始状态，在 SSR 场景下会将 getInitialData 返回的数据作为入参
    getInitialStates: (initialData) => {
      return initialData;
    };
  }
};

createApp(appConfig);
```

## 高阶能力

### 仅使用 Action 不使用 State

有些时候组件中只需要触发 action 不需要依赖对应的数据状态，此时可以使用 `useModelDispatchers` API：

```ts
import { store } from 'ice';

function FunctionComponent() {
  // 只调用 increment 方法
  const dispatchers = store.useModelDispatchers('counter');
  dispatchers.increment();
}
```

### 异步 Action 状态

通过 `useModelEffectsState` API 即可获取到异步请求的 loading 和 error 状态：

```ts
import { store } from 'ice';

function FunctionComponent() {
  const [state, dispatchers] = store.useModel('counter');
  const effectsState = store.useModelEffectsState('counter');

  useEffect(() => {
    dispatchers.decrementAsync();
  }, []);

  effectsState.decrementAsync.isLoading;
  effectsState.decrementAsync.error;
}
```

### 模型联动

在 effects 中的 action 方法中可以通过 `dispatch[model][action]` 拿到其他模型所定义的方法：

```tsx
import { IRootDispatch } from 'ice';

// src/models/user.ts
export default {
  state: {
    name: '',
    id: ''
  },

  reducers: {
    update(prevState, payload) {
      return {
        ...prevState,
        ...payload,
      };
    },
  },

  effects: (dispatch: IRootDispatch) => ({
    async getUserInfo(payload, rootState) {

      // 调用 counter 模型的 decrement 方法
      dispatch.counter.decrement();

      // 调用当前模型的 update 方法
      dispatch.user.update({
        name: 'taobao',
        id: '123',
      });
    },
  }),
};

```

### 在 Class Component 中使用

useModel 相关的 API 基于 React 的 Hooks 能力，仅能在 Function Component 中使用，通过 `withModel` API 可以实现在 Class Component 中使用：

```ts
import { store } from 'ice';

class TodoList extends React.Component {
  render() {
    const { todos } = this.props;
    const [ state, dispatchers ] = todos;

    state.todos;
    dispatchers.add({ /* ... */});
  }
}

export default store.withModel('todos')(TodoList);
// 绑定多个 model
// export default withModel('user')(withModel('todos')(TodoList));
```

同时，也可以使用 `withModelDispatchers` 以及 `withModelEffectsState` API。

* [完整示例代码](https://github.com/ice-lab/icejs/tree/master/examples/basic-store)
* [完整 API 文档](https://github.com/ice-lab/icestore/blob/master/docs/api.md)

## 版本变更说明

如果在控制台看到关于 store 的警告信息，可以参考 [升级指南](https://github.com/ice-lab/icestore/blob/master/docs/upgrade-guidelines.zh-CN.md) 进行迁移。
