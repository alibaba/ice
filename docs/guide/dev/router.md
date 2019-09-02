---
title: 路由设计
order: 3
---

在浏览器支持了 [History API](https://developer.mozilla.org/zh-CN/docs/Web/API/History) 之后，很多网站为了提升用户体验都采用基于 History 的单页面应用（SPA）方式，这种方式在页面切换时几乎不需要等待，页面也不会出现白屏，在用户体验上有非常大的提高。采用 SPA 的方式，所有页面路由都需要在前端代码中定义，在 React 领域我们通常使用 [react-router](https://reacttraining.com/react-router/) 的方案，本文就来介绍如何在 SPA 应用中设计路由。

## 路由配置

在模板中，路由与菜单一样也是按照一定的约定进行配置，用来描述路由的结构关系。路由主要分为 路由配置 和 路由渲染 两部分：

- 路由配置：`src/config/routes.js`
- 路由生成：`src/router.js`

这样设计的目的主要是分离路由配置信息和路由渲染部分，让开发者大多数时候只需要关注路由配置，路由配置协议如下：

```js
const routerConfig = [
  // 分组路由，children 里的路由会将父节点的 component 作为布局组件
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '/login',
        component: UserLogin,
      },
      {
        path: '/',
        // 重定向
        redirect: '/user/login',
      },
      {
        // 404 没有匹配到的路由
        component: NotFound,
      },
    ],
  },
  // 非分组路由
  {
    path: '/about',
    component: About,
  },
];
```

注意：路由有一个按顺序匹配的规则，从上到下一旦命中路由匹配规则就会停止遍历，因此如果你在最前面配置了 `/` 这样一个路由，则所有的路由都会命中该规则，导致其他路由没有效果，所以在开发时要注意路由的顺序以及 [exact](https://reacttraining.com/react-router/web/api/Route/exact-bool) 属性的使用。

## 路由渲染

完成路由配置后，我们通过 `src/router.jsx` 的生成逻辑将这些路由渲染出来，即转换成使用 react-router 的代码（注意我们默认支持了两层路由嵌套，如需支持更多层级请修改 `src/router.jsx` 这个文件），具体代码如下：

```js
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import routes from '@/config/routes';

const RouteItem = (props) => {
  const { redirect, path: routePath, component, key } = props;
  if (redirect) {
    return (
      <Redirect exact key={key} from={routePath} to={redirect} />
    );
  }
  return (
    <Route key={key} component={component} path={routePath} />
  );
};

const router = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route, id) => {
          const { component: RouteComponent, children, ...others } = route;
          return (
            <Route
              key={id}
              {...others}
              component={(props) => {
                return (
                  children ? (
                    <RouteComponent key={id} {...props}>
                      <Switch>
                        {children.map((routeChild, idx) => {
                          const { redirect, path: childPath, component } = routeChild;
                          return RouteItem({
                            key: `${id}-${idx}`,
                            redirect,
                            path: childPath && path.join(route.path, childPath),
                            component,
                          });
                        })}
                      </Switch>
                    </RouteComponent>
                  ) : (
                    <>
                      {RouteItem({
                        key: id,
                        ...props,
                      })}
                    </>
                  )
                );
              }}
            />
          );
        })}
      </Switch>
    </Router>
  );
};
```

至此，路由设计方案基本分析完成，这里可以总结如下：

- 考虑到每个路由都能配置任意不同的布局，如果多个路由共享一个布局且不希望在切换路由的时候刷新布局，你可以将这几个路由放在一个路由组下。
- 路由组的情况，真实路径需要将路由组的路径和当前路径拼起来，如果路由配置的路由路径是 `/login`，路由组的路径是 `/user`，那么页面的实际路由地址是 `/user/login`

## 路由跳转

### 通过 Link 组件跳转

通过 `<Link />` 标签组件可实现路由跳转，使用方式：

```js
import { Link } from 'react-router-dom';

function Demo() {
  return (
    <div>
      <Link to="/courses?sort=name" />

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

### 通过 withRouter 方法调用实现跳转

如果调用方法的地方在 React 组件内部，可以直接在组件上添加 `withRouter` 的装饰器，然后组件内可以通过 `props` 获取到相关 API：

```js
import React from 'react';
import { withRouter } from 'react-router-dom';

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

### 方法调用：History API

如果前两种方式都无法实现，比如在 React 组件外部需要使用路由跳转等操作，则需要单独使用 history 的三方包，一般情况下不推荐这种情况，实际业务里应该很少需要。首先添加依赖：

```bash
$ npm install --save history
```

创建一个公共的 histroy 对象：

```js
// /src/utils/history.js
// 这里以 BrowserHistory 为例，如果是 HashHistory 参考文档使用即可
import { createBrowserHistory } from 'history';

export default createBrowserHistory();
```

然后在代码中引入并使用：

```js
// /src/utils/request.js
import history from './history';

export default function checkAuth() {
  ajax('/api/checkAuth').then((res) => {
    if (res.data.noAuth) {
      history.push('/page/noAuth');
    }
  });
}
```

## 常见问题

### 为什么浏览器里的地址都带着 `#`？

前端路由通常有两种实现方式：HashHistory 和 BrowserHistory，路由都带着 `#` 说明使用的是 HashHistory。这两种方式优缺点如下：

|特点\方案|     HashRouter    |   BrowserRouter  |
|--------|-------------------|-----------------|
|美观度   |   不好，有 # 号     |     好          |
|易用性   |   简单             |  中等，需要 server 配合 |
|依赖 server|    不依赖        | 依赖               |
|跟锚点功能冲突|   冲突         |  不冲突           |
|兼容性      |   IE8           |   IE10         |

开发者可以根据自己的实际情况选择对应方案。

### 如何使用 BrowserHistory？

首先在路由渲染部分将最外层由 HashRouter 替换为 BrowserRouter：

```diff
- import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
+ import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
```

本地调试支持，在 `ice.config.js` 中配置 webpack-dev-server 的配置：

```js
module.exports = {
  devServer: {
    historyApiFallback: true,
  }
}
```

线上运行时需要 server 端支持，否则会出现刷新 404 问题，具体方案请参考社区文档：

- [关于 react-router 的 browserHistory 模式](https://github.com/LoeiFy/Recordum/issues/15)
- [react-router 之 HashRouter & BrowserRouter](https://zzugbb.github.io/passages/react-router%E9%97%AE%E9%A2%98/)
