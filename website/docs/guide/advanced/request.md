# 网络请求

:::caution
小程序端不支持该能力。
:::

大部分前端应用都会选择通过 HTTP(s) 协议与后端服务通讯。  
ice.js 提供了一套从 UI 交互到请求服务端数据的完整方案，通过切面编程的方式统一了数据请求管理，简化了设置参数、错误处理等逻辑的实现。

## 安装 [request 插件](https://www.npmjs.com/@ice/plugin-request)

网络请求是可选能力，在使用前需要单独安装 `@ice/plugin-request` 插件。

```bash
npm i @ice/plugin-request -D
```

在配置文件中添加插件：

```tsx title="ice.config.mts"
import { defineConfig } from '@ice/app';
import request from '@ice/plugin-request';

export default defineConfig(() => ({
  plugins: [
    request(),
  ],
}));
```

## 目录约定

框架约定 `service` 目录用于收敛请求逻辑，目录组织如下：

```diff
 src
 ├── models
+├── services                       // 定义全局数据请求，非必须
+│   └── user.ts
 └── pages
 |   ├── home
 |   │   ├── models
+|   │   ├── services               // 定义页面级数据请求
+|   │   |    └── repo.ts
 |   │   └── components
 |   ├── about
 |   │   ├── services
 |   │   ├── components
 |   │   └── index.tsx
 └── app.ts
```

通过调用 `request` 定义数据请求如下：

```ts title="pages/home/service/repo.ts"
import { request } from 'ice';

export default {
  // 简单场景
  async getUser() {
    return await request('/api/user');
  },

  // 参数场景
  async getRepo(id) {
    return await request(`/api/repo/${id}`);
  },

  // 格式化返回值
  async getDetail(params) {
    const data = await request({
      url: `/api/detail`,
      params
    });

    return data.map(item => {
      return {
        ...item,
        price: item.oldPrice,
        text: item.status === '1' ? '确定' : '取消'
      };
    });
  }
}
```

## 消费 service

消费 service 主要有两种方式：

- 在模型中调用 service：`service` -> `model` -> `view`
- 在视图中调用 service：`service` -> `view`

### 在模型中调用 service

> 结合 [状态管理](./store.md) 使用

- `service`：约定数据请求统一管理在 services 目录下；
- `model`：约定数据请求统一在 models 里进行调用；
- `view`：最终在视图里通过调用 models 的 effects 的方法触发数据请求。

在模型中调用定义好的 service：

```ts
import userService from '@/services/user';

// src/models/user.ts
export default {
  state: {
    name: 'taoxiaobao',
    age: 20,
  },
  reducers: {
    update(prevState, payload) {
      return { ...prevState, ...payload };
    },
  },
  effects: (dispatch) => ({
    async fetchUserInfo() {
      const data = await userService.getUser();
      dispatch.user.update(data);
    },
  }),
};
```

- 在视图中调用模型方法：

```tsx
import React, { useEffect } from 'react';
import store from '@/store';

const HomePage = () => {
  // 调用定义的 user 模型
  const [userState, userDispatchers] = store.useModel('user');

  useEffect(() => {
    // 调用 user 模型中的 fetchUserInfo 方法
    userDispatchers.fetchUserInfo();
  }, []);

  return <>Home</>;
};
```

### 在视图中调用 service

- `service`：约定数据请求统一管理在 services 目录下；
- `view`：最终在视图里通过 useRequest 直接调用 service 触发数据请求。

```tsx
import React, { useEffect } from 'react';
import { useRequest } from 'ice';
import userService from '@/services/user';

export default function HomePage() {
  // 调用 service
  const { data, error, loading, request } = useRequest(userService.getUser);

  useEffect(() => {
    // 触发数据请求
    request();
  }, []);

  return <>Home</>;
}
```

## API

### request

request 基于 axios 进行封装，在使用上整体与 axios 保持一致，差异点：

1. 默认只返回服务端响应的数据 `Response.data`，而不是整个 Response，如需返回整个 Response 请通过 `withFullResponse` 参数开启
2. 在 axios 基础上默认支持了多请求实例的能力

使用方式如下：

```ts
import { request } from 'ice';

async function getList() {
  const resData = await request({
    url: '/api/user',
  });
  console.log(resData.list);

  const { status, statusText, data } = await request({
    url: '/api/user',
    withFullResponse: true
  });
  console.log(data.list);
}
```

