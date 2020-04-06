---
title: 框架 API
order: 12
---

## 基础

### createApp

用于创建渲染整个应用。[详见](https://ice.work/docs/guide/basic/app)

### config

用于根据环境区分运行时配置。[详见](https://ice.work/docs/guide/basic/config)

### APP_MODE

设置应用环境。[详见](https://ice.work/docs/guide/basic/config)

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

### history

获取当前使用的路由实例对象。

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

### useHistory

useHistory hook 用于获取 history 实例。


```js
import { useHistory } from 'ice';

function HomeButton() {
  const history = useHistory();

  function handleClick() {
    history.push('/home);
  }

  return (
    <button type='button' onClick={handleClick}>
      Go home
    </button>
  );
}
```

### useLocation

useLocation hook 返回代表当前 URL 的 location 对象。可以像 useState 一样使用它，只要 URL 更改，它就会返回一个新位置。

### useParams

useParams hook 返回 URL 参数的 key/value 的对象。 使用它来访问当前 <Route> 的 match.params。

### useRouteMatch

useRouteMatch hook 尝试以与 <Route> 相同的方式匹配当前URL。它主要用于在不实际渲染 <Route> 的情况下访问匹配数据。

[更多使用示例](https://reacttraining.com/react-router/web/example/basic)

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

### NavLink

NavLink 组件的用法和 Link 组件基本相同，区别在于 NavLink 组件匹配时可以添加 active 属性。

```jsx
<NavLink to='/faq' activeClassName='selected'>
  FAQs
</NavLink>
```

### Prompt

在离开页面路由跳转时，自定义拦截组件。

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

用于数据请求的方法。[详见](https://ice.work/docs/guide/basic/request#request)

### useRequest

用于数据请求的 hooks。[详见](https://ice.work/docs/guide/basic/request#useRequest)

## 其他

### lazy

用于代码懒加载。[详见](https://ice.work/docs/guide/advance/code-splitting)

### logger

用于日志打印。[详见](https://ice.work/docs/guide/basic/logger)

### helpers

用于提供常用的帮助函数。[详见](https://ice.work/docs/guide/basic/helpers)
