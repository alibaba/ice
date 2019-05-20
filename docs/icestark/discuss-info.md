---
title: 应用间通信
category: icestark
order: 3
---

框架应用、子应用之间共享 `window`、`pathname`、`query` 等，可通过多种方式实现通信

## pathname、query

子应用间通过 react router 方式改变的路由，可通过 icestark 提供的 onRouteChange 在框架应用中设置 callback，当针对不同 pathname、 query 有页面变化时，可在这里实现

```js
// layout/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { AppLoader } from 'icestark';

class App extends React.Component {
  // ...
  onRouteChange = (pathname, query) => {
    if (pathname === 'user') {
      this.setState({
        showFooter: false,
      });
    }

    if (query.icestarkMessage) {
      this.setState({
        messageNumber: this.state.messageNumber + Number(query.icestarkMessage),
      });
      // remove the icestarkMessage from query
    }
  }

  render() {
    const { showFooter, messageNumber } = this.state;
    return (
      <div>
        <div className="header">you have <span>{messageNumber}</span> message</div>
        <AppLoader onRouteChange={this.onRouteChange} /* ... */ >
          <AppRoute path={/^\/(home/about)/} title="" url="xxx">
          <AppRoute path="user" url="xxx" />
        </AppLoader>
        {showFooter ? <div className="footer">this is footer</div> : null}
      </div>
    );
  }
}
```

## window

挂载在 window 中的变量，应用之间是共享的。通常，在框架应用（layout）创建的函数/变量，子应用最好先进行判空校验，防止子应用单独启动时报错

```js
// layout/src/*.js

window.__ICESTARK__COUNT = 0;

// ...

window.__ICESTARK__logout = () => {
  console.log('do you really want to logout?');
};
```

```js
// child/src/*.js

if (window.__ICESTARK__COUNT) {
  window.__ICESTARK__COUNT++;
}

// ...

if (window.__ICESTARK__logout) {
  window.__ICESTARK__logout();
}
```

## postMessage

应用间通信，还可通过 postMessage 进行

```js
// layout/src/*.js

window.addEventListener('message', (e) => {
  const { origin, data } = e;

  const isSaveHost = host.indexOf('http://localhost') > -1 ? true : origin !== host; // 设置白名单，提高安全性
  if (!isSaveHost) return;

  if (data.test) {
    console.log(data.test);
  }
});

```

```js
// child/src/*.js

window.postMessage({ test: 'ok' }, '*');

```