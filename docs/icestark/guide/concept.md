---
title: 核心概念
order: 1
---

icestark 根据 UI 结构进行了框架应用和子应用的拆分。

## 框架应用

框架应用作为统一入口，负责子应用注册，菜单、侧边栏等公共基础内容的实现，起到收口域名、统一管理页面公共内容的作用。简单的框架应用代码示例：

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { AppRouter, AppRoute } from '@ice/stark';

class Layout extends React.Component {
  onRouteChange = (pathname, query, hash) => {
    console.log(pathname, query, hash);
  }

  render() {
    return (
      <div>
        <div>this is common header</div>
        <AppRouter
          onRouteChange={this.onRouteChange}
          ErrorComponent={<div>js bundle loaded error</div>}
          NotFoundComponent={<div>NotFound</div>}
        >
          <AppRoute
            path={['/', '/list', '/detail']}
            basename="/"
            exact
            title="商家平台"
            url={[
              '//g.alicdn.com/icestark-demo/child/0.2.1/js/index.js',
              '//g.alicdn.com/icestark-demo/child/0.2.1/css/index.css',
            ]}
          />
          <AppRoute
            path="/waiter"
            basename="/waiter"
            title="小二平台"
            url={[
              '//g.alicdn.com/icestark-demo/child2/0.2.1/js/index.js',
              '//g.alicdn.com/icestark-demo/child2/0.2.1/css/index.css',
            ]}
          />
        </AppRouter>
        <div>this is common footer</div>
      </div>
    );
  }
}
```

## 子应用

子应用是一个 react/vue/anguler 等流行框架搭建的前端应用（spa、mpa等），以 `AppRoute` 的方式在框架应用中注册，交由 icestark 管理。icestark 并不会主动介入子应用内部的路由逻辑，因此子应用整体的改造成本很低，甚至能做到 0 改动，简单的子应用的代码示例：

> 通过 `getMountNode` 获取 icestark 动态创建的渲染 DOM 节点；也可以通过给 `AppRoute` 配置 `rootId` 通知 icestark 动态创建对应的 DOM 节点，此时子应用内部不再需要配置`getMountNode`，**此时注意不要跟框架应用自己的 DOM 节点 id 重复**
> 通过 `registerAppLeave` 注册子应用卸载事件，保证 react 组件 unmount 生命周期会被触发

```js
// src/index.js
import ReactDOM from 'react-dom';
import { getMountNode, registerAppLeave } from '@ice/stark-app';
import router from './router';

// make sure the unmount event is triggered
registerAppLeave(() => {
  ReactDOM.unmountComponentAtNode(getMountNode());
});

ReactDOM.render(router(), getMountNode());
```

> 通过 `getBasename` 获取框架应用中配置的 `basename`；通过 `renderNotFound` 触发框架应用渲染全局 404
> 也可以通过自行约定的方式，去除 `getBasename` 这块的逻辑；自行实现 404，此时子应用内部就不再依赖 `@ice/stark`

```js
// src/router.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { renderNotFound, getBasename } from '@ice/stark-app';

function List() {
  return <div>List</div>;
}

function Detail() {
  return <div>Detail</div>;
}

export default class App extends React.Component {
  render() {
    return (
      <Router basename={getBasename()}>
        <Switch>
          <Route path="/list" component={List} />
          <Route path="/detail" component={Detail} />
          <Redirect exact from="/" to="list" />
          <Route
            component={() => {
              return renderNotFound();
            }}
          />
        </Switch>
      </Router>
    );
  }
}
```

## 设计理念

icestark 是一个极简的微前端解决方案，我们在 API 设计、能力边界设定上，都尽量往 react-router 标准靠近。简单来说，react-router 是通过前端路由管理页面的解决方案，icestark 就是通过前端路由管理子应用的解决方案。