---
title: 状态管理
order: 5
---

icejs 内置了状态管理方案，并在此基础上进一步遵循 **“约定优于配置”** 原则，进行抽象和封装，使得状态管理变得非常容易。

## 目录约定

icejs 支持 **全局状态** 和 **页面状态** 两种维度：

- 全局状态：即应用级别，整个应用都可以使用；
- 页面状态：即页面级状态，只能在对应页面或者页面的子组件中消费。

目录组织如下：

```md
src
├── models               // 全局状态：通常会有多个 model
|   ├── counter.ts
│   └── user.ts
└── pages
|   ├── Home
|   │   ├── index.tsx
|   │   └── model.ts     // 页面级状态：只有一个 model
|   ├── About
|   │   ├── index.tsx
|   │   ├── models       // 页面级状态：有多个 model
|   │   |   ├── foo.ts
|   │   |   └── bar.ts
└── app.ts
```

## 模型规范

### 模型定义

如上目录结构所示，icejs 约定在 `src/models`、`src/pages/*/models`、`src/pages/*/model.ts` 目录下的文件为项目定义的模型文件，每个文件需要默认导出一个对象。

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

一个可以处理该模型副作用的函数集合。这些方法以 payload 和 rootState 作为入参，适用于进行异步调用、模型联动等场景。在 effects 内部，通过调用 `this.reducerFn` 来更新模型状态。

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

+ effects: () => ({
+   async asyncDecrement() {
+     await delay(1000); // 进行一些异步操作
+     this.increment();  // 调用模型 reducers 内的方法来更新状态
+   },
+ }),
};
```

在 effects 中的 action 方法中可以通过 `dispatch[model][action]` 拿到其他模型所定义的方法。

### 模型使用

定义好 model 之后，我们就可以通过 `useModel` 传入对应的 model 名称进行使用，并返回该模型的状态（state）和调度器（dispatchers）。

```ts
useModel(name: string): [ state, dispatchers ]
```

**对于全局状态，模型文件名称对应最终 model 的 name**

```md
src
├── models               // 全局状态：通常会有多个 model
|   ├── counter.ts
│   └── user.ts
```

如上所示目录结构，我们可以通过文件名获取到对应的模型：

```diff
// 全局状态从 ice 直接引用
+ import { store as appStore } from 'ice';

export default () => {
  // 使用 counter 模型，src/models/counter.ts -> counter
+ const [counterState, counterDispatchers] = appStore.useModel('counter');

  // 使用 user 模型，src/models/user.ts -> user
+ const [userState, userDispatchers] = appStore.useModel('user');
}
```

**对于页面状态，页面模型文件名对应最终 model 的 name。**

```md
src
├── pages
|   ├── Home
|   │   ├── index.tsx
|   │   └── model.ts     // 页面级状态：只有一个 model
|   ├── About
|   │   ├── index.tsx
|   │   ├── models       // 页面级状态：有多个 model
|   │   |   ├── foo.ts
|   │   |   └── bar.ts
```

如上所示目录结构，页面模型有单个和多个的两种情况：

* 单个页面模型

```diff
  // 页面模型按照页面名称进行引用，如 pages/Home/index.tsx -> ice/Home
+ import { store as pageStore } from 'ice/Home';

export default () => {
  // 一个 model 的情况 model 名称约定为 default， 如 src/pages/Home/model.ts -> default
+ const [pageState, pageDispatchers] = pageStore.useModel('default');
}
```

* 多个页面模型

```diff
  // 页面模型按照页面名称进行引用，如 pages/About/index.tsx -> ice/About
+ import { store as aboutStore } from 'ice/About';

export default () => {
  // 多个 model 的情况，model 名称约定为文件名，如：
  // src/pages/About/models/foo.ts -> foo
  // src/pages/About/models/bar.ts -> bar
+ const [fooState, fooDispatchers] = appStore.useModel('foo');
+ const [barState, barDispatchers] = appStore.useModel('bar');
}
```

## 示例演示

接下里我们来简单演示如何编写全局状态和页面状态。

### 全局状态

全局状态位于 `src/models` 目录，假设我们需要全局管理用户状态，新建目录如下：

```
src
├── models               // 全局状态
│   └── user.ts
```

定义模型如下：

```ts
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
  effects: () => ({
    async getUserInfo () {
      await delay(1000);
      this.update({
        name: 'taobao',
        id: '123',
      });
    },
  }),
};
```

### 页面状态

页面状态位于 `src/pages/*/models` 目录，或者 `src/pages/*/model.ts` 文件中，这里演示单个 model 的使用，新建目录如下：

```md
src
├── pages
|   ├── Home
|   │   ├── index.tsx
|   │   └── model.ts     // 页面级状态：只有一个 model
```

定义模型如下：

```ts
export default {
  state: {
    title: 'Home Page'
  },
};
```

### 模型使用

定义好模型之后，就可以在 View 中使用模型状态。

**全局状态**

通过 `import { store } from 'ice'` 获取全局的 store 实例：

```tsx
// 引用全局状态
import { store } from 'ice';

const HomePage = () => {
  // 全局状态：model 名称即文件名称，如 src/models/user.ts -> user
  const [userState, userDispatchers] = store.useModel('user')

  return (
    // jsx
  );
}
```

**页面状态**

通过 `import { store } from 'ice/pageName'` 获取页面的 store 实例：

> 注释：pageName 需要替换成为当前的页面名称

```tsx
// 引用页面状态
import { store as pageStore } from 'ice/Home';

const HomePage = () => {
  // 一个 model 的情况 model 名称约定为 default， 如 src/pages/*/model.ts -> default
  const [pageState, pageDispatchers] = pageStore.useModel('default');

  return (
    // jsx
  );
}
```

大部分情况下，按照上面两个步骤的操作就可以在项目里正常的使用状态管理能力了。[完整示例代码](https://github.com/ice-lab/icejs/tree/master/examples/basic-store)

## API

### useModelState

通过该 hooks 使用模型的状态并订阅其更新。

```ts
import { store } from 'ice';

function FunctionComponent() {
  const state = store.useModelState('counter');
  console.log(state.value);
}
```

### useModelDispatchers

仅使用 Action 不使用 State。有些时候组件中只需要触发 action 不需要依赖对应的数据状态，此时可以使用 `useModelDispatchers` API。

```ts
import { store } from 'ice';

function FunctionComponent() {
  const dispatchers = store.useModelDispatchers('counter');
  // 只调用 increment 方法
  dispatchers.increment();
}
```

### useModelEffectsState

异步 Action 状态。通过 `useModelEffectsState` API 即可获取到异步请求的 loading 和 error 状态。

```ts
import { store } from 'ice';

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
import { store } from 'ice';

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

## 配置参数

```ts
import { createApp } from 'ice';

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