常用使用方式：

```js
request(RequestConfig);

request.get('/user', RequestConfig);
request.post('/user', data, RequestConfig);
```

RequestConfig:

```js
{
  // `url` is the server URL that will be used for the request
  url: '/user',
  // `method` is the request method to be used when making the request
  method: 'get', // default
  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: {
    ID: 12345
  },
  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
  data: {
    firstName: 'Fred'
  },
  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 1000, // default is `0` (no timeout)
  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false, // default
  // `responseType` indicates the type of data that the server will respond with
  // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default
  // should be made return full response
  withFullResponse: false,
  // request instance name
  instanceName: 'request2'
}
```

更完整的配置请 [参考](https://github.com/axios/axios#request-config)。

返回完整 Response Scheme 如下：

```ts
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the HTTP headers that the server responded with
  // All header names are lower cased and can be accessed using the bracket notation.
  // Example: `response.headers['content-type']`
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance in the browser
  request: {}
}
```

### useRequest

使用 useRequest 可以极大的简化对请求状态的管理，useRequest 基于 [ahooks/useRequest](https://ahooks.js.org/zh-CN/hooks/use-request/index) 封装，差异点：

- 将 `requestMethod` 参数默认设置为上述的 `request`（即 axios），保证框架使用的一致性
- manual 参数默认值从 `false` 改为 `true`，因为实际业务更多都是要手动触发的
- 返回值 `run` 改为 `request`，因为更符合语义

#### API

```ts
const {
  // 请求返回的数据，默认为 undefined
  data,
  // 请求抛出的异常，默认为 undefined
  error,
  // 请求状态
  loading,
  // 手动触发请求，参数会传递给 service
  request,
  // 当次执行请求的参数数组
  params,
  // 取消当前请求，如果有轮询，停止
  cancel,
  // 使用上一次的 params，重新执行请求
  refresh,
  // 直接修改 data
  mutate,
  // 默认情况下，新请求会覆盖旧请求。如果设置了 fetchKey，则可以实现多个请求并行，fetches 存储了多个请求的状态
  fetches
} = useRequest(service, {
  // 默认为 true 即需要手动执行请求
  manual,
   // 初始化的 data
  initialData,
  // 请求成功时触发，参数为 data 和 params
  onSuccess,
  // 请求报错时触发，参数为 error 和 params
  onError,
  // 格式化请求结果
  formatResult,
  // 请求唯一标识
  cacheKey,
  // 设置显示 loading 的延迟时间，避免闪烁
  loadingDelay,
  // 默认参数
  defaultParams,
  // 轮询间隔，单位为毫秒
  pollingInterval,
  // 在页面隐藏时，是否继续轮询，默认为 true，即不会停止轮询
  pollingWhenHidden,
  // 根据 params，获取当前请求的 key
  fetchKey,
  // 在屏幕重新获取焦点或重新显示时，是否重新发起请求。默认为 false，即不会重新发起请求
  refreshOnWindowFocus,
  // 屏幕重新聚焦，如果每次都重新发起请求，不是很好，我们需要有一个时间间隔，在当前时间间隔内，不会重新发起请求，需要配置 refreshOnWindowFocus 使用
  focusTimespan,
  // 防抖间隔, 单位为毫秒，设置后，请求进入防抖模式
  debounceInterval,
  // 节流间隔, 单位为毫秒，设置后，请求进入节流模式。
  throttleInterval,
  // 只有当 ready 为 true 时，才会发起请求
  ready,
  // 在 manual = false 时，refreshDeps 变化，会触发请求重新执行
  refreshDeps,
});
```

#### 常用使用方式

```ts
import { useRequest } from 'ice';
// 用法 1：传入字符串
const { data, error, loading } = useRequest('/api/repo');

// 用法 2：传入配置对象
const { data, error, loading } = useRequest({
  url: '/api/repo',
  method: 'get',
});

// 用法 3：传入 service 函数
const { data, error, loading, request } = useRequest((id) => ({
  url: '/api/repo',
  method: 'get',
  data: { id },
});
```

更多使用方式详见 [ahooks/useRequest](https://ahooks.js.org/zh-CN/hooks/use-request/index)

### 请求配置

在实际项目中通常需要对请求进行全局统一的封装，例如配置请求的 baseURL、统一 header、拦截请求和响应等等，这时只需要在应用的的 appConfig 中进行配置即可。

```ts title="src/app.tsx"
import { defineRequestConfig } from '@ice/plugin-request/esm/types';

export const requestConfig = defineRequestConfig({
  // 可选的，全局设置 request 是否返回 response 对象，默认为 false
  withFullResponse: false,

  baseURL: '/api',
  headers: {},
  // ...RequestConfig 其他参数

  // 拦截器
  interceptors: {
    request: {
      onConfig: (config) => {
        // 发送请求前：可以对 RequestConfig 做一些统一处理
        config.headers = { a: 1 };
        return config;
      },
      onError: (error) => {
        return Promise.reject(error);
      },
    },
    response: {
      onConfig: (response) => {
        // 请求成功：可以做全局的 toast 展示，或者对 response 做一些格式化
        if (!response.data.status !== 1) {
          alert('请求失败');
        }
        return response;
      },
      onError: (error) => {
        // 请求出错：服务端返回错误状态码
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return Promise.reject(error);
      },
    },
  },
});
```

### 多个请求配置

在某些复杂场景的应用中，我们也可以配置多个请求，每个配置请求都是单一的实例对象。

```ts title="src/app.tsx"
import { defineRequestConfig } from '@ice/plugin-request/esm/types';

export const requestConfig = defineRequestConfig([
  {
    baseURL: '/api',
    // ...RequestConfig 其他参数
  },
  {
    // 配置 request 实例名称，如果不配默认使用内置的 request 实例
    instanceName: 'request2',
    baseURL: '/api2',
    // ...RequestConfig 其他参数
  }
]);
```

使用示例：

```ts
import { request } from 'ice';

export default {
  // 使用默认的请求方法，即调用 /api/user 接口
  async getUser() {
    return await request({
      url: '/user',
    });
  },

  // 使用自定义的 request 请求方法，即调用接口 /api2/user
  async getRepo(id) {
    return await request({
      instanceName: 'request2',
      url: `/repo/${id}`,
    });
  },
};
```

## 异常处理

无论是拦截器里的错误参数，还是 `request` / `useRequest` 返回的错误对象，都符合以下类型：

```js
const error = {
  // 服务端返回错误状态码时则存在该字段
  response: {
    data: {},
    status: {},
    headers: {}
  },
  // 服务端未返回结构时则存在该字段
  request: XMLHttpRequest,
  // 一定存在，即 RequestConfig
  config: {
  },
  // 一定存在
  message: ''
}
```

## 高阶用法

### Mock 接口

项目开发初期，后端接口可能还没开发好或不够稳定，此时前端可以通过 Mock 的方式来模拟接口，参考文档 [本地 Mock 能力](../basic/mock.md)。

### 如何解决接口跨域问题

当访问页面地址和请求接口地址的域名或端口不一致时，就会因为浏览器的同源策略导致跨域问题，此时推荐后端接口通过 CORS 支持信任域名的跨域访问，具体请参考：

- [HTTP 访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
- [跨域资源共享 CORS 详解](https://www.ruanyifeng.com/blog/2016/04/cors.html)
- [Using CORS](https://www.html5rocks.com/en/tutorials/cors/)

### 根据环境配置不同的 baseURL

大部分情况下，前端代码里用到的后端接口写的都是相对路径如 `/api/getFoo.json`，然后访问不同环境时浏览器会根据当前域名发起对应的请求。如果域名跟实际请求的接口地址不一致，则需要通过 `request.baseURL` 来配置：

```ts title="src/app.tsx"
import { defineRequestConfig } from '@ice/plugin-request/esm/types';

export const requestConfig = defineRequestConfig({
  baseURL: '//service.example.com/api',
});
```

结合[构建配置](../basic/env.md)即可实现不同环境使用不同的 baseURL：

```shell title=".env.local"
# The should not be committed.
BASEURL=http://localhost:9999/api
```

```shell title=".env.prod"
BASEURL=https://example.com/api
```

在 `src/app.tsx` 中配置 `request.baseURL`:

```ts title="src/app.tsx"
import { defineRequestConfig } from '@ice/plugin-request/esm/types';

export const requestConfig = defineRequestConfig({
  baseURL: process.env.BASEURL,
});
```
