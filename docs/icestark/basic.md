---
title: 使用说明
category: icestark
order: 1
---

icestark 使用前需要根据 UI 结构将系统拆分为框架应用、多个子应用。默认所有应用均采用`BrowserRouter`。

## 框架应用

通常管理统一的 Header、Footer、Menu 等信息，控制子应用的注册、渲染时机、渲染位置。

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Icestark from 'icestark';
import Layout from './Layout';

const apps = [
  {
    basePath: '/',
    title: '主页',
    includePath：'^/(about|home)',
  },
  {
    basePath: '/user',
    title: '用户页面',
  },
];

class App extends React.Component {
  // ...
  render() {
    return (
      <Layout>
        <Icestark apps={apps} /* ... */ />
      </Layout>
    );
  }
}
```

- `Icestark` 节点即为子应用最终渲染位置
- 子应用的 `title`、`basePath` 等配置信息通过 apps 的方式注册， 确保各自 `basePath` 的配置唯一

## 子应用

icestark 对子应用的代码侵入性极少，只有三方面：

- ReactDOM 渲染节点

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { getMountNode } from 'icestark';
import App from './App';

ReactDOM.render(<App />, getMountNode(defalutMountNode));
```

- 子应用间跳转

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

- 子应用内触发渲染全局 404

```js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RenderNotFound } from 'icestark';
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
              RenderNotFound && RenderNotFound();
              return null;
            }}
          />
        </Switch>
      </Router>
    );
  }
}
```

## 注意事项

- 框架应用、子应用之间共享 `window`、`query`、`pathname` 等，可通过多种方式实现通信
- icestark 对 `react` 版本没有具体要求，不同应用间可使用不同版本的 `react`
- icestark 在子应用跳转之后，会自动移除上一个子应用的 css、js 等文件，减少应用间的相互影响
- icestark 默认开启 `shadowRoot` 能实现 css 彻底隔离，现已知 `shadowRoot` 在 @alifd/next、antd 等基础组件使用中有展示异常、事件失灵等问题，当使用这些基础组件框架时，建议关闭 `shadowRoot`
