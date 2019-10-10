---
title: API
order: 1
---

## @ice/stark

### AppRouter

定位子应用渲染节点，包含如下 props 属性

#### onRouteChange

- 子应用 route 变化时的回调，选填
- 类型：`Function(pathname, query, hash, type)`
- 默认值：`-`

#### NotFoundComponent

- 渲染全局 404 内容，选填
- 类型：`string | ReactNode`
- 默认值：`<div>NotFound</div>`

#### ErrorComponent

- 子应用 `js` 静态资源加载出错时的展示内容，选填
- 类型：`string | ReactNode`
- 默认值：`<div>js bundle loaded error</div>`

#### LoadingComponent

- 子应用静态资源加载时的展示内容，选填
- 类型：`string | ReactNode`
- 默认值：`-`

#### useShadow

- 是否开启 shadowRoot 隔离 css，选填
- 类型：`boolean`
- 默认：`false`

#### onAppEnter

- 子应用渲染前的回调，选填
- 类型：`Function(appConfig)`
- 默认值：`-`

#### onAppLeave

- 子应用卸载前的回调，选填
- 类型：`Function(appConfig)`
- 默认值：`-`

### AppRoute

子应用注册组件，包含如下 props 属性

#### path

- path-to-regexp@^1.7.0 可以理解的任何有效 URL 路径或路径数组，参考 [Route.path](https://reacttraining.com/react-router/web/api/Route/path-string-string)，比如默认域名为`www.icestark.com`，`path` 设置为 `/user`，表示当访问 `www.icestark.com/user` 时，渲染此应用，必填
- 类型：`string | string[]`
- 默认值：`-`

#### url

- 子应用静态资源对应的 cdn 地址，当渲染子应用时，会将此 `url` 内的 js、css 资源加载进来，必填
- 类型：`string | string[]`
- 默认值：`-`

#### title

- 子应用渲染时展示的 documentTitle ，选填
- 类型：`string`
- 默认值：`-`

#### basename

- 子应用运行时，透传给 `React Router` 的 `basename`，选填，如果不填，默认会从 `path` 中获取
- 类型：`string`
- 默认值：`-`

#### exact

- 完全匹配，参考 [Route.exact](https://reacttraining.com/react-router/web/api/Route/exact-bool)，选填
- 类型：`boolean`
- 默认值：`false`

#### strict

- 严格匹配，参考 [Route.strict](https://reacttraining.com/react-router/web/api/Route/strict-bool)，选填
- 类型：`boolean`
- 默认值：`false`

#### sensitive

- 区分大小写，参考 [Route.strict](https://reacttraining.com/react-router/web/api/Route/strict-bool)，选填
- 类型：`boolean`
- 默认值：`false`

#### rootId

- 子应用默认加载的 DOM 节点的 id，选填
- 类型：`string`
- 默认值：`icestarkNode`

### AppLink

提供声明式的，可访问的导航，表示本次跳转需要重新加载静态资源。子应用内部跳转仍然使用 `Link`

#### to

- 目标路径，同 `Link` 中的 `to` 保持一致 ，必填
- 类型：`string`
- 默认值：`-`

#### replace

- 如果为 true，则单击链接将替换历史记录中的当前记录，而不是添加新记录。
- 类型：`boolean`
- 默认值：`false`

#### message

- 表示当前跳转需要弹窗确认，message为提示文案内容，选填
- 类型：`string`
- 默认值：`-`

代码示例：

```js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppLink } from '@ice/stark';

export default class SelfLink extends React.Component {
  // 商家平台代码
  render() {
    return (
      <div>
        <AppLink to="/waiter/list">使用 AppLink 跳转到小二平台的列表页</AppLink>
        <Link to="/detail">跳转到商家平台详情页</Link>
      </div>
    );
  }
}
```

### appHistory

提供手动切换不同应用的方法。

#### appHistory.push

- 类型：`function`
- 代码示例：

```js
import React from 'react';
import { appHistory } from '@ice/stark';

export default class SelfLink extends React.Component {
  render() {
    return (
      <span
        onClick={() => {
          appHistory.push('/home');
        }}
      >
        selfLink
      </span>
    );
  }
}
```

#### appHistory.replace

- 类型：`function`
- 代码示例参考 `appHistory.push`


## @ice/stark-app

### getBasename

配置子应用 `React Router` 中的 `basename` 参数的方法，根据 `AppRoute` 中的 `basename` 或者 `path` 配置生成最终结果

- 类型：`function`
- 默认值：`() => basename || (Array.isArray(path) ? path[0] : path)) || "/"`

### getMountNode

根据子应用运行环境，返回子应用渲染节点

- 类型：`function`
- 默认值：`<div id="ice-container"></div>`
- 使用规则：方法支持传参，传参代表默认渲染的 DOM 节点，默认节点只在子应用单独启动时生效。支持 `string | HTMLElement | function`， `string` 表示默认 DOM 节点的 `id`，`function` 支持函数返回值作为默认 DOM 节点

### renderNotFound

子应用触发渲染全局 404 的方法

- 类型：`function`

### appHistory

提供手动切换不同应用的方法。

#### appHistory.push

- 类型：`function`
- 代码示例：

```js
import React from 'react';
import { appHistory } from '@ice/stark-app';

export default class SelfLink extends React.Component {
  render() {
    return (
      <span
        onClick={() => {
          appHistory.push('/home');
        }}
      >
        selfLink
      </span>
    );
  }
}
```

#### appHistory.replace

- 类型：`function`
- 代码示例参考 `appHistory.push`

### registerAppLeave

提供快速注册当前应用卸载前的回调事件

- 类型：`function`
- 代码示例：

```javascript
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