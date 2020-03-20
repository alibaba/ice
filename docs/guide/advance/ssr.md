---
title: 服务端渲染
order: 8
---

与传统 SPA (单页应用程序 (Single-Page Application)) 相比，服务器端渲染 (SSR) 的优势主要在于：

* 更友好的 SEO
* 更快的首屏加载速度

## SSR 开发

在工程配置文件 `build.json` 中开启 SSR 应用配置：

> 注意，需要 icejs@1.1.0 以上版本

```json
{
  "ssr": true
}
```

配置完之后即可以使用服务端渲染模式，相比开发普通的 SPA 应用，在开发 SSR 应用时，由于服务端环境和渲染机制的差异，会对编码带来一些约束，其中主要差异在于数据请求和状态管理。

## 数据请求

### getInitialData

在 SSR 应用中，我们推荐在应用入口中定义 `getInitialData` 来处理全局数据请求的工作，配置如下：

```ts
import { createApp } from 'ice';

const appConfig = {
+  app: {
+    getInitialData: async () => {
+      return { user: { name: 'Jack Ma', id: '01' } }
+    }
+  },
};

createApp(appConfig);
```

### getInitialProps

通过 getInitialProps 返回的数据，将被作为组件的初始 props。

```ts
import { request } from 'ice'

function Page({ stars }) {
  return <div>icejs stars: {stars}</div>
}

Page.getInitialProps = async (ctx) => {
  const res = await fetch('https://api.github.com/repos/ice-lab/icejs')
  const json = await res.json()
  return { stars: json.stargazers_count };
}

export default Page
```

* 在 `server` 端，`getInitalProps` 会在页面 `render` 之前被执行，其返回值将作为页面的初始 `props` 用于渲染。同时这份数据，会被 J`SON.stringify` 后，放置于页面中。
* 在 `client` 端，会优先去检测页面中是否输出了这份数据，如果有，则使用这份数据 `hydrate` 页面，如果没有，则执行 `getInitialProps` 。


## 状态管理

当通过 `getInitialData` 获取到全局的数据之后，我们可以通过配置 `getInitialStates` 将全局数据作为 `store` 的初始数据进行初始化，配置如下：

```ts
import { createApp } from 'ice';

const appConfig = {
  app: {
    getInitialData: async () => {
      return { user: { name: 'Jack Ma', id: '01' } }
    }
  },
  store: {
+   getInitialStates: (initialData) => {
+     return initialData
+   }
+ }
};

createApp(appConfig);
```

## 渲染模式

框架提供了 SSR/CSR 两种渲染模式，在某些场景下，我们可以通过配置 SSR 选项来进行模式的切换：

```json
{
  "ssr": "true" | "false"
}
```

## 构建产物

当应用开发完成时，通过运行 `npm run build` 默认构建后的文件如下：

```diff
  .
  ├── build
  │   ├── index.html
  │   ├── css/index.css
  │   ├── js/index.js
+ │   └── server/index.js // 服务端代码文件
```

* 当 `ssr` 配置项为 `true` 时使用服务端渲染
* 当 `ssr` 配置项为 `false` 时使用客户端渲染

## 服务端集成

在本地开发时我们基于 webpack-dev-server 作为服务运行和调试，在整体设计上与服务端框架无任何耦合，因此你可以选择与你熟悉的服务端框架进行集成，使用说明如下：

```ts
router.get('/*', async (ctx) => {
  // 将资源下载到 server 端
  // const serverBundlePath = await downloadBundle('http://xxxx/server/index.js');
  const render = require(serverBundlePath);
  const html = render({
    // 当前请求的路径（必选参数）
    pathname: ctx.req.pathname

    // 服务端可通过 db 等方式直接获取 initialData（可选参数）
    initialData: {},
  });

  ctx.res.body = html;
});
```
