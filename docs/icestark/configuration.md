---
title: 配置参数
category: icestark
order: 2
---

icestark 配置参数

## env

- 子应用 bundle 环境变量
- 类型：`local`、`daily`、`prepub`、`production`
- 默认值：`production`

## apps

- 子应用配置
- 类型：`object[]`
- 默认值：`-`
- 示例
```js
const apps = [
  {
    basePath: '/', // 必填，框架应用根据 basePath 控制路由渲染相应子应用
    title: '主页', // 必填，渲染 DocumentTitle
    env: 'local', // 选填，环境变量，参数会跟主 env 进行 merge 操作
    includePath：'^/(about|home)', // 选填，配合 basePath 确定子应用的路由范围
    localPort: '4444', // 本地调试时的端口，选填，参数作为 getBundleUrl 入参
    repo: 'groupName/repoName', // 仓库地址，选填，参数作为 getBundleUrl 入参
    version: '0.1.0', // Bundle 版本，选填，参数作为 getBundleUrl 入参
    // ... 自定义参数，作为 getBundleUrl 入参
  },
  {
    basePath: '/user',
    title: '用户页面',
    env: 'production',
    localPort: '5555',
    repo: 'groupName/repoName',
    version: '0.1.0',
  },
];
```

## getBundleUrl

- 根据 `apps` 中配置参数，获取子应用 bundle 地址的方法
- 类型：`Function(curApp)`
- 默认值：`-`
- 示例
```js
const getBundleUrl={({ repo, version, localPort, localIp, env, type }) => {
  if (env === 'local') {
    return `//${localIp}:${localPort}/${type}/index.${type}`;
  }
  const cdnHost = env === 'production' ? 'production.com' : 'daily.com';
  return `//${cdnHost}/${repo}/${version}/${type}/index.${type}`;
}}
```

## onRouteChange

- 子应用 route 变化时的回调
- 类型：`Function(path, type)`
- 默认值：`-`

## NotFoundComponent

- 自定义渲染全局 404 内容
- 类型：`string|ReactNode`
- 默认值：`-`

## BundleErrorComponent

- 自定义渲染全局 Bundle 加载出错时的展示内容
- 类型：`string|ReactNode`
- 默认值：`-`

## BundleLoadingComponent

- 自定义渲染全局 Bundle 加载时的展示内容
- 类型：`string|ReactNode`
- 默认值：`-`

## shadowRoot

- 是否开启 shadowRoot 隔离 css
- 类型：`boolean`
- 默认：`true`