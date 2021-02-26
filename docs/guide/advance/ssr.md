---
title: 服务端渲染 SSR
order: 2
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
import { runApp, request } from 'ice';

const appConfig = {
+  app: {
+    getInitialData: async (ctx) => {
+      // const data = await request.get('/api/data');
+      return {
+       initialStates: {
+         user: { name: 'Jack Ma', id: '01' }
+       }
+      };
+    }
+  },
};

runApp(appConfig);
```

开启了 SSR 的行为说明：

- 服务端渲染时直接调用 `getInitialData` 获取数据并渲染应用，同时将数据注入到全局变量中
- 浏览器端渲染时不再调用 `getInitialData`，会直接通过全局变量获取初始数据
- 可以获取到当前请求的上下文 `ctx` 参数，包含以下字段
  - `ctx.req`：HTTP request 对象 （仅在 server 端输出）
  - `ctx.res`：HTTP response 对象 （仅在 server 端输出）
  - `ctx.pathname`：当前路由路径
  - `ctx.query`：请求参数对象
  - `ctx.path`：URL 路径（包括请求参数）
  - `ctx.ssrError`：服务端渲染时错误信息（仅在 client 端输出）

未开启 SSR 的行为说明：

- 浏览器端会同步调用 `getInitialData`，调用完成后执行 render 逻辑

`getInitialData` 返回的 `initialData.initialStates` 会作为 store 的初始状态，因此 View 里通过 model 拿到的默认 state 即 `initialData.initialStates`，如 `models/user.js` 的默认 states 即上出的 `{ name: 'Jack Ma', id: '01' }`。

```diff
import { runApp } from 'ice';

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

runApp(appConfig);
```

框架提供了两种方式获取 `getInitialData` 返回的数据：

- 通过 `getInitialData` API 消费 `initialData`。

```ts
import React from 'react';
import { getInitialData } from 'ice';

export default = () => {
  // 获取通过 app.getInitialData 返回的 initialData 数据。
  const initialData = getInitialData();
  console.log(initialData);
};
```

- 通过 store 的 `initialStates` 来使用消费 `initalData`，[详见](/docs/guide/basic/store)。


## 页面级数据

SEO 场景下，需要访问每个页面时都能够返回实际的 DOM 节点，此时如果把数据放到全局的 `initialData` 里管理成本会非常高，因此 icejs 支持页面级通过 `getInitialProps` 来获取自身需要的数据。

> 注意：如果只是追求首屏加载速度，不推荐使用页面级的 getInitialProps，因为这在一定程度上会延长服务端渲染直出 HTML 的时间。

在页面级组件中通过 `Component.getInitialProps` 来获取页面初始数据，同时可以获取到当前请求的上下文 `ctx` 参数，包含以下字段：

- `ctx.req`：HTTP request 对象 （仅在 server 端输出）
- `ctx.res`：HTTP response 对象 （仅在 server 端输出）
- `ctx.pathname`：当前路由路径
- `ctx.query`：请求参数对象
- `ctx.path`：URL 路径（包括请求参数）
- `ctx.ssrError`：服务端渲染时错误信息（仅在 client 端输出）

```diff
import { request } from 'ice';

function Home({ stars }) {
  return <div>icejs stars: {stars}</div>;
}

