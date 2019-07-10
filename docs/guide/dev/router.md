---
title: 路由设计
order: 4
---

在浏览器支持了 [History API](https://developer.mozilla.org/zh-CN/docs/Web/API/History) 之后，很多网站为了提升用户体验都采用基于 History 的单页面应用（SPA）方式，这种方式在页面切换时几乎不需要等待，页面也不会出现白屏，在用户体验上有非常大的提高。采用 SPA 的方式，所有页面路由都需要在前端代码中定义，在 React 领域我们通常使用 [react-router](https://reacttraining.com/react-router/) 的方案，本文就来介绍如何在 SPA 应用中设计路由。

## 路由配置

在模板中，路由与菜单一样也是按照一定的约定进行配置，用来描述路由的结构关系。路由主要分为 路由配置 和 路由生成 两部分：

- 路由配置：在 `src/config/routes.js` 中配置路由
- 路由生成：在 `src/router.js` 中生成路由

这样设计的目的主要是分离路由配置信息和路由生成部分，配置和生成进行解耦，有利于在新增路由时只需要关注路由配置，除了顶层路由，其余路由列表都是自动生成，其中关键的就是中心化配置文件 `src/config/routes.js`，它的主要作用是：

- 配置路由相关信息，可以配置对应路由的路径，渲染组件等字段；
- 根据路由配置生成路由数据，并将路由数据挂载到每条路由对应的组件上；

```js
const routerConfig = [
  {
    path: '/user',
    // 路由组的 component 必须是布局组件
    component: UserLayout,
    children: [
      {
        path: '/login',
        // 路由的 component 必须是页面组件
        component: UserLogin,
      },
      {
        path: '/register',
        component: UserRegister,
      },
      {
        // Redirect 重定向
        path: '/',
        redirect: '/user/login',
      },
      {
        // 404 没有匹配到的路由
        component: NotFound,
      },
    ],
  },
];
```

## 路由生成

### 基础知识

路由配置跟之前版本不同，增加了`路由组`的概念，模板中使用的是 React Router v4 版本，：

> 路由组: 多个页面如果共用一个布局，可以将这几个页面的路由放在某个路由组下，上述配置中有 `children` 字段的都是路由组。

```js
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';
import path from 'path';
import routes from '@/config/routes';

const RouteItem = (props) => {
  const { redirect, path: routePath, component, key } = props;
  if (redirect) {
    return (
      <Redirect
        exact
        key={key}
        from={routePath}
        to={redirect}
      />
    );
  }
  return (
    <Route
      key={key}
      component={component}
      path={routePath}
    />
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

export default router;
```

如果你还不太了解，可以先看看下面几篇推荐的文章：

- [react-router 官网](https://github.com/ReactTraining/react-router)
- [Migrating from v2/v3 to v4](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/migrating.md)
- [[译]关于 React Router 4 的一切](https://github.com/xitu/gold-miner/blob/master/TODO/all-about-react-router-4.md)
- [React Router v4 几乎误我一生](https://zhuanlan.zhihu.com/p/27433116)

### 具体使用

接下来具体看看在模板中我们是如何来实现的；基于路由配置，可以发现每个对应的路由都可以配置一个单独的布局，可以是相同的也可以是不相同的布局，在这种情况下，意味着每个路由入口都包含了一个新的布局，实现如下：

- 主路由入口:

```js
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import routes from '@/config/routes';

const RouteItem = (props) => {
  const { redirect, path: routePath, component, key } = props;
  if (redirect) {
    return (
      <Redirect
        exact
        key={key}
        from={routePath}
        to={redirect}
      />
    );
  }
  return (
    <Route
      key={key}
      component={component}
      path={routePath}
    />
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

- 对应的布局中的路由实现

```js
// BasicLayout.jsx
...
<Layout>
  <Header />
  <Layout.Section>
    <Layout.Main>
      {this.props.children}
    </Layout.Main>
  </Layout.Section>
  <Footer />
</Layout>
...
```

在布局组件中，只需要将 `children` 传给 `Main` 就可以了。

至此，模板中的路由设计方案基本分析完成，这里可以总结如下：

- 考虑到每个路由都能配置任意不同的布局，如果多个路由共享一个布局且不希望在切换路由的时候不刷新布局，你可以将这几个路由放在一个路由组下。
- 路由的真实路径需要将路由组的路径和当前路径拼起来，如果路由配置的路由路径是 `/login`，路由组的路径是 `/user`，那么浏览器需要访问 `/user/login` 才能访问到。

## 路由跳转

### 通过 Link 组件跳转

通过 `<Link />` 标签组件跳转，定义 `to` 属性完成路径跳转，等同于点击一个 `<a />` 标签。

引入标签：

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

### 方法调用：withRouter

如果调用方法的地方在 React 组件内部，可以直接在组件上添加 `withRouter` 的装饰器，然后组件内可以通过 `props` 获取到相关 API：

```js
import React from 'react';
import { withRouter } from 'react-router-dom';

@withRouter
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

static propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(ShowTheLocation);
```

### 方法调用：History API

如果不满足第一种方法的使用条件，比如单独抽离的某个方法中，则需要单独使用 history 的三方包，一般情况下不推荐这种情况，实际业务里应该很少需要：

首先添加依赖：

```bash
$ npm install --save history
```

然后在代码中使用：

```js
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

export default function checkAuth() {
  ajax('/api/checkAuth').then((res) => {
    if (res.data.noAuth) {
      history.push('/page/noAuth');
    }
  });
}
```
