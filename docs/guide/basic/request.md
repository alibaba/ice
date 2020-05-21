---
title: 数据请求
order: 4
---

大多数前端应用都需要通过 HTTP 协议与后端服务器通讯。在 icejs 框架中内置约定和规范了一套从 UI 交互到请求服务端数据的完整方案，更进一步简化了应用的数据请求流程，基于此提供了 request 和 useRequest Hooks 方法。

## 目录约定

目录组织如下：

```diff
 src
 ├── models
+├── services                       // 定义全局数据请求
+│   └── user.ts
 └── pages
 |   ├── Home
 |   │   ├── models 
+|   │   ├── services               // 定义页面级数据请求
+|   │   |    └── repo.ts
 |   │   ├── components
 |   │   |    └── Todo
 |   |   │    |    ├── index.tsx
 |   |   │    |    ├── model.ts
+|   |   │    |    └── service.ts   // 定义组件级数据请求
 |   │   └── index.tsx
 |   ├── About
 |   │   ├── services
 |   │   ├── components
 |   │   └── index.tsx
 └── app.ts
```

## 定义 service

通过调用 request 定义数据请求如下：

```ts
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
      url: `/api/detail`;
      params,
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

* 在模型中调用 service：`service` -> `model` -> `view`
* 在视图中调用 service：`service` -> `view`

### 在模型中调用 service

* `service`：约定数据请求统一管理在 services 目录下；
* `model`：约定数据请求统一在 models 里进行调用；
* `view`：最终在视图里通过调用 models 的 effects 的方法触发数据请求。

在模型中调用定义好的 service：

```ts
import userService from '@/services/user';

// src/models/user.ts
export default {
  state: {
    name: 'taoxiaobao',
    age: 20
  },
  reducers: {
    update(prevState, payload) {
      return { ...prevState, ...payload };
    }
  },
  effects: (dispatch) => ({
    async fetchUserInfo() {
      const data = await userService.getUser();
      dispatch.user.update(data);
    }
  })
}
```

* 在视图中调用模型方法：

```ts
import React, { useEffect } from 'react';
import { store } from 'ice';

const HomePage = () => {
  // 调用定义的 user 模型
  const [ userState, userDispatchers ] = store.useModel('user');

  useEffect(() => {
    // 调用 user 模型中的 fetchUserInfo 方法
    userDispatchers.fetchUserInfo();
  }, []);

  return (
    <>Home</>
  );
}
```

### 在视图中调用 service

* `service`：约定数据请求统一管理在 services 目录下；
* `view`：最终在视图里通过 useRequest 直接调用 service 触发数据请求。

```ts
import React, { useEffect } from 'react';
import { useRequest } from 'ice';
import userService from '@/services/user';

export default function HomePage() {
  // 调用 service
  const { data, error, isLoading, request } = useRequest(userService.getUser);

  useEffect(() => {
    // 触发数据请求
    request();
  }, []);


  return (
    <>Home</>
  );
}
```

## API

### request

request 基于 axios 进行封装，在使用上与 axios 保持一致，使用方式如下：

```ts
import { request } from 'ice'

async function getList() {
  try {
    const data = await request({
      url: '/api/user'
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
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
}
```

更完整的配置请 [参考](https://github.com/axios/axios#request-config)

request 默认只返回服务端响应的数据，并未返回整个 response，如需返回可以设置 `withFullResponse` 属性，完整的 response 返回格式如下：

Response Schema：

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

* 可以用在 Function Component，使用 useRequest 可以极大的简化对请求状态（error/loading）的管理。
* 可以接收一个 `Object` 或者是 `(...args)=> any` 作为参数。

#### 传入对象作为参数

```ts
const { data, loading, error, request } = useRequest(options: RequestConfig);
```

使用示例：

```ts
import { useRequest } from 'ice';

export default function HomePage() {
  const { data, error, isLoading, request } = useRequest({
    url: '/api/getRepo',
    params: {
      id: 123
    }
  });

  useEffect(() => {
    request();
  }, []);


  return (
    <>Home</>
  );
}
```

#### 传入函数作为参数

```ts
const { data, loading, error, request } = useRequest((...args: any[]) => any);
```

使用示例：

```ts
// src/pages/Home/index.tsx
import { useRequest } from 'ice';
import services from '@/services';

export default function HomePage() {
  const { data, error, isLoading, request } = useRequest(services.getRepo);

  useEffect(() => {
    // 动态传入参数
    const id = 123;
    request(id);
  }, []);


  return (
    <>Home</>
  );
}
```

### 请求配置

在实际项目中通常需要对请求进行全局统一的封装，例如配置请求的 baseURL、统一 header、拦截请求和响应等等，这时只需要在应用的的 appConfig 中进行配置即可。

```js
import { createApp } from 'ice';

const appConfig = {
  request: {
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
        }
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
        }
      },
    }
  }
};

createApp(appConfig);
```

## 异常处理

无论是拦截器里的错误参数，还是 request/useRequest 返回的错误对象，都符合以下类型：

```js
{
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

## 高阶指南

### Mock 接口

项目开发初期，后端接口可能还没开发好或不够稳定，此时前端可以通过 Mock 的方式来模拟接口，参考文档 [本地 Mock 能力](/docs/advance/mock)。

### 使用真实的后端接口调试前端代码

当项目开发到一定时间段时，我们需要联调后端接口，此时可能会遇到各种跨域问题，参考文档 [本地 Proxy 能力](/docs/advace/mock)。

### 如何解决接口跨域问题

当访问页面地址和请求接口地址的域名或端口不一致时，就会因为浏览器的同源策略导致跨域问题，此时推荐后端接口通过 CORS 支持信任域名的跨域访问，具体请参考：

- [HTTP访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
- [跨域资源共享 CORS 详解](https://www.ruanyifeng.com/blog/2016/04/cors.html)
- [Using CORS](https://www.html5rocks.com/en/tutorials/cors/)

### 根据环境配置不同的 baseURL

大部分情况下，前端代码里用到的后端接口写的都是相对路径如 `/api/getFoo.json`，然后访问不同环境时浏览器会根据当前域名发起对应的请求。如果域名跟实际请求的接口地址不一致，则需要通过 `request.baseURL` 来配置：

```js
const appConfig = {
  request: {
    baseURL: '//service.example.com/api'
  }
};
```

结合[运行时配置](/docs/guide/basic/config)即可实现不同环境使用不同的 baseURL：

```js
// src/config.ts
export default {
  local: {
    baseURL: `http://localhost:${process.env.SERVER_PORT}/api`
  },
  dailt: {
    baseURL: 'https://daily.example.com/api'
  },
  prod: {
    baseURL: 'https://example.com/api'
  }
}
```

在 `src/app.ts` 中配置 `request.baseURL`:

```js
import { createApp, config} from 'ice';

const appConfig = {
  request: {
    baseURL: config.baseURL
  }
};

createApp(appConfig);
```
