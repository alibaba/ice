---
title: API
order: 1
---

## @ice/stark

> 仅在主应用里使用

### registerMicroApps

> 仅 2.0.0 以上支持

用于注册微应用信息，`registerMicroApps(appConfigs: AppConfig[])`

每一项 `AppConfig` 均包含以下配置：

#### name

微应用唯一标识（必填）：

- 类型：`string`
- 默认值：`-`

#### title

页面标题（选填）：

- 类型：`sting`
- 默认值：`-`

#### activePath

微应用激活规则（关联路由应用必填）：

- 类型：`string|string[]|PathData[]|Function`
- 默认值：`-`

activePath 支持多种形式配置：

```js
registerMicroApps([
  {
    name: 'app1',
    // 路由匹配 /seller 时激活
    activePath: '/seller',
    ...
  },
  {
    name: 'app2',
    // 路由匹配 /user 或者 /admin 时激活
    activePath: ['/user', '/admin'],
    ...
  },
  {
    name: 'app3',
    // 路由匹配精准配 /user 或者 匹配到 /admin 时激活
    activePath: [{ path: '/user', exact: true }, {'/admin', exact: false }],
    ...
  },
  {
    name: 'app4',
    activePath: (url) => {
      // 根据函数执行结果决定微应用是否激活
      return url.includes('/test');
    },
  }
])
```

#### container

微应用挂载 DOM 节点

- 类型：`HTMLElement`
- 默认值：`-`

#### url

微应用静态资源对应的 cdn 地址，当渲染微应用时，会将此 `url` 内的 js、css 资源加载进来（必填）

- 类型：`string | string[]`
- 默认值：`-`

#### entry

微应用对应的 html 入口，当渲染微应用时，会通过 `window.fetch` 将 html 内容获取过来，然后 `append` 至动态创建的节点，选填。**entry > entryContent > url**

- 类型：`string`
- 默认值：`-`

#### entryContent

直接配置微应用的 html 内容。当渲染微应用时，会 `append` 至动态创建的节点，选填。**entry > entryContent > url**

- 类型：`string`
- 默认值：`-`

> 一般应用于需要用 html 入口但不支持跨域获取资源的场景

#### umd

标识微应用是否是一个标准的 UMD 微应用

- 类型：`boolean`
- 默认值：`false`

#### exact

