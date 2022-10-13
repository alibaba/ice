---
title: 状态管理
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<details open>
  <summary>示例</summary>
  <ul>
    <li>
      <a href="https://github.com/ice-lab/ice-next/tree/master/examples/with-store" target="_blank" rel="noopener noreferrer">
        with-store
      </a>
    </li>
  </ul>
</details>

ice.js 基于 [icestore](https://github.com/ice-lab/icestore) ，提供主流的状态管理解决方案，以更好管理复杂的状态管理逻辑。

## 开启状态管理

安装插件：

```bash
$ npm i @ice/plugin-store -D
```

在 `ice.config.mts` 中添加插件：

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';
import store from '@ice/plugin-store';

export default defineConfig({
  plugins: [
    store(),
  ],
});
```

## 全局状态

推荐在不同页面组件中共享的状态存放在全局状态中，比如主题、国际化语言、用户信息等。

### 定义 Model

约定在 `src/models` 目录定义全局状态。以定义全局用户状态为例：

```ts title="src/models/user.ts"
import { createModel } from 'ice';

interface User {
  name: string;
  id: string;
}

export default createModel({
  // 定义  model 的初始 state
  state: {
    name: '',
    id: '',
  } as User,
  // 定义改变该 model 状态的纯函数
  reducers: {
    update(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  // 定义处理该 model 副作用的函数
  effects: (dispatch) => ({
    async getUserInfo() {
      await delay(1000);
      this.update({
        name: 'taobao',
        id: '123',
      });
    },
  }),
})
```

### 初始化 Store

约定在 `src/store.ts` 中初始化 Store：

```ts title="src/store.ts"
import { createStore } from 'ice';
import user from './models/user';

export default createStore({ user });
```

### 在组件中使用

```diff
import { useEffect } from 'react';
+ import store from '@/store';

export default function Home() {
+ const [userState, userDispatchers] = store.useModel('user');

+ useEffect(() => {
+   // 触发 dispatcher 获取数据并修改 state
+   userDispatchers.getUserInfo()
+ }, [])
  return (
    <>
+     <span>{userState.id}</span>
+     <span>{userState.name}</span>
    </>
  );
}
```

## 页面状态

:::caution

页面状态只能在该页面下的组件中使用，无法跨页面使用。
:::

### 定义 Model

约定在当前路由目录下新建 models 目录并定义 Model：

```diff
 src
 └── pages
 |   ├── home                // /home 页面
+|   │   ├── models          // 定义 model
+|   │   |   └── info.ts
 |   │   └── index.tsx
```

定义 Model 如下：
```ts title="src/pages/home/models/info.ts"
import { createModel } from 'ice';

export default createModel({
  state: {
    title: '',
  },
  reducers: {
    update(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
});
```

### 初始化 Store

约定在当前路由目录下新建 store 文件：

```diff
 src
 └── pages
 |   ├── home                // /home 页面
 |   │   ├── models          // 定义 model
 |   │   |   └── info.ts
+|   │   ├── store.ts       // 创建 store
 |   │   └── index.tsx
```

```ts title="src/pages/home/store.ts"
import { createStore } from 'ice';
import info from './models/info';

const store = createStore({ info });

export default store;
```

### 在组件中使用

```diff title="src/pages/home/index.tsx"
import { useEffect } from 'react';
+ import homeStore from './store';

export default function Home() {
+ const [infoState, infoDispatchers] = homeStore.useModel('info');

+ useEffect(() => {
+   infoDispatchers.update({ title: 'ICE' })
+ }, [])
  return (
+   <h1>{infoState.title}</h1>
  );
};
```

## 进阶用法 

### 设置初始状态

:::caution

页面级状态目前不支持设置 `initialStates`。

:::

假设我们有 `user` 和 `counter` 两个 Model：

<Tabs>
<TabItem value="store" label="src/store.ts">

```ts
import { createStore } from 'ice';
import user from './models/user';
import counter from './models/counter';

export default createStore({ user, counter });
```

</TabItem>
<TabItem value="user" label="src/models/user.ts">

```ts
import { createModel } from 'ice';

export default createModel({ 
  state: {
    name: '',
  }
});
```

</TabItem>
<TabItem value="counter" label="src/models/counter.ts">

```ts
import { createModel } from 'ice';

export default createModel({ 
  state: {
    count: 0,
  }
});
```

</TabItem>
</Tabs>

我们可以在 `src/app.ts` 中设置两个 Model 初始状态：

```ts title="src/app.ts"
import { defineStoreConfig } from '@ice/plugin-store/esm/runtime';

export const store = defineStoreConfig(async () => {
  // 模拟请求后端数据
  // const data = (await fetch('your-url')).json();
  return {
    initialStates: {
      // initialStates 键值与 createStore 的第一个入参键值保持一致
      user: {
        name: 'ice.js',
      },
      counter: {
        count: 1
      }
    },
  };
});
```

### Model 定义详细说明

插件约定在 `src/models`、`src/pages/**/models` 目录下的文件为项目定义的 model 文件，每个文件需要默认导出一个对象。


#### state

定义 Model 的初始 state：
```ts
import { createModel } from 'ice';

export default createModel({
 state: { count: 0 },
})
```

#### reducers

```ts
type Reducers = { 
  [k: string]: (state, payload) => any;
};
```

一个改变该模型状态的函数集合。这些方法以模型的上一次 `state` 和一个 `payload`（调用 reducer 时传入的参数）作为入参，在方法中使用可变的方式来更新状态。 这些方法应该是仅依赖于 `state` 和 `payload` 参数来计算下一个 `state` 的纯函数。对于有副作用的函数，请使用 [`effects`](#effects) 。

```ts
import { createModel } from 'ice';

export default ({
  state: { count: 0, list: [] },

  reducers: {
    increment (state, payload) {
      const newList = state.list.slice();
      newList.push(payload);
      const newCount = state.count + 1;
      return { ...state, count: newCount, list: newList }
    },
    decrement (state) {
      return { ...state, count: state.count - 1 }
    }
  }
}
```

#### effects

```ts
type Effects = (dispatch) => ({ [string]: (payload, rootState) => void })
```

一个可以处理该模型副作用的函数集合。这些方法以 `payload` 和 `rootState`（当前模型的 state） 作为入参，适用于进行异步调用、模型联动等场景。


```ts
import { createModel } from 'ice';

export default createModel({
  reducers: {
    increment() {
      // ...
    }
  },
  effects: (dispatch) => ({
    async asyncDecrement() {
      const list = (await fetch('your-url')).json();  // 进行一些异步操作
      this.increment(list);                               // 调用模型 reducers 内的方法来更新状态
    },
  }),
})
```

### Model 之间通信

:::caution

如果两个 Model 不属于同一个 Store 实例，是无法通信的

:::

<Tabs>
<TabItem value="user" label="src/models/user.ts">

```ts
// src/models/user.ts
import { createModel } from 'ice';

export default createModel({
  state: {
    name: '',
    tasks: 0,
  },
  effects: () => ({
    async refresh() {
      const data = (await fetch('/user')).json();
      // 通过 this.foo 调用自身的 reducer
      this.setState(data);
    },
  }),
});
```
</TabItem>
<TabItem value="task" label="src/models/tasks.ts">

```ts
// src/models/tasks.ts
export default {
  state: [],
  effects: (dispatch) => ({
    async refresh() {
      const data = await fetch('/tasks');
      this.setState(data);
    },
    async add(task) {
      await fetch('/tasks/add', task);
      // 调用另一个 model user 的 effects
      await dispatch.user.refresh();
      // 通过 this.foo 调用自身的 effects
      await this.refresh();
    },
  }),
};
```

</TabItem>
</Tabs>


### 使用不可变状态

Redux 默认的函数式写法在处理一些复杂对象的 state 时会非常繁琐。推荐使用 [immer](https://immerjs.github.io/immer/) 的方式来操作 state：

```diff
import { createModel } from 'ice';

export default createModel({
  state: {
    tasks: ['A Task', 'B Task'],
    detail: {
      name: 'Bob',
      age: 3,
    },
  },
  reducers: {
    addTasks(state, payload) {
-     return {
-       ...state,
-       tasks: [ ...state.tasks, payload ],
-     },
+     state.tasks.push(payload);
    },
    updateAge(state, payload) {
-     return {
-       ...state,
-       detail: {
-         ...state.detail,
-         age: payload,
-       },
-     },
+     state.detail.age = payload;
    }
  }
})
```

注意：因为 immer 无法支持字符串或数字这样的简单类型，因此如果 state 符合这种情况（极少数）则不支持通过 immer 操作，必须使用 Redux 默认的函数式写法（返回一个新值）：

```diff
import { createModel } from 'ice';

export default createModel({
  state: 0,
  reducers: {
    add(state) {
-     state += 1;
+     return state += 1;
    },
  },
})
```

### 获取内置的加载状态和错误状态

通过 `useModelEffectsState` API 即可获取到 `effects` 的 加载状态（ `isLoading` ）和 错误状态（`error`）。

```diff
import store from '@/store';

function FunctionComponent() {
  const [state, dispatchers] = store.useModel('counter');
+  const effectsState = store.useModelEffectsState('counter');

  useEffect(() => {
    dispatchers.asyncDecrement();
  }, []);

+  console.log(effectsState.asyncDecrement.isLoading); // true
+  console.log(effectsState.asyncDecrement.error);  // null
}
```

### 页面切换后重置状态

在单页应用下进行页面切换时，页面状态是会保留的。如果想切换页面后再次进入原页面时重新初始化页面状态，需要添加以下配置：

```diff title="ice.config.mts"
import { defineConfig } from '@ice/app';
import store from '@ice/plugin-store';

export default defineConfig({
  plugins: [
-   store(),
+   store({ resetPageState: true }),
  ],
});
```

### 在 Class Component 中使用

通过 `withModel` 可以实现在 Class Component 中使用状态管理。

```tsx
import store from '@/store';

@store.withModel('todos')
export default class TodoList extends React.Component {
  render() {
    const { todos } = this.props;
    const [state, dispatchers] = todos;
    console.log('state: ', state);
    // ...
  }
}
```

:::tip

TS 应用需要在 `tsconfig.json` 里添加 `compilerOptions: { "experimentalDecorators": true }`
才可启用装饰器语法。
:::

### Redux Devtools

插件中默认集成了 Redux Devtools，不需要额外的配置就可以在 Redux Devtools 调试：

![](https://img.alicdn.com/tfs/TB1wK4nqypE_u4jSZKbXXbCUVXa-1918-430.png)

如果需要定义 Devtools 的参数，可以在 `createStore` 的 options 入参中配置：

```ts
createStore({ user }, {
  redux: {
    devtoolOptions: {
      // 更多配置参考：https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
    }
  }
})
```