+Home.getInitialProps = async (ctx) => {
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

## 页面 Meta 标签

在 SEO 场景下，往往需要设置每个页面的标题和 Meta 标签，以更好地让搜索引擎抓取页面内容。使用步骤如下：

```jsx
// pages/Home/index.jsx
import React from 'react';
import { Head } from 'ice';

const Home = (props) => {
  const { title, description } = props;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={props.description} />
        <meta name="keywords" content="Home Keywords" />
      </Head>
    </div>
  )
}

Home.getInitialProps = async () => {
  // 模拟服务端返回 title 和 description 数据
  const res = await request('/detail');
  return res;
}
```

## 服务端集成

本地开发时 icejs 通过 webpack-dev-server 做服务端渲染，应用发布后则需要对应的服务端自行渲染，核心逻辑如下：

```ts
const path = require('path');

router.get('/*', async (ctx) => {
  // server/index.js 路径
  const serverBundlePath = path.join('../build', 'server/index.js');
  const serverRender = require(serverBundlePath);
  const { html, error, redirectUrl } = await serverRender.default({
    // 当前请求的上下文（必选）
    ctx,
    // 当前请求的路径（必选）
    pathname: ctx.req.pathname,
    // loadable-stats.json 本地路径（必选）
    loadableStatsPath: webStatsPath,
    // 可选
    initialData: {
      initialStates: {
        user: {}
      }
    },
    // 打包后输出的资源的公共路径，默认为 /（可选） 
    publicPath: 'https://cdn.com/'
  });

  if (redirectUrl) {
    console.log('[SSR Redirect]', `Redirect to the new path ${redirectUrl}`);
    // 重定向
    ctx.res.redirect(302, redirectUrl);
  } else {
    if (error) {
      console.log('[SSR ERROR]', 'serverRender error', error);
    }
    console.log('[SSR SUCCESS]', `output html content\n`);
    ctx.res.body = html;
  }
});
```

icejs@1.15.0 及以上版本开始支持在开启 SSR 的应用中使用[代码分割](https://ice.work/docs/guide/advance/code-splitting)。部署时需要把 `loadable-stats.json` 、`server/loadable-stats.json` 和 `server/` 目录下所有的 bundle 资源下载到 server 端。

icejs 构建出来的 `server/index.js` 会暴露出 `render` 方法供服务端调用，该方法提供两个参数：

- pathname: 必填，当前路由的 pathname
- initialData: 选填，如果不填写，服务端则会调用前端声明的 `getInitialData` 方法，但如果**对性能追求比较极致**，服务端则可以自行获取对应数据并通过 `initialData` 传入。（调用前端的 getInitialData 一般会发起 HTTP 请求，但是服务端有可能通过缓存/数据库来查询，速度会快一点）

以上即 icejs SSR 能力的使用说明，如遇到相关问题，欢迎给我们提 issue。

## 其他问题

### 服务端请求必须使用绝对的 URL 路径

开启了 SSR 之后，`app.getInitialData` 以及 `Home.getInitialProps` 都会在服务端下执行，服务端发请求必须用绝对路径不能用相对路径，因此这两个方法里如果出现异步请求，请务必使用绝对路径，或者正确设置 `request.baseURL`。推荐做法：

`src/config.js` 中动态区分环境并配置 baseURL：

```js
if (process.env.__IS_SERVER__) {
  // 动态扩展环境：服务端通过环境变量区分，此处以 Midway 为例
  global.__app_mode__ = process.env.MIDWAY_SERVER_ENV;
} else {
  // 动态扩展环境：两种方式
  
  // 方式 1. 通过服务端输出的全局变量
  window.__app_mode__ = window.g_config.faasEnv;
  
  // 方式 2. 通过 url 地址动态判断 
  if (/pre.example.com/.test(location.host)) {
    window.__app_mode__ = 'pre';
  } else if (/daily.example.com/.test(location.host)) {
    window.__app_mode__ = 'daily';
  } else if (/example.com/.test(location.host)) {
    window.__app_mode__ = 'prod';
  } else {
    window.__app_mode__ = 'local';
  }
}

export default {
  local: {
    baseURL: `http://localhost:${process.env.SERVER_PORT}`
  },
  daily: {
    baseURL: 'https://ice-ssr.daily.fx.alibaba.net'
  },
  pre: {
    baseURL: 'https://ice-ssr.pre-fx.alibaba-inc.com'
  },
  prod: {
    baseURL: 'https://ice-ssr.fx.alibaba-inc.com'
  }
}
```

然后在 `src/app.js` 中设置 `request.baseURL`：

```diff
import { runApp, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
+  request: {
+    baseURL: config.baseURL
+  }
};

runApp(appConfig);
```