- 完全匹配，参考 [Route.exact](https://reacttraining.com/react-router/web/api/Route/exact-bool)，选填
- 类型：`boolean`
- 默认值：`false`

> 配合 activePath 类型为 string | string[] 时使用

#### strict

- 严格匹配，参考 [Route.strict](https://reacttraining.com/react-router/web/api/Route/strict-bool)，选填
- 类型：`boolean`
- 默认值：`false`

> 配合 activePath 类型为 string | string[] 时使用

#### sensitive

- 区分大小写，参考 [Route.strict](https://reacttraining.com/react-router/web/api/Route/strict-bool)，选填
- 类型：`boolean`
- 默认值：`false`

> 配合 activePath 类型为 string | string[] 时使用

#### hashType

- 微应用路由以 `hash` 路由的方式接入
- 类型：`boolean`
- 默认值：`false`

> 配合 activePath 类型为非 Function 时使用

#### sandbox

微应用开启沙箱运行环境（选填）：

- 类型：`boolean | Sandbox`
- 默认值：`false`

#### props

自定义属性，会传递给微应用的 mount 方法

- 类型：`object`
- 默认值：`{}`

```js
export function mount(props) {
  const { container, customProps } = props;
  // customProps 即为主应用透传给微应用的属性
  console.log(customProps);
  ...
}
```

### removeMicroApps

> 仅 2.0.0 以上支持

移除已注册微应用信息，`removeMicroApps(appNames: string[])`

#### appNames

- 已注册微应用 name
- 类型：`string[]`

```js
import { removeMicroApps } from '@ice/stark';
removeMicroApps(['app1', 'app2']);
```

### start

> 仅 2.0.0 以上支持

通过 `start` 开始劫持路由变化，触发微应用的挂载/卸载，`start(options?)`。
启动微应用对于可以配置的参数：

#### onActiveApps

微应用开始被激活的回调（选填）
- 类型：`Function(appConfig[])`
- 默认值：`-`

#### onAppEnter

微应用渲染前的回调（选填）

- 类型：`Function(appConfig)`
- 默认值：`-`

#### onAppLeave

微应用卸载前的回调（选填）
- 类型：`Function(appConfig)`
- 默认值：`-`


#### onLoadingApp

微应用开始加载的回调（选填）
- 类型：`Function(appConfig)`
- 默认值：`-`

#### onFinishLoading

微应用结束加载的回调（选填）
- 类型：`Function(appConfig)`
- 默认值：`-`

#### shouldAssetsRemove

判断页面资源是否持久化保留（选填）

- 类型：`Function(assetUrl, element)`
- 默认值：`() => true`

### createMicroApp

> 仅 2.0.0 以上支持

手动加载微应用，`createMicroApp(appConfig: AppConfig)`
AppConfig 同 `regsiterMicroApps` 配置项，手动加载的情况下一般不包含路由相关配置：activePath、hashType、excat、strict、sensitive

### unmountMicroApp

> 仅 2.0.0 以上支持

手动卸载微应用，`unmountMicroApp(appName)`

### unloadMicroApp

> 仅 2.0.0 以上支持

手动移除微应用，`unloadMicroApp(appName)`

> 同 unmountMicroApp 区别：unmountMicroApp 仅仅执行了微应用的 unmount 方法，从节点上移除微应用，下一次挂载时可以直接执行 mount 重新挂载；而 unloadMicroApp 除了执行 unmount 方法之外，还会将微应用执行结果（mount/unmount）移除，下一次挂载该微应用时，需要重新加载资源执行来获取其生命周期。

### AppRouter

定位微应用渲染节点，包含如下 props 属性

#### onRouteChange

- 微应用 route 变化时的回调，选填
- 类型：`Function(pathname, query, hash, type)`
- 默认值：`-`

#### NotFoundComponent

- 渲染全局 404 内容，选填
- 类型：`string | ReactNode`
- 默认值：`<div>NotFound</div>`

#### ErrorComponent

- 微应用 `js` 静态资源加载出错时的展示内容，选填
- 类型：`string | ReactNode`
- 默认值：`<div>js bundle loaded error</div>`

#### LoadingComponent

- 微应用静态资源加载时的展示内容，选填
- 类型：`string | ReactNode`
- 默认值：`-`

#### onAppEnter

- 微应用渲染前的回调，选填
- 类型：`Function(appConfig)`
- 默认值：`-`

#### onAppLeave

- 微应用卸载前的回调，选填
- 类型：`Function(appConfig)`
- 默认值：`-`

#### basename

- 微应用路由匹配统一添加 basename，选填
- 类型：`string`
- 默认值：`''`

#### shouldAssetsRemove

- 判断页面资源是否持久化保留，选填
- 类型：`Function(assetUrl, element)`
- 默认值：`() => true`

> 应用资源在 AppRouter 初始化后将默认标识为主应用资源，在微应用切换过程中不会被移除。但在主应用开启懒加载或者一些资源通过脚本异步插入到页面的场景下，这类资源无法正确被标识为不需要移除的资源，可以通过 `shouldAssetsRemove` 方式进行规则判断

```jsx
<AppRouter
  shouldAssetsRemove={(url, el) => {
    // 如果资源 url 链接包含 icestark.com 则标识为主应用资源，微应用切换时不需要移除
    return url.match(/icestark.com/) ? false : true;
  }}
>
</AppRouter>
```

### AppRoute

微应用注册组件，包含如下 props 属性：

#### path

- 定义微应用匹配哪些路由，比如默认域名为`www.icestark.com`，`path` 设置为 `/user`，表示当访问 `www.icestark.com/user` 时，渲染此应用，必填
- 类型：`string | string[]`
- 默认值：`-`

#### url

- 微应用静态资源对应的 cdn 地址，当渲染微应用时，会将此 `url` 内的 js、css 资源加载进来，必填
- 类型：`string | string[]`
- 默认值：`-`

#### entry

- 微应用对应的 html 入口，当渲染微应用时，会通过 `window.fetch` 将 html 内容获取过来，然后 `append` 至动态创建的节点，选填。**entry > entryContent > url**
- 类型：`string`
- 默认值：`-`

#### umd

标识微应用是否是一个标准的 UMD 微应用

- 类型：`boolean`
- 默认值：`false`

#### entryContent

- 直接配置微应用的 html 内容（需要用 html 入口且不支持跨域获取资源场景）。当渲染微应用时，会 `append` 至动态创建的节点，选填。**entry > entryContent > url**
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

- 微应用渲染时展示的 documentTitle ，选填
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

- 微应用默认加载的 DOM 节点的 id，选填
- 类型：`string`
- 默认值：`icestarkNode`

#### hashType

- 微应用路由以 `hash` 路由的方式接入
- 类型：`boolean`
- 默认值：`false`

#### sandbox

- 微应用开启沙箱运行环境
- 类型：`boolean | Sandbox`
- 默认值：`false`

`icestark` 内置 `@ice/sandbox` 作为沙箱执行依赖，开发者可以通过传入自定义的沙箱实现，作为微应用的执行沙箱：

```js
class CustomSanbox {
  constructor() {}
  // 实现在沙箱环境执行代码的方法
  execScriptInSandbox(script) {}
  // 实现清理沙箱的方法
  clear() {}
}

// 将实例化的沙箱传入 AppRoute
const sandbox = new CustomSanbox();
<AppRoute
  sanbox={sandbox}
  ...
/>
```

## @ice/stark-app

### isInIcestark

判断当前运行环境，是否运行在 icestark 环境中，返回值类型：boolean

- 类型：`function`
- 示例代码详见 `registerAppLeave`

### getBasename

配置微应用 `React Router` 中的 `basename` 参数的方法，根据 `AppRoute` 中的 `basename` 或者 `path` 配置生成最终结果

- 类型：`function`
- 默认值：`() => basename || (Array.isArray(path) ? path[0] : path)) || "/"`

### getMountNode

根据微应用运行环境，返回微应用渲染节点

- 类型：`function`
- 默认值：`<div id="ice-container"></div>`
- 使用规则：方法支持传参，传参代表默认渲染的 DOM 节点，默认节点只在微应用单独启动时生效。支持 `string | HTMLElement | function`， `string` 表示默认 DOM 节点的 `id`，`function` 支持函数返回值作为默认 DOM 节点

### renderNotFound

微应用触发渲染全局 404 的方法

- 类型：`function`

### AppLink

提供声明式的，可访问的导航，表示本次跳转需要重新加载静态资源。微应用内部跳转仍然使用 `Link`

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
