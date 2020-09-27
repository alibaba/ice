---
title: 2.x 新增 API
order: 2
---

## registerMicroApps

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
  // customProps 即为框架应用透传给微应用的属性
  console.log(customProps);
  ...
}
```

## removeMicroApps

移除已注册微应用信息，`removeMicroApps(appNames: string[])`

#### appNames

- 已注册微应用 name
- 类型：`string[]`

```js
import { removeMicroApps } from '@ice/stark';
removeMicroApps(['app1', 'app2']);
```

## start

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

## createMicroApp

手动加载微应用，`createMicroApp(appConfig: AppConfig)`
AppConfig 同 `regsiterMicroApps` 配置项，手动加载的情况下一般不包含路由相关配置：activePath、hashType、excat、strict、sensitive

## unmountMicroApp

手动卸载微应用，`unmountMicroApp(appName)`

## unloadMicroApp

手动移除微应用，`unloadMicroApp(appName)`

> 同 unmountMicroApp 区别：unmountMicroApp 仅仅执行了微应用的 unmount 方法，从节点上移除微应用，下一次挂载时可以直接执行 mount 重新挂载；而 unloadMicroApp 除了执行 unmount 方法之外，还会将微应用执行结果（mount/unmount）移除，下一次挂载该微应用时，需要重新加载资源执行来获取其生命周期。
> 
