---
title: Hooks
order: 8
---

Hook 是 React 16.8 的新增特性，它可以让函数组件（Function Component）使用状态和生命周期。

## Hooks 使用规则

Hooks 就是 JavaScript 函数，但是使用它们会有两个额外的规则：

- 只在函数最顶层调用 Hooks，不要在循环、条件判断或者子函数中调用；
- 只在函数组件和自定义 Hooks 中调用 Hooks，不要在其他 JavaScript 函数中调用。

## 基础 Hooks

### useState

```js
const [state, setState] = useState(initialState);
```

返回一个 state，以及更新 state 的函数。

在初始渲染期间，返回的状态 (state) 与传入的第一个参数 (initialState) 值相同。

setState 函数用于更新 state。它接收一个新的 state 值并将组件的一次重新渲染加入队列。

```js
setState(newState);
```

在后续的重新渲染中，useState 返回的第一个值将始终是更新后最新的 state。

在下面的例子里，我们使用了 useState 来实现了一个计数器：

```jsx
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### useEffect

```js
useEffect(didUpdate);
```

该 Hook 接收一个包含命令式、且可能有副作用代码的函数。

默认情况下，effect 将在每轮渲染结束后执行，但你可以选择让它在只有某些值改变的时候才执行。

在下面的例子里，我们使用了 useEffect 来实现了修改页面标题：


```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### useContext

```js
const value = useContext(MyContext);
```

接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 value prop 决定。

在下面的例子里，我们使用了 useContext 来实现了跨组件共享状态：


```jsx
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

## 自定义 Hooks

通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。基于此我们提供了一套功能完备的 Hooks 工具库 ahooks，主要分为以下几类：

* [Table](https://ahooks.js.org/zh-CN/hooks/table/use-fusion-table)
* [UI](https://ahooks.js.org/zh-CN/hooks/ui/use-drop)
* [State](https://ahooks.js.org/zh-CN/hooks/state/use-boolean)
* [SideEffect](https://ahooks.js.org/zh-CN/hooks/life-cycle/use-debounce-effect)
* [LifeCycle](https://ahooks.js.org/zh-CN/hooks/life-cycle/use-debounce-effect)
* [DOM](https://ahooks.js.org/zh-CN/hooks/dom/use-click-away)
* [Advanced](https://ahooks.js.org/zh-CN/hooks/advanced/use-creation)

具体使用详见 [ahooks](https://ahooks.js.org/zh-CN/hooks/table/use-fusion-table)
