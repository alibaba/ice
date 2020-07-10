---
title: 框架 API
order: 12
---

## 基础

### createApp

用于创建渲染整个应用。[详见](/docs/guide/basic/app)

### config

获取应用运行时配置。[详见](/docs/guide/basic/config)

### APP_MODE

获取应用环境。[详见](/docs/guide/basic/config)

### ErrorBoundary

用于错误边界的组件。[详见](/docs/guide/basic/error-boundaries#ErrorBoundary)

## 状态管理

### store

应用级别的 store 实例。[详见](/docs/guide/basic/store)

## 路由

### Link

通过 `<Link />` 标签组件可实现路由跳转，使用方式：

```js
import { Link } from 'ice';

function Demo() {
  return (
    <div>
      <Link to='/courses?sort=name' />

      {/* 可以携带额外的数据 `state` 到路由中。 */}
      <Link
        to={{
          pathname: '/courses',
          search: '?sort=name',
          hash: '#the-hash',
          state: { fromDashboard: true },
        }}
      />
    </div>
  )
}
```

### NavLink

NavLink 组件的用法和 Link 组件基本相同，区别在于 NavLink 组件匹配时可以添加 active 属性。

```jsx
<NavLink to='/faq' activeClassName='selected'>
  FAQs
</NavLink>
```

### Prompt

在离开页面路由跳转时，自定义拦截组件。

```ts
import { Prompt } from 'ice';

const PromptMessage = () => {
  return (
    <>
      {/* 用户离开页面时给出曲儿提示 */}
      <Prompt message="你确定要离开吗？" />
    </>
  );
};
```

### useHistory

useHistory hook 用于获取 history 实例。


```js
import { useHistory } from 'ice';

function HomeButton() {
  const history = useHistory();

  function handleClick() {
    history.push('/home');
  }

  return (
    <button type='button' onClick={handleClick}>
      Go home
    </button>
  );
}
```

### useLocation

useLocation hook 返回当前 URL 的 `location` 对象。

```ts
import { useLocation } from 'ice';

function Home() {
  const location = useLocation();
  return (
    <>
      <p>location: {JSON.stringify(location)}</p>
    </>
  );
};
```

### useParams

useParams hook 返回 URL 参数的 `parmas` 对象。

```ts
import { useParams } from 'ice';

function Home() {
  const params = useParams();
  return (
    <>
      <p>params: {JSON.stringify(params)}</p>
    </>
  );
};
```

### useRouteMatch

useRouteMatch hook 返回当前路由的匹配信息。

```ts
import { useRouteMatch } from 'ice';

function Home() {
  const match = useRouteMatch();
  return (
    <>
      <p>match: {JSON.stringify(match)}</p>
    </>
  );
};
```

### useSearchParams

用于在非路由函数组件中解析 url 参数。

假设当前 URL 为 `https://example.com?foo=bar`，解析查询参数如下：

```tsx
// src/components/Example
import { useSearchParams } from 'ice';

function Example() {
  const searchParams = useSearchParams()
  // console.log(searchParams); => { foo: 'bar' }
}
```

### withSearchParams

与 `useSearchParams` 对应，用在 Class Component 中。

```tsx
import { withSearchParams } from 'ice';

@withSearchParams
class Example extends React.Component {
  render() {
    const { searchParams } = this.props;
    // console.log(searchParams); => { foo: bar }
    return (
      <>Foo</>
    );
  }
}
```

### withRouter

通过在 Class 组件上添加 `withRouter` 装饰器，可以获取到路由的 `history`、`location`、`match` 对象。

```javascript
import React from 'react';
import { withRouter } from 'ice';

function ShowTheLocation(props) {
  const { history, location } = props;
  const handleHistoryPush = () => {
    history.push('/new-path');
  };

  return (
    <div>
      <div>当前路径： {location.pathname}</div>
      <button onClick={handleHistoryPush}>点击跳转新页面</button>
    </div>
  );
}

export default withRouter(ShowTheLocation);
```

### matchPath

判断当前 URL 是否匹配。

```js
import { matchPath } from 'ice';

const match = matchPath('/users/123', {
  path: '/users/:id',
  exact: true,
  strict: false
});
```

### history

获取应用的路由实例。

```js
import { history } from 'ice';

// 用于获取 history 栈里的实体个数
console.log(history.length);

// 用于获取 history 跳转的动作，包含 PUSH、REPLACE 和 POP 三种类型
console.log(history.action);

// 用于获取 location 对象，包含 pathname、search 和 hash
console.log(history.location);

// 用于路由跳转
history.push('/home');

// 用于路由替换
history.replace('/home');

// 用于跳转到上一个路由
history.goBack();
```

更多 [history API](https://github.com/ReactTraining/history/blob/master/docs/GettingStarted.md)

### createHashHistory

用于创建 HashHistory 对象。

```js
import { createHashHistory } from 'ice';

const history = createHashHistory();
```

### createBrowserHistory

用于创建 BrowserHistory 对象。

```ts
import { createBrowserHistory } from 'ice';

const history = createBrowserHistory();
```

### createMemoryHistory

用于创建 MemoryHistory 对象。

```ts
import { createMemoryHistory } from 'ice';

const history = createMemoryHistory();
```

## 数据请求

### request

用于数据请求的方法。[详见](/docs/guide/basic/request#request)

### useRequest

用于数据请求的 hooks。[详见](/docs/guide/basic/request#useRequest)

## 工具方法

### lazy

用于代码懒加载。[详见](/docs/guide/advance/code-splitting)

### logger

用于日志打印。[详见](/docs/guide/basic/logger)

## 类型

### IAppConfig

appConfig 的类型定义。

```diff
+import { createApp, IAppConfig } from 'ice';

+const appConfig: IAppConfig {

}

createApp();
```

### IRouterConfig

路由配置的类型定义。

```diff
+import { IRouterConfig } from 'ice';

+const routerConfig: IRouterConfig = [

];

export default routerConfig;
```

### IRootDispatch

状态管理中全局模型 dispatch 的类型。

```diff
+import { IRootDispatch } from 'ice';

const model = {
  state: [],
  reducers: {},
+ effects: (dispatch: IRootDispatch) => ({

  })
};
```


### IRootState

状态管理中全局模型的 rootState 的类型。

```diff
+import { IRootState } from 'ice';

const model = {
  state: [],
  reducers: {},
  effects: (dispatch) => ({
+   like(playload, rootState: IRootState) {

    }
  })
};
```

