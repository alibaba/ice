---
title: 已有应用改造
order: 2
---

icestark 完全面向 react 设计，因此已有 react 应用的改造成本极低。

## 安装 icestark

```bash
$ npm i icestark --save
```

## 在框架应用中使用

框架应用主要是对各个子应用的资源 url、渲染位置、`path` 的管理
注意各个子应用的 `path` 配置不能重复，规则类似 `Route` 的 `path` 配置

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { AppLoader, AppRoute } from 'icestark';

class App extends React.Component {
  // ...
  render() {
    return (
      <div>
        <div className="header">this is common header</div>
        <AppLoader onRouteChange={this.onRouteChange}>
          <AppRoute path={/^\/(home/about)/} title="A应用" url="xxx">
          <AppRoute path="/user" title="B应用" url="xxx" />
        </AppLoader>
        <div className="footer">this is common footer</div>
      </div>
    );
  }
}
```

- `AppLoader` 节点即为子应用最终渲染位置
- `AppRoute` 负责注册子应用的基本信息，`title`、`path`、`url` 为必填项，分别对应子应用渲染时的 `documentTitle`、子应用的`basename`、子应用资源发布的 cdn 地址

## 在子应用中使用

icestark 对子应用的代码侵入性极少，只有三方面：

### ReactDOM 渲染节点

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { getMountNode } from 'icestark';
import App from './App';

ReactDOM.render(<App />, getMountNode());
```

- `getMountNode` 方法会判断当前应用的运行环境，如果以子应用方式运行会使用 icestark 内部创建的 dom 节点 / shadowDOM 节点，否则会默认采用`<div id="ice-container"></div>`节点。同时，该方法支持传 DOM 节点作为默认节点。

### 子应用间跳转

```js
import React from 'react';
import { AppLink } from 'icestark';

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

- icestark 需要跨应用跳转的情况下使用 `AppLink`，标识该跳转可能意味着需要重新加载静态资源

### 子应用内触发渲染全局 404

```js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { renderNotFound } from 'icestark';
import HomePage from './pages/Home';
import AboutPage from './pages/About';

export default class App extends React.Component {
  render() {
    return (
      <Router basename="/user">
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