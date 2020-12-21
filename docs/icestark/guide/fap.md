---
title: 常见问题
order: 8
---

### 微应用之间如何跳转？

微应用内部跳转直接基于对应 router 提供的 link 组件即可，如果要跳转到其他微应用，可以使用 `appHistory` API，这里以 React 应用为例：

```jsx
import { appHistory } from '@ice/stark-app';

<Button type="primary" onClick={() => {
  appHistory.push('/seller/settings');
}}>跳转到其他微应用</Button>
```

### 微应用 bundle 加载失败？

前端应用如果做了按需加载，按需加载的 bundle 默认是根据当前域名拼接地址，如果前端资源部署在非当前域名（比如 CDN）下，则需要通过手动配置 publicPath 来实现，具体参考[文档](/docs/guide/basic/build#publicPath)。

### 微应用开发时请求本地 Mock 接口？

通常情况下，代码中的接口请求地址都是写成类似 `/api/xxx` 的相对地址，请求时会根据当前域名进行拼接，如果微应用嵌入主应用进行开发，在域名变化后依旧想使用微应用的 Mock 接口或者代理配置，可以设置 `baseURL` 来请求非当前域名的接口地址，比如 `axios` 可以通过 `axios.defaults.baseURL` 来实现：

```js
// src/utils/request.js
import axios from 'axios';

axios.defaults.baseURL = '//127.0.0.1:4444';
```

如果微应用使用 icejs 研发框架提供的数据请求方案，则只需通过配置 `appConfig`：

```js
import { createApp } from 'ice';

const appConfig = {
  ...
  request: {
    baseURL: '//127.0.0.1:4444',
  }
};

createApp(appConfig);
```

> 由于开发调试过程中主应用和微应用的域名或者端口不一致，非 icejs 研发框架的工程可能会有跨域问题，工程修改可以参考[devServer 配置](https://github.com/ice-lab/icejs/blob/bf2b0a6d7834f0d3897f0216be8195fff9eadbed/packages/plugin-react-app/src/config/default.config.js#L21)

### 微应用本地开发如何调试？

单独微应用开发时只能看到自身的内容，无法关注到在主应用下的表现，这时候本地如果需要再启动一个主应用，开发起来就很繁琐。针对这种情况，我们推荐通过主应用的日常/线上环境调试本地微应用。

在主应用中注册微应用时，如果 url 里携带了类似 `?env=local` 的 query，则将微应用的 url 转换为对应的本地服务地址，这样就可以方便调试微应用了。大体代码如下（可根据具体需求调整）：

```jsx
// src/app.jsx
import React from 'react';
import { AppRouter, AppRoute } from '@ice/stark';
import urlParse from 'url-parse';
import BasicLayout from '@/layouts/BasicLayout';

const urlQuery = urlParse(location.href, true).query || {};

export default class App extends React.Component {
  getBundleUrl = (name, version) => {
    let jsUrl = `//g.alicdn.com/${name}/${version}/index.min.js`;
    let cssUrl = `//g.alicdn.com/${name}/${version}/index.min.css`;

    if (urlQuery.env === 'local') {
      jsUrl = `//127.0.0.1:${urlQuery.port}/build/js/index.js`;
      cssUrl = `//127.0.0.1:${urlQuery.port}/build/css/index.css`;
    }

    return [cssUrl, jsUrl];
  }

  render() {
    return (
      <BasicLayout>
        <AppRouter>
          <AppRoute
            path="/seller"
            basename="/seller"
            title="通用页面"
            url={getBundleUrl('seller', 0.1.0)}
          />
        </AppRouter>
      </BasicLayout>
    );
  }
}
```

> 如果微应用是开启按需加载，为了让微应用资源能够正确加载，需要在开启本地服务的时候设置 `publicPath`，如果微应用基于 icejs 进行开发，可以参考[配置](/docs/guide/basic/build#devPublicPath)。

### 应用启用 lazy 后，chunk 加载失败

多个微应用均开启 lazy 加载页面，建议通过开启 sandbox 隔离微应用 windows 全局变量。

页面全局变量特殊无法完成隔离的情况下，在 onAppLeave 的阶段清空 webpackJsonp 配置：

```js
<AppRouter
  onAppLeave={(appConfig) => {
    window.webpackJsonp = [];
  }}
>
  // {...}
</AppRouter>
```

主应用和微应用均开启 lazy 的情况下，需要通过配置 `webpack.output.jsonpFunction` 来隔离两个应用的全局变量名称，详见 [webpack 配置](https://webpack.js.org/configuration/output/#outputjsonpfunction)。

### UmiJS 应用如何接入

通过 UmiJS 提供运行时能力，劫持默认渲染逻辑，新建 `src/app.js` 文件：

```js
import ReactDOM from 'react-dom';
import { isInIcestark, getMountNode, registerAppEnter, registerAppLeave } from '@ice/stark-app';

// 微前端环境下动态修改渲染根节点
export function modifyClientRenderOpts(memo)  {
  return {
    ...memo,
    rootElement: isInIcestark() ? 'icestarkNode' : memo.rootElement,
  }
}

export function render(oldRender) {
  // 在 icestark 环境下注册对应的生命周期
  if (isInIcestark()) {
    registerAppEnter(() => {
      oldRender();
    });
    registerAppLeave(() => {
      ReactDOM.unmountComponentAtNode(getMountNode());
    })
  } else {
    oldRender();
  }
}
```

> 由于 UmiJS 未提供运行时修改路由 basename 的内容，如果涉及到微应用基准路由不固定，可以通过在主应用动态设置 `window.routerBase` 的方式动态修改
