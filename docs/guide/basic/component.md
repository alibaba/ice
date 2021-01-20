---
title: 编写组件
order: 11
---

在 React 中组件是非常重要的概念，因此我们需要了解编写组件的一些基础只知识。

## 编写组件

### Function or Class Component

推荐使用 Function Component，即一个普通的 JavaScript 函数：

```jsx
import React from 'react';

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### 组件组合

组件可以被任意组合，比如：

```jsx
import React from 'react';

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function Home() {
  return (
    <>
      <Welcome name="foo" />
      <div>
        <Welcome name="bar" />
      </div>
    </>
  )
}
```

### Props

Props 可以理解为函数参数，调用组件的地方可以指定这个组件的 Props。

Props 是只读的，不允许组件内部修改传入的 props 参数。

### JSX 语法

在函数组件中 return 的即 jsx 的语法，比如：

```jsx
const element = <p>Hello, world!</p>;
```

#### JSX 声明

JSX 的声明方式和普通 HTML 标签一样，用 `<>` 标签包裹，也可以嵌套:

```jsx
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

假如标签内没有子元素，可以使用 `/>` 来闭合标签：

```jsx
const element = <img src="url" />
```

####  在 JSX 中使用表达式

JSX 中可以插入任意 JavaScript 表达式。JSX中的表达式必须写在大括号 `{}` 中：

```jsx
const element = <h1>{'Hello' + ',' + 'world!'}</h1>;
```

表达式中不能使用 `if else` 语句，但可以使用三元运算符 `a ? b : c` 来实现条件选择。

```jsx
const element = <h1>{true ? 'True!' : 'False!'}</h1>
```

#### 使用 JSX 数组

可以在一个 JSX 元素中直接嵌套包含多个元素的数组，数组内的 JSX 元素会被逐个渲染：

```jsx
const arr = [
  <span>Hello, world!</span>,
  <span>Hello, Rax！</span>,
];
const element = <p>{arr}</p>;
```

#### 在 JSX 中注释

JSX 注释和表达式一样，必须写在大括号 `{}` 中：

```jsx
const element = <p>{/*注释...*/} Hello, world!</p>;
```

##### 属性差异

JSX 与 HTML 之间有很多属性存在差异：

##### className

className 属性用于指定 CSS 的 class，此特性适用于所有常规 DOM 节点和 SVG 元素，如 `<div>`，`<a>` 及其它标签。

如果你在 JSX 中使用 Web Components，请使用 class 属性代替。

##### dangerouslySetInnerHTML

dangerouslySetInnerHTML 是浏览器 DOM 提供 innerHTML 的替换方案。通常来讲，使用代码直接设置 HTML 存在风险，因为很容易无意中使用户暴露于跨站脚本（XSS）的攻击。因此，你可以直接在 JSX 中设置 HTML，但当你想设置 dangerouslySetInnerHTML 时，需要向其传递包含 key 为 `__html` 的对象，以此来警示你。例如：

```jsx
function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

##### htmlFor

由于 for 在 JavaScript 中是保留字，所以 JSX 元素中使用了 htmlFor 来代替。

关于组件编写的更多细节请参考 [React 官方文档](https://reactjs.org/docs/state-and-lifecycle.html)。

## React Hooks

在编写组件过程中，我们会经常用到 React Hooks，除了 React 内置的 `useState`, `useMemo` 等 Hooks，们结合大量实践沉淀了一套 ahooks 的解决方案，可以减少很多重复编码工作。

比如当我们需要监听并操作 url query，就可以直接使用 `useUrlState` 这个 hooks：

```jsx
import React from 'react';
import { useUrlState } from '@ahooks';

export default () => {
  const [urlQuery, setUrlQuery] = useUrlState({ count: '1' });
  return (
    <>
      <button
        type="button"
        onClick={() => setUrlQuery({ count: Number(urlQuery.count || 0) + 1 })}
      >
        add
      </button>
      <button type="button" onClick={() => setUrlQuery({ count: undefined })}>
        clear
      </button>
      <div>urlQuery.count: {urlQuery?.count}</div>
    </>
  );
};
```

通过类似 `useUrlState` 的封装，可以极大的减少我们的编码量。ahooks 主要提供了以下几类 Hooks：

* [Table](https://ahooks.js.org/zh-CN/hooks/table/use-fusion-table)
* [UI](https://ahooks.js.org/zh-CN/hooks/ui/use-drop)
* [State](https://ahooks.js.org/zh-CN/hooks/state/use-boolean)
* [SideEffect](https://ahooks.js.org/zh-CN/hooks/life-cycle/use-debounce-effect)
* [LifeCycle](https://ahooks.js.org/zh-CN/hooks/life-cycle/use-debounce-effect)
* [DOM](https://ahooks.js.org/zh-CN/hooks/dom/use-click-away)
* [Advanced](https://ahooks.js.org/zh-CN/hooks/advanced/use-creation)

具体使用详见 [ahooks](https://ahooks.js.org)。
