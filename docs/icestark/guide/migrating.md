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
        <div className="header">this is common header</div>
        <AppRouter onRouteChange={this.onRouteChange}>
          <AppRoute
            path={['/', '/home', '/about']}
            basename="/"
            exact
            title="Index"
            url={[
              '//g.alicdn.com/icestark-demo/child/0.1.2/js/index.js',
              '//g.alicdn.com/icestark-demo/child/0.1.2/css/index.css'
            ]}
          />
          <AppRoute
            path="/user"
            basename="/user"
            title="User"
            url={[
              '//g.alicdn.com/icestark-demo/child2/0.1.2/js/index.js',
              '//g.alicdn.com/icestark-demo/child2/0.1.2/css/index.css'
            ]}
          />
        </AppRouter>
        <div className="footer">this is common footer</div>
      </div>
    );
  }
}
```

- `AppRouter` 定位子应用渲染节点
- `AppRoute` 设置子应用相关配置，`path` 配置有效路由信息、`basename` 配置统一的路由前缀，`url` 配置静态资源路径
- `icestark` 会按照类似 `react-router` 的路由解析规则，判断当前生效 `path`，加载对应子应用的静态资源，进行渲染

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
        <AppLink to="/user/home">子应用间跳转使用 AppLink </AppLink>
      </div>
    );
  }
}
```

- icestark 需要跨应用跳转的情况下使用 `AppLink`，表示本次跳转意味着需要重新加载静态资源

### Router 注入 basename、渲染全局 404

```js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { renderNotFound, getBasename } from '@ice/stark';
import HomePage from './pages/Home';
import AboutPage from './pages/About';

export default class App extends React.Component {
  render() {
    return (
      // 通过 getBasename 将在框架应用中注册的 basename 注入到子应用中
      <Router basename={getBasename()}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
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

- icestark 不同应用之间的运行环境隔离，因此可以使用多个 react 版本。因此全局 404 使用方式不同于普通的 context、props
