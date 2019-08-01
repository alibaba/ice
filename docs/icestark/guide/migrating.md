---
title: 已有应用迁移
order: 2
---

icestark 完全面向 react 设计，因此已有 react 应用的迁移成本很低。

## 安装 icestark

```bash
$ npm i @ice/stark --save
```

## 在框架应用中使用

框架应用主要是对各个子应用的资源 `url`、渲染位置、`path` 的管理
注意各个子应用的 `path` 配置不能重复，规则类似 `Route` 的 `path` 配置

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { AppRouter, AppRoute } from '@ice/stark';

class Layout extends React.Component {
  onRouteChange = (pathname, query) => {
    console.log(pathname, query);
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

- `AppRouter` 定位子应用渲染节点
- `AppRoute` 设置子应用相关配置，`path` 配置有效路由信息、`basename` 配置统一的路由前缀，`url` 配置静态资源路径
- icestark 会按照 `react-router` 的路由解析规则，判断当前生效 `path`，加载对应子应用的静态资源 `url`，渲染在 `AppRouter` 中

## 在子应用中使用

icestark 对子应用的代码侵入性极少，只有三方面：

### ReactDOM 渲染节点

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { getMountNode } from '@ice/stark';
import App from './App';

ReactDOM.render(<App />, getMountNode());
```

- `getMountNode` 方法会判断当前应用的运行环境，如果以子应用方式运行会使用 icestark 内部创建的 dom 节点 / shadowDOM 节点，否则会默认采用`<div id="ice-container"></div>`节点。同时，该方法支持传 DOM 节点作为默认节点。

### 子应用间跳转

```js
import React from 'react';
import { AppLink } from '@ice/stark';

class App extends React.Component {
  // ...
  render() {
    return (
      <div>
        <AppLink to="/waiter/list">子应用间跳转使用 AppLink </AppLink>
      </div>
    );
  }
}
```

- 跨应用跳转的情况下使用 `AppLink`，表示本次跳转需要重新加载静态资源；子应用内部跳转，仍使用 `Link`

### Router 注入 basename、渲染全局 404

```js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { renderNotFound, getBasename } from '@ice/stark';

function List() {
  return <div>List</div>;
}

function Detail() {
  return <div>Detail</div>;
}

export default class App extends React.Component {
  render() {
    return (
      // 通过 getBasename 将在框架应用中注册的 basename 注入到子应用中
      <Router basename={getBasename()}>
        <Switch>
          <Route exact path="/" component={List} />
          <Route path="/detail" component={Detail} />
          <Route
            component={() => {
              // 通知框架应用渲染全局 404
              return renderNotFound();
            }}
          />
        </Switch>
      </Router>
    );
  }
}
```

- 子应用通过 `getBasename` 方法获取框架应用中配置的 `basename`，通过 `renderNotFound` 方法触发框架应用渲染 404
