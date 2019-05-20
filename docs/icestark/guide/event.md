---
title: 应用间通信
order: 3
---

icestark 将应用进行了拆分，而拆分后的框架应用、子应用之间共享 `window`、`pathname`、`query` 等信息，因此框架之间需要通信时，可通过如下方式进行：

## pathname、query

假设如下两个场景：
1. 当 A -> B/home 时，需要隐藏框架应用中的 `footer`
2. A 应用需要触发事件，通知框架应用更新国际化语言方案

这里我们通过 `pathname`、`query` 实现：

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
        <Link to="/?__icestark__lang=en">此处不发生跳转，改变 query 通知框架应用更新国际化语言方案为 英文</Link>
        <Link to="/?__icestark__lang=zh">此处不发生跳转，改变 query 通知框架应用更新国际化语言方案为 中文</Link>
        <AppLink to="/B/home" >此处跳往 B 应用的 home页面，通知框架应用隐藏 Common Footer</AppLink>
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
    language: 'zh', // 国际化 zh（中文）/ en（英文）
  };

  onRouteChange = (pathname, query) => {
    const { showFooter } = this.state;
    const { __icestark__lang } = query;

    // 通过监听 pathname，判断是否为 /B/home，控制 footer 的显示隐藏
    if (showFooter && pathname === '/B/home') {
      this.setState({ showFooter: false });
    } else if (!showFooter && pathname !== '/B/home') {
      this.setState({ showFooter: true });
    }

    // 通过监听 query，判断事先约定的变量 __icestark__lang 的变化，实现国际化语言方案的更新
    if (__icestark__lang === 'zh' || __icestark__lang === 'en') {
      this.setState({ language: __icestark__lang });
      // or localStorage.setItem() ...
    }
  }

  render() {
    const { showFooter, language } = this.state;
    return (
      <div>
        <div className="header">you are using {language === 'zh' ? 'Chinese' : 'English'}!</div>
        <AppRouter onRouteChange={this.onRouteChange} >
          <AppRoute path={/^\/(home/about)/} title="this is A" url="xxx">
          <AppRoute path="/B"  title="this is B" url="xxx" />
        </AppRouter>
        {showFooter ? <div className="footer">this is footer</div> : null}
      </div>
    );
  }
}
```

- 以上示例代码展示了通过 `pathname`、`query` 实现跨应用通信的能力
- 框架页可通过监听 `pathname` 的变化实现针对不同页面展示不同的信息
- 框架页可通过监听 `query` 中提前约定的参数名（示例中为 `__icestark__lang`）的变化，判断信息是否需要更新

## postMessage

假设一个场景，我们在子应用中触发事件，通知框架应用：重新发起后端请求，更新通知信息条数

这里我们通过 `postMessage` 实现：

```js
// 子应用 A 中的代码

import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@alifd/next';

class App extends React.Component {
  handleClick = () => {
    window.postMessage({ refreshMessage: true }, '*');
  }

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
          <AppRoute path={/^\/(home/about)/} title="this is A" url="xxx">
          <AppRoute path="/B"  title="this is B" url="xxx" />
        </AppRouter>
      </div>
    );
  }
}
```
