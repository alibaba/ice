---
title: 状态管理
order: 6
---

icejs 内置了状态管理方案，并在此基础上进一步遵循 **“约定优于配置”** 原则，进行抽象和封装，使得状态管理变得非常容易。

## 全局应用状态

### 定义 Model

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

### 初始化 Store

```ts
// src/store.ts
import { createStore } from 'ice';
import user from './models/user';
import project from './models/project';

const store = createStore({
  user,
  project,
}, {
  // options
});

export default store;
```

`createStore()` 支持的 options:

- disableImmer：布尔值，可选，默认值 false，如果设置为 true，那么 immer 将被禁用，这意味着不能再在 reducers 中直接改变状态，而是必须返回新的状态。
- disableError：布尔值，可选，默认值 false，如果设置为 true，则 `UseModelEffectsError` 和 `WithModelEffectsError` 将不可用。
- disableLoading：布尔值，可选，默认值 false，如果设置为 true，则 `useModelEffectsLoading` 和 `withModelEffectsLoading` 将不可用。

### 在 View 中使用模型状态

```diff
+ import store from '@/store';

const HomePage = () => {
+  const [userState, userDispatchers] = store.useModel('user');

  return (
    <>
      <span>{userState.id}</span>
      <span>{userState.name}</span>
    </>
  );
}
```

## 页面级状态

页面状态只能在该页面下的组件中使用，无法跨页面使用。约定页面状态在 `src/pages/*/models` 中定义。

目录组织如下：

```diff
src
├── models                  // 全局状态
│   └── user.ts
└── pages
|   ├── Home                // Home 页面
+|   │   ├── models          // 页面状态
+|   │   |   ├── foo.ts
+|   │   |   └── bar.ts
+|   │   ├── store.ts
|   │   └── index.tsx
└── app.ts
```

定义模型如下：

```ts
// src/pages/Home/models/foo.ts
export default {
  state: {
    title: 'Hello'
  }
};
```

初始化 Store 实例：

```ts
// src/pages/Home/store.ts
import { createStore } from 'ice';
import foo from './models/foo';

const store = createStore({ foo });

export default store;
```

在页面组件中使用模型状态：

```tsx
// 引用页面状态
import pageStore from '@/pages/Home/store';

const HomePage = () => {
  const [pageState, pageDispatchers] = pageStore.useModel('foo');
  return (
    <>{pageState.title}</>  // Hello
  );
}
```

某些复杂场景会出现嵌套页面的情况，即 `src/pages/Home` 下**包含多个路由页面**，目录组织如下：

```md
src
└── pages
│   ├── Home                 // Home 页面包含了 Foo、Bar 等多个路由页面
│   │   ├── Foo        
│   │   ├── Bar
│   │   ├── Layout           // 页面布局
│   │   │  └── index.tsx
│   │   ├── models           // 页面状态
│   │   │   ├── Foo.ts
│   │   │   └── Bar.ts
│   │   ├── index.tsx
│   │   └── store.ts
└── app.ts
```

对于嵌套页面，框架会将 store 的 Provider 包裹在 `Layout/index.tsx` 上，因此需要保证该文件的存在并配置在 `src/routes.ts` 中：

```diff
// src/routes.ts
+import HomeLayout from '@/pages/Home/Layout';
import Foo from '@/pages/Home/Foo';
import Bar from '@/pages/Home/Bar';
import About from '@/pages/About';

export default [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/home',
+        component: HomeLayout,
        children: [
          {
            path: '/foo',
            component: Foo
          },
          {
            path: '/bar',
            component: Bar
          },
        ]
      },
      {
        path: '/about',
        component: About,
      }
    ]
  }
]
```

对于嵌套页面的状态管理，在对应的页面下需要新增 Layout 文件，用于 icejs 自动注册 Provider，其它与非嵌套页面一致。

## 参阅资料

### 设置初始状态

```ts
import { runApp } from 'ice';

const appConfig = {
  store: {
    // 可选，初始化状态
    initialStates: {}
  }
};

runApp(appConfig);
```

> API `store.getInitialStates` 已废弃，推荐使用 `store.initialStates`

> SSR 场景下 `initialData.initialStates` 会默认赋值给 `store.initialStates`

> 页面级状态目前不支持设置 initialStates

### TypeScript 类型提示

编写类型有助于更好的代码提示，类型定义步骤如下：

* 创建 Store 实例

