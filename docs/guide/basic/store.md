---
title: 状态管理
order: 5
---

icejs 内置了状态管理方案，并在此基础上进一步遵循 **“约定优于配置”** 原则，进行抽象和封装，使得状态管理变得非常容易。

> 说明：该文档适用于 ice.js@1.9.7 及以上版本，如果非该版本请参考 [状态管理](https://github.com/alibaba/ice/blob/v1.9.6/docs/guide/basic/store.md)；差异点主要在于 1.9.7 版本之后推荐自定义创建 Store 实例用于透传参数，与老版本完全兼容。

### 全局状态

约定全局状态位于 `src/models` 目录，目录结构如下：

```md
src
├── models               // 全局状态
|   ├── counter.ts
│   └── user.ts
└── store.ts
```

假设我们需要全局管理用户状态，定义模型如下：

```ts
// src/models/user.ts
export const delay = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

export default {
  // 定义 model 的初始 state
  state: {
    name: '',
    id: ''
  },

  // 定义改变该模型状态的纯函数
  reducers: {
    update (prevState, payload) {
      return {
        ...prevState,
        ...payload,
      };
    },
  },

  // 定义处理该模型副作用的函数
  effects: (dispatch) => ({
    async getUserInfo () {
      await delay(1000);
      dispatch.user.update({
        name: 'taobao',
        id: '123',
      });
    },
  }),
};
```

自定义创建 Store 实例：

```ts
// src/store.ts
import { createStore } from 'ice';
import user from './models/user';

const store = createStore({ user });

export default store;
```

在 View 中使用模型状态：

```tsx
// 引用全局状态
import { store } from '@/store';

const HomePage = () => {
  // 使用 user 模型
  const [userState, userDispatchers] = store.useModel('user');

  return (
    <>
      <span>{userState.id}</span>
      <span>{userState.name}</span>
    </>
  );
}
```

### 页面状态

> 注意：页面状态只能在该页面下使用，无法跨页面使用。

约定页面状态位于 `src/pages/*/models` 目录。

但通常情况下应用的复杂度不一，对页面的状态管理和目录组织方式也有着不同的诉求，因此 icejs 提供了两种组织方式用于开发可大可小的应用。

#### 非嵌套页面

非嵌套页面即 `src/pages` 下的页面只**包含一个路由页面**，目录组织如下：

```md
src
├── models                  // 全局状态
│   └── user.ts
└── pages
|   ├── Home                // Home 页面
|   │   ├── models          // 页面状态
|   │   |   ├── foo.ts
|   │   |   └── bar.ts
|   │   ├── store.ts
|   │   └── index.tsx
└── app.ts
```

定义模型如下：

```ts
// src/pages/Home/models/foo.ts
export default {
  state: {
    title: 'Foo'
  }
};
```

自定义创建 Store 实例：

```ts
// src/pages/Home/store.ts
import { createStore } from 'ice';
import foo from './models/foo';

const store = createStore({ foo });

export default store;
```

在 View 中使用模型状态：

```tsx
// 引用页面状态
import { store as pageStore } from '@/pages/Home/store';

const HomePage = () => {

  const [pageState, pageDispatchers] = pageStore.useModel('foo');

  return (
    <>{foo.title}</>
  );
}
```

#### 嵌套页面

嵌套页面即 `src/pages` 下的页面**包含多个路由页面**，目录组织如下：

```md
src
├── models                   // 全局状态
|   ├── counter.ts
│   └── user.ts
└── pages
│   ├── Home                 // Home 页面包含了 Foo、Bar 等多个路由页面
│   │   ├── Foo        
│   │   ├── Bar
│   │   ├── Layout           // 页面布局
│   │   ├── models           // 页面状态
│   │   │   ├── Foo.ts
│   │   │   └── Bar.ts
│   │   └── store.ts
└── app.ts
```

对于嵌套页面的状态管理，在对应的页面下需要新增 Layout 文件，用于 icejs 自动注册 Provider，其它与非嵌套页面一致。

## 模型规范

### 模型定义

如上示例所述，icejs 约定在 `src/models`、`src/pages/*/models` 目录下的文件为项目定义的模型文件，每个文件需要默认导出一个对象。

通常模型定义包括 state、reducers、effects 三部分：

```ts
export default {
  state: {},

  reducers: {},

  effects: {}
}
```

**state**

model 的初始 state

```diff
export default {
+ state: { count: 0 }
}
```

**reducers**

```ts
reducers: { [string]: (prevState, payload) => any }
```

一个改变该模型状态的函数集合。这些方法以模型的上一次 prevState 和一个 payload 作为入参，在方法中使用可变的方式来更新状态。这些方法应该是仅依赖于 prevState 和 payload 参数来计算下一个 nextState 的纯函数。对于有副作用的函数，请使用 effects。

```diff
export default {
  state: { count: 0 },

+ reducers: {
+   increment (prevState, payload) {
+     return { count: prevState.count + 1 };
+   },
+   decrement (prevState) {
+     return { count: prevState.count - 1 };
+   }
+ }
}
```

**effects**

```ts
effects: (dispatch) => ({ [string]: (payload, rootState) => void })
```

一个可以处理该模型副作用的函数集合。这些方法以 payload 和 rootState 作为入参，适用于进行异步调用、模型联动等场景。

```diff
export default {
  state: { count: 0 },

  reducers: {
    increment (prevState, payload) {
      return { count: prevState.count + 1 };
    },
    decrement (prevState) {
      return { count: prevState.count - 1 };
    }
  },

+ effects: (dispatch) => ({
+   async asyncDecrement() {
+     await delay(1000);             // 进行一些异步操作
+     dispatch.counter.increment();  // 调用模型 reducers 内的方法来更新状态
+   },
+ }),
};
```

在 effects 中的 action 方法中可以通过 `dispatch[model][action]` 拿到其他模型所定义的方法。

### 创建 Store 实例

定义好 model 之后，我们需要自定义创建 Store 实例。

```ts
// ./src/store.ts
import { createStore } from 'ice';
import counter from './models/counter';

const store = createStore({ counter });

export default store;
```

### 模型使用

定义好 model 之后，我们就可以通过 `useModel` 传入对应的 model 名称进行使用，并返回该模型的状态（state）和调度器（dispatchers）。

```ts
useModel(name: string): [ state, dispatchers ]
```

```diff
// 全局状态引用
+ import { store as appStore } from '@/store';

export default () => {
+ const [counterState, counterDispatchers] = appStore.useModel('counter');

  return (
    <>{counterState.count}</>
  )
}
```

## API

### createStore

该方法用于创建 Store。

```ts
createStore(models, options);
```

**options**

- disableImmer (布尔值, 可选, 默认值=false)

如果将此设置为true，那么 immer 将被禁用，这意味着您不能再在 reducers 中直接改变状态，而是必须返回新的状态。

- disableError (布尔值, 可选, 默认值=false)

如果将此设置为true，则 `UseModelEffectsError` 和 `WithModelEffectsError` 将不可用。仅当您非常关注性能或故意抛出错误时才启用该选项。

- disableLoading (布尔值, 可选, 默认值=false)

如果将此设置为true，则 `useModelEffectsLoading` 和 `withModelEffectsLoading` 将不可用。

### useModelState

通过该 hooks 使用模型的状态并订阅其更新。

```ts
import { store } from '@/store';

function FunctionComponent() {
  const state = store.useModelState('counter');
  console.log(state.value);
}
```

### useModelDispatchers

仅使用 Action 不使用 State。有些时候组件中只需要触发 action 不需要依赖对应的数据状态，此时可以使用 `useModelDispatchers` API。

```ts
import { store } from '@/store';

function FunctionComponent() {
  const dispatchers = store.useModelDispatchers('counter');
  // 只调用 increment 方法
  dispatchers.increment();
}
```

### useModelEffectsState

异步 Action 状态。通过 `useModelEffectsState` API 即可获取到异步请求的 loading 和 error 状态。

```ts
import { store } from '@/store';

function FunctionComponent() {
  const [state, dispatchers] = store.useModel('counter');
  const effectsState = store.useModelEffectsState('counter');

  useEffect(() => {
    dispatchers.asyncDecrement();
  }, []);

  // loading
  console.log(effectsState.asyncDecrement.isLoading);

  // error
  console.log(effectsState.asyncDecrement.error);
}
```

### withModel

在 Class Component 中使用。useModel 相关的 API 基于 React 的 Hooks 能力，仅能在 Function Component 中使用，通过 `withModel` API 可以实现在 Class Component 中使用。

```ts
import { store } from '@/store';

class TodoList extends React.Component {
  render() {
    const { todos } = this.props;
    const [ state, dispatchers ] = todos;
    // ...
  }
}

export default store.withModel('todos')(TodoList);
// 绑定多个 model
// export default withModel('user')(withModel('todos')(TodoList));
```

同时，也可以使用 `withModelDispatchers` 以及 `withModelEffectsState` API。

[完整 API 文档](https://github.com/ice-lab/icestore/blob/master/docs/api.md)

## 类型提示
 
编写类型有助于更好的代码提示，类型定义步骤如下：

* 创建 Store 实例

```ts
// src/store.ts
import { createStore, IStoreModels, IStoreDispatch, IStoreRootState } from 'ice';
import user from './models/user';

interface IAppStoreModels extends IStoreModels {
  user: typeof user;
};

const appModels: IAppStoreModels = {
  user
};

export default createStore(appModels);

// 导出 IRootDispatch 类型
export type IRootDispatch = IStoreDispatch<typeof appModels>;

// 导出 IRootState 类型
export type IRootState = IStoreRootState<typeof appModels>;
```

* 定义状态模型

```diff
// src/models/user.ts
+import { IRootState, IRootDispatch } from '@/store';

const user = {
  state: [],
  reducers: {},
+ effects: (dispatch: IRootDispatch => ({
+   like(playload, rootState: IRootState) {

    }
  })
};
```

## 设置初始状态

```ts
import { runApp } from '@/store';

const appConfig = {
  store: {
    // 可选，初始化状态
    initialStates: {};

    // 已废弃
    // 可选，获取初始状态，在 SSR 场景下会将 getInitialData 返回的数据作为入参
    getInitialStates: (initialData) => {
      return initialData;
    };
  }
};

createApp(appConfig);
```

## 版本变更说明

如果在控制台看到关于 store 的警告信息，可以参考 [升级指南](https://github.com/ice-lab/icestore/blob/master/docs/upgrade-guidelines.zh-CN.md) 进行迁移。
