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

#### onAppEnter

- 子应用渲染前的回调，选填
- 类型：`Function(appConfig)`
- 默认值：`-`

#### onAppLeave

- 子应用卸载前的回调，选填
- 类型：`Function(appConfig)`
- 默认值：`-`

#### basename

- 子应用路由匹配统一添加 basename，选填
- 类型：`string`
- 默认值：`''`

### AppRoute

子应用注册组件，包含如下 props 属性：

#### path

- 定义子应用匹配哪些路由，比如默认域名为`www.icestark.com`，`path` 设置为 `/user`，表示当访问 `www.icestark.com/user` 时，渲染此应用，必填
- 类型：`string | string[]`
- 默认值：`-`

#### url

- 子应用静态资源对应的 cdn 地址，当渲染子应用时，会将此 `url` 内的 js、css 资源加载进来，必填
- 类型：`string | string[]`
- 默认值：`-`

#### entry

- 子应用对应的 html 入口，当渲染子应用时，会通过 `window.fetch` 将 html 内容获取过来，然后 `append` 至动态创建的节点，选填。**entry > entryContent > url**
- 类型：`string`
- 默认值：`-`

#### entryContent

- 直接配置子应用的 html 内容（需要用 html 入口且不支持跨域获取资源场景）。当渲染子应用时，会 `append` 至动态创建的节点，选填。**entry > entryContent > url**
- 类型：`string`
- 默认值：`-`

#### component

- 当路由匹配是直接渲染 react component，渲染后会带上 `location`、`match`、`history` 的 `props`, 支持 `AppRoute` 替代 `react-route` 的基本能力。**当配置此属性时，`url` 等配置会失效**。参考 [Route.component](https://reacttraining.com/react-router/web/api/Route/component)，选填
- 类型：`string | ReactNode`
- 默认值：`-`

#### render

- 支持 `AppRoute` 替代 `react-route` 的基本能力。**当配置此属性时，`url` 等配置会失效**。参考 [Route.render](https://reacttraining.com/react-router/web/api/Route/render-func)，选填
- 类型：`({location, match, history}) => ReactNode`
- 默认值：`-`

#### title

- 子应用渲染时展示的 documentTitle ，选填
- 类型：`string`
- 默认值：`-`

#### cache

- 切换应用时缓存该应用资源，再次渲染时无需重复加载执行，请谨慎使用该能力，因为这会增加应用样式等冲突的概率，并可能引入内存问题。另外目前仅入口通过 url 属性配置支持该能力。
- 类型：`boolean`
- 默认值：false

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

- 表示当前跳转需要弹窗确认，message 为提示文案内容，选填
- 类型：`string`
- 默认值：`-`

#### hashType

- 当前跳转以 `hash` 路由形式进行跳转，选填
- 类型：`boolean`
- 默认值：`false`

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

### isInIcestark

判断当前运行环境，是否运行在 icestark 环境中，返回值类型：boolean

- 类型：`function`
- 示例代码详见 `registerAppLeave`

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

### registerAppEnter

提供快速注册当前应用加载前的回调事件

- 类型：`function`
- 示例代码详见 `registerAppLeave`

### registerAppLeave

提供快速注册当前应用卸载前的回调事件

- 类型：`function`
- 代码示例：

```javascript
// src/index.js
import ReactDOM from 'react-dom';
import { isInIcestark, getMountNode, registerAppEnter, registerAppLeave } from '@ice/stark-app';
import router from './router';

if (isInIcestark()) {
  const mountNode = getMountNode();
  registerAppEnter(() => {
    ReactDOM.render(router(), getMountNode());
  });
  // make sure the unmount event is triggered
  registerAppLeave(() => {
    ReactDOM.unmountComponentAtNode(getMountNode());
  });
} else {
  ReactDOM.render(router(), document.getElementById('ice-container'));
}
```