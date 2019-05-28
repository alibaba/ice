---
title: 应用间通信
order: 3
---

icestark 将应用进行了拆分（框架应用和子应用），拆分之后，不同之间就会有数据交换的场景。在 icestark 体系下，通信可以分为两类：子应用和框架应用之间的通信；不同子应用之间的通信。icestark 拆分后的应用在运行时，共享 `location`、`Cookie`、`LocalStorage`、`window` 等资源。因此应用间的通信，都可以基于这些实现。

## 子应用和框架应用之间的通信

这类数据交换的场景很多，这里简单通过一些场景的实现方案进行说明。

- 通过共享的 `location` 实现当子应用 A/home -> A/info 时，框架应用隐藏公共的 `footer`

```js
// 子应用 A 中的代码

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { AppLink } from 'icestark';

class App extends React.Component {
  render() {
    const { showFooter, messageNumber } = this.state;
    return (
      <div>
        <Link to="/A/home">
          此处跳往 B 应用的 home页面，通知框架应用隐藏 Common Footer
        </Link>
      </div>
    );
  }
}
```

```js
// 框架应用中的代码

import React from 'react';
import ReactDOM from 'react-dom';
import { AppRouter, AppRoute } from 'icestark';

class App extends React.Component {
  state = {
    showFooter: true,
  };

  onRouteChange = (pathname) => {
    const { showFooter } = this.state;

    // 通过监听 pathname，判断是否为 /B/home，控制 footer 的显示隐藏
    if (showFooter && pathname === '/A/home') {
      this.setState({ showFooter: false });
    } else if (!showFooter && pathname !== '/A/home') {
      this.setState({ showFooter: true });
    }
  }

  render() {
    const { showFooter, language } = this.state;
    return (
      <div>
        <div className="header">this is common header</div>
        <AppRouter onRouteChange={this.onRouteChange} >
          <AppRoute path={['/', '/home', '/info']} title="this is A" url="xxx">
        </AppRouter>
        {showFooter ? <div className="footer">this is common footer</div> : null}
      </div>
    );
  }
}
```
> AppRouter 提供的 `onRouteChange` 支持从框架应用中监听子应用切换 `pathname`、`query` 的能力。

- 在子应用中触发 `postMessage` 事件，通知框架应用：重新发起后端请求，更新通知信息条数

```js
// 子应用 A 中的代码

import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@alifd/next';

class App extends React.Component {
  handleClick = () => {
    window.postMessage({ refreshMessage: true }, '*');
  };

  render() {
    const { showFooter, messageNumber } = this.state;
    return (
      <div>
        <Button onClick={this.handleClick}>通知框架应用更新信息</Button>
      </div>
    );
  }
}
```

```js
// 框架页中的代码

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { AppRouter, AppRoute } from 'icestark';

class App extends React.Component {
  state = {
    messageCount: 0,
  };

  componentDidMount() {
    window.addEventListener('message', (e) => {
      const { origin, data } = e;

      // 设置白名单，提高安全性
      const isSaveHost = host.indexOf('http://localhost') > -1 ? true : origin !== host;
      if (!isSaveHost) return;

      if (data.refreshMessage) {
        this.requestMessage();
      }
    });
  }

  requestMessage = () => {
    axios({ headers: {}, method: 'GET', url: '/app/message', params: {}, timeout: 30000 }).then(res => {
      // res 格式如下:
      // {
      //   success: true,
      //   model: 5
      // }
      const { success= false, model } = res;
      if (success) {
        this.setState({ messageCount: Number(model) });
      }
    })
  }

  render() {
    const { messageCount } = this.state;
    return (
      <div>
        <div className="header">you have {messageCount} message!</div>
        <AppRouter>
          <AppRoute path={['/', '/home', '/about']} title="this is A" url="xxx">
          <AppRoute path="/B"  title="this is B" url="xxx" />
        </AppRouter>
      </div>
    );
  }
}
```

## 不同子应用之间的通信

子应用之间需要数据交换的场景也很多。大部分情况下，各个子应用同时渲染在线的情况很少（除非多个 icestark 嵌套的情况）。因此针对大部分场景，不同子应用之间的通信有两种方式，一种是通过公共数据存放途径比如 `location`、`Cookie`、`LocalStorage`、`window` 等。另一种是通过框架应用作为媒介，将共享数据存放在框架应用中。数据流转如下图所示。

![数据流转](https://img.alicdn.com/tfs/TB1EjaRX.CF3KVjSZJnXXbnHFXa-890-344.png)
