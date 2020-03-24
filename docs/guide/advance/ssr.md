---
title: 服务端渲染
order: 8
---

icejs 支持服务端渲染（即 SSR）能力，开发者可以按需一键开启 SSR 的模式，相比于传统的客户端渲染，SSR 常用于两个场景：1. 有 SEO 诉求；2. 对首屏渲染速度要求比较高。相比于传统的 SSR 方案，icejs 提供的 SSR 能力具有以下特性：

- 支持一键开启/关闭 SSR 能力
- 与服务端低耦合，无论是传统的 Nodejs 应用还是 Serverless 模式，都可以非常简单的集成
- 支持页面级服务端加载数据

## 开启 SSR

> 注意：icejs@1.1.0 及以上版本开始支持 SSR

在工程配置文件 `build.json` 中开启 SSR：

```json
{
  "ssr": true
}
```

配置完之后即可启用 SSR，同理置为 false 即可关闭 SSR 功能。此时重新执行 `npm run start` 即可看到页面中直出的 HTML:

![SSR 效果](https://img.alicdn.com/tfs/TB1rk9Bzhv1gK0jSZFFXXb0sXXa-2880-1026.png)

## 应用级数据

在 `src/app.ts` 中可通过 `getInitialData` 获取全局数据：

```diff
import { createApp, request } from 'ice';

const appConfig = {
+  app: {
+    getInitialData: async () => {
+      // const data = await request.get('/api/data');
+      return { user: { name: 'Jack Ma', id: '01' } }
+    }
+  },
};

createApp(appConfig);
```

开启了 SSR 的行为说明：

- 服务端渲染时直接调用 `getInitialData` 获取数据并渲染应用，同时将数据注入到全局变量中
- 浏览器端渲染时不再调用 `getInitialData`，会直接通过全局变量获取初始数据

未开启 SSR 的行为说明：

- 浏览器端会同步调用 `getInitialData`，调用完成后执行 render 逻辑

定义完全局初始数据后，接下来需要在业务代码中使用这些数据，应用级的 `initialData` 通常通过全局 store 的 `initialStates` 来使用：

```diff
import { createApp } from 'ice';

const appConfig = {
  app: {
    getInitialData: async () => {}
  },
  store: {
+   // 参数 initialData 即 getInitialData 返回的数据
+   getInitialStates: (initialData) => {
+     // 可按需选择需要作为 initialStates 的数据
+     return initialData;
+   }
  }
};

createApp(appConfig);
```

> 目前仅支持通过 store 的 `initialStates` 来使用消费 `initalData`，如果需要在其它业务代码中直接消费，可以先将需求反馈给 ICE 团队

## 页面级数据

SEO 场景下，需要访问每个页面时都能够返回实际的 DOM 节点，此时如果把数据放到全局的 `initialData` 里管理成本会非常高，因此 icejs 支持页面级通过 `getInitialProps` 来获取自身需要的数据。

> 注意：如果只是追求首屏加载速度，不推荐使用页面级的 getInitialProps，因为这在一定程度上会延长服务端渲染直出 HTML 的时间。

在页面级组件中通过 `Component.getInitialProps` 来获取页面初始数据：

```diff
import { request } from 'ice';

function Home({ stars }) {
  return <div>icejs stars: {stars}</div>;
}

+Home.getInitialProps = async () => {
+  const res = await request.get('https://api.github.com/repos/ice-lab/icejs');
+  return { stars: res.data.stargazers_count };
+}

export default Home;
```

开启了 SSR 的行为说明：

- 服务端渲染时调用对应页面的 `getInitialProps`，然后在渲染页面组件时将数据作为 props 传递给页面组件，同时将数据注入到全局变量上
- 浏览器端渲染时不再调用 `getInitialProps`，会直接通过全局变量获取初始数据并作为组件的 props

未开启 SSR 的行为说明：

- 浏览器端渲染时会在组件渲染后（didMount）理解调用该方法，同时触发组件的 rerender。

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

## 服务端集成

本地开发时 icejs 通过 webpack-dev-server 做服务端渲染，应用发布后则需要对应的服务端自行渲染，核心逻辑如下：

```ts
router.get('/*', async (ctx) => {
  // 将资源下载到 server 端
  // const serverBundlePath = await downloadBundle('http://cdn.com/server/index.js');
  const render = require(serverBundlePath);
  const html = render({
    // 当前请求的路径（必选参数）
    pathname: ctx.req.pathname
    // 可选
    initialData: {},
  });

  ctx.res.body = html;
});
```

icejs 构建出来的 `server/index.js` 会暴露出 `render` 方法供服务端调用，该方法提供两个参数：

- pathname: 必填，当前路由的 pathname
- initialData: 选填，如果不填写，服务端则会调用前端声明的 `getInitialData` 方法，但如果**对性能追求比较极致**，服务端则可以自行获取对应数据并通过 `initialData` 传入。（调用前端的 getInitialData 一般会发起 HTTP 请求，但是服务端有可能通过缓存/数据库来查询，速度会快一点）

以上即 icejs SSR 能力的使用说明，如遇到相关问题，欢迎给我们提 issue。