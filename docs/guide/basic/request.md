---
title: 数据请求
order: 4
---

大多数前端应用都需要通过 HTTP 协议与后端服务器通讯。框架内置提供了请求功能，基于社区主流的 axios 进行封装，提供了 request 和 useRequest Hooks 方法。

## request

request 基于 axios 进行封装，在使用上与 axios 保持一致，使用方式如下：

```ts
import { request } from 'ice'

async function getList() {
  try {
    const data = await request({
      url: '/api/list'
    });
    console.log(data);
  } catch (error) {
    console.error(error);
}
```

## useRequest

useRequest 基于 React Hooks 进行封装，因此需要确保 React 版本在 v16.8.0 以上，在组件中使用 `useRequest` 请求数据并渲染：

```jsx
import { useRequest } from 'ice';

function ListView(props) {
  const { data, loading, error, request } = useRequest({
    url: '/api/list',
    method: 'GET',
  });
  const dataSource = data ? data.dataSource : [];

  useEffect(() => {
    request();
  }, []);

  return (
    <>
      {error && <div>{error.message}</div>}
      {loading ? (
        <div>loading....</div>
      ) : (
        dataSource.map(item => {
          return <div>{item.name}</div>;
        })
      )}
    </>
  );
}
```

## 请求配置

在实际项目中通常需要对请求进行全局统一的封装，例如配置请求的 baseURL、拦截请求和响应、取消请求等等，这时只需要在应用的的 appConfig 中进行配置即可。

```js
import { createApp } from 'ice';

const appConfig = {
  request: {
    // ref: https://github.com/axios/axios#request-config
    baseURL: '/api',
    // ref: https://github.com/axios/axios#interceptors
    interceptors: {
      request: {
        onConfig: (config) => {},
        onError: (error) => {}
      },
      response: {
        onConfig: (config) => {},
        onError: (error) => {}
      },
    }
  }
};

createApp(appConfig);
```

更多使用详见：[axios](https://github.com/axios/axios)

## 高阶指南

### Mock 接口

项目开发初期，后端接口可能还没开发好或不够稳定，此时前端可以通过 Mock 的方式来模拟接口，参考文档 [本地 Mock 能力](/docs/advace/mock)。

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
