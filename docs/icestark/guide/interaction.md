---
title: 应用间通信
order: 3
---

icestark 将应用进行了拆分（框架应用和子应用），拆分之后，不同之间就会有数据交换的场景。在 icestark 体系下，通信可以分为两类：子应用和框架应用之间的通信；不同子应用之间的通信。icestark 拆分后的应用在运行时，共享 `location`、`Cookie`、`LocalStorage`、`window` 等资源。因此应用间的通信，都可以基于这些实现。

## 子应用和框架应用之间的通信

这类数据交换的场景很多，这里简单通过一些场景的实现方案进行说明。

### 通过共享的 `location` 实现当子应用 A/about -> A/home 时，框架应用隐藏公共的 `footer`

```js
// 子应用 A 中的代码

import React from 'react';
import { Link } from 'react-router-dom';

const App = () => (
  <div>
    <Link to="/A/home">
      跳往 home 页面
    </Link>
  </div>
);
```

```js
// 框架应用中的代码

import React from 'react';
import { AppRouter, AppRoute } from '@ice/stark';

class App extends React.Component {
  state = {
    showFooter: true,
  };

  onRouteChange = (pathname) => {
    const { showFooter } = this.state;

    // 通过监听 pathname，判断是否为 /A/home，控制 footer 的显示隐藏
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
        </AppRouter>
        {showFooter ? <div className="footer">this is common footer</div> : null}
      </div>
    );
  }
}
```
> AppRouter 提供的 `onRouteChange` 支持从框架应用中监听子应用切换 `pathname`、`query` 的能力。

### 在子应用中触发 `postMessage` 事件，通知框架应用：重新发起后端请求，更新通知信息条数

```js
// 子应用 A 中的代码

import React from 'react';
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
import axios from 'axios';
import { AppRouter, AppRoute } from '@ice/stark';

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
      </div>
    );
  }
}
```

## 不同子应用之间的通信

子应用之间需要数据交换的场景也很多，通信有两种方式：

### 通过公共数据存放途径比如 `location`、`Cookie`、`LocalStorage`、`window` 等

示例代码
```js
// 子应用 A 中的代码

import React from 'react';
import { Button } from '@alife/next';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: (window.__app__ && window.__app__.count) || 0,
    };
  }

  add = () => {
    this.setState({ count: this.state.count + 1 }, () => {
      if (window.__app__) {
        window.__app__.count = this.state.count;
      } else {
        window.__app__ = {};
        window.__app__.count = this.state.count;
      }
    });
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <Button type="normal" onClick={this.add}>Add</Button>
        <p>This is in App A, Current count is {count}.</p>
      </div>
    );
  }
}
```

```js
// 子应用 B 中的代码

import React from 'react';
import { Button } from '@alife/next';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: (window.__app__ && window.__app__.count) || 0,
    };
  }

  add = () => {
    this.setState({ count: this.state.count + 1 }, () => {
      if (window.__app__) {
        window.__app__.count = this.state.count;
      } else {
        window.__app__ = {};
        window.__app__.count = this.state.count;
      }
    });
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <Button type="normal" onClick={this.add}>Add</Button>
        <p>This is in App B, Current count is {count}.</p>
      </div>
    );
  }
}
```

### 通过框架应用作为媒介，将共享数据存放在框架应用中，这就将子应用之间的通信转化成了子应用和框架应用的通信

两种通信数据流转过程如图所示
![数据流转](https://img.alicdn.com/tfs/TB1YkmFdECF3KVjSZJnXXbnHFXa-652-293.jpg)