```diff
// src/store.ts
import { createStore, IStoreModels, IStoreDispatch, IStoreRootState } from 'ice';
import user from './models/user';
import porject from './models/porject';

+interface IAppStoreModels extends IStoreModels {
+  user: typeof user;
+  project: typeof project;
+};

+const appModels: IAppStoreModels = {
+  user,
+  project,
+};

export default createStore(appModels);

+export type IRootDispatch = IStoreDispatch<typeof appModels>;
+export type IRootState = IStoreRootState<typeof appModels>;
```

* 定义状态模型

```diff
// src/models/user.ts
+import { IRootState, IRootDispatch } from '@/store';

const user = {
  state: [],
  reducers: {},
+  effects: ((dispatch: IRootDispatch) => ({
+    like(playload, rootState: IRootState) {
+      dispatch.project.foo(payload); // 调用其他 model 的 effects/reducers
+      rootState.project.title;       // 获取其他 model 的 state
+    }
+  })
};
```

### model 定义详细说明

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
  state: { count: 0, list: [] },

+ reducers: {
+   increment (prevState, payload) {
+     // 
+     prevState.count += 1;
+     prevState.list.push(1);
+   },
+   decrement (prevState) {
+     prevState.count += 1;
+   }
+ }
}
```

> icestore 默认内置了 immer，因此 reducer 中直接修改数据即可，无需返回新对象

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
      prevState.count += 1;
    },
    decrement (prevState) {
      prevState.count -= 1;
    }
  },

+ effects: (dispatch) => ({
+   async asyncDecrement() {
+     await delay(1000);             // 进行一些异步操作
+     this.increment();              // 调用模型 reducers 内的方法来更新状态
+   },
+ }),
};
```

### model 之间通信

> 注意：如果两个 model 不属于同一个 store 实例，是无法通信的

```diff
// src/models/user
export default {
  state: {
    name: '',
    tasks: 0,
  },
  effects: () => ({
    async refresh() {
      const data = await fetch('/user');
+      // 通过 this.foo 调用自身的 reducer
+      this.setState(data);
    },
  }),
};

// src/models/tasks
export default {
  state: [],
  effects: (dispatch) => ({
    async refresh() {
      const data = await fetch('/tasks');
      this.setState(data);
    },
    async add(task) {
      await fetch('/tasks/add', task);
+      // 调用另一个 model user 的 effects
+      await dispatch.user.refresh();
+      // 通过 this.foo 调用自身的 effects
+      await this.refresh();
    },
  }),
};
```

在 effects 里的 action 方法中可以通过 `dispatch[model][action]` 拿到其他模型所定义的方法。

> 如果遇到 `this.foo` 的 ts 类型错误，请参考文档 [icestore QA](https://github.com/ice-lab/icestore/blob/master/docs/qna.zh-CN.md) 进行修复

> setState 是 icestore 内置的一个 reducer，可以直接使用

### 获取 effects 的状态 loading/error

通过 `useModelEffectsState` API 即可获取到 effects 的 loading 和 error 状态。

```diff
import store from '@/store';

function FunctionComponent() {
  const [state, dispatchers] = store.useModel('counter');
+  const effectsState = store.useModelEffectsState('counter');

  useEffect(() => {
    dispatchers.asyncDecrement();
  }, []);

+  console.log(effectsState.asyncDecrement.isLoading); // loading
+  console.log(effectsState.asyncDecrement.error);  // error
}
```

### 在 Class Component 中使用

useModel 相关的 API 基于 React 的 Hooks 能力，仅能在 Function Component 中使用，通过 `withModel` API 可以实现在 Class Component 中使用。

```ts
import store from '@/store';

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

## 版本变更说明

icejs@1.9.7 版本开始框架推荐开发者自行初始化 store，这样可以更灵活的定制一些参数，相对之前方案带来的改变：

* 开发者需要自行在 store.ts 中初始化 store 实例，框架默认不初始化

```ts
// src/store.ts
import { createStore } from 'ice';
import user from './models/user';
import project from './models/project';

const store = createStore({
  user,
  project,
});

export default store;
```

* 引入 store 的路径发生了变化：

```diff
// 全局状态
- import { store } from 'ice';
+ import store from '@/store';

// 页面级状态
- import { store } from 'ice/Home';
+ import store from '@/pages/Home/store';
```

对于之前的版本我们做了向前兼容，只有当项目里存在 `src/store.ts` 或者 `src/pages/*/store.ts` 时才会触发新的方案，如果之前项目里刚好存在同名文件则有可能触发 break change。
