---
title: 如何实现静态资源的按需加载
order: 7
---

当页面规模、依赖组件达到一定量之后，打包后的文件也会随之增大，但在浏览某个页面的时候并不需要一次性加载所有内容，只需加载当前页面的资源即可，此时可以参考本文档实现静态资源的切割及按需加载。

*提示：React 16.6.0 及以上版本的项目建议使用 [React.lazy](https://reactjs.org/docs/code-splitting.html#reactlazy)，否则建议使用三方组件库 [react-loadable](https://github.com/jamiebuilds/react-loadable)。*

## React.lazy

React 16.6.0 及以上版本提供了动态加载组件的标准化能力 —— [React.lazy](https://reactjs.org/docs/code-splitting.html#reactlazy) API。

**正常加载组件**
```js
import OtherComponent from './OtherComponent';

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```

**按需动态加载组件**
```diff
- import OtherComponent from './OtherComponent';
+ const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```

## Suspense

由于网络传输原因，加载组件需要花费一定的时间，为了提升用户体验，一般会加一个 loading 组件平滑过渡。
React 内置的 `<Suspense>` 组件已为我们实现了此功能。

```js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```

`fallback` 属性值为等待组件加载时你想渲染的任何 React 元素。
