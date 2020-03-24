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

在实际项目中通常需要对请求进行全局统一的封装，例如配置请求的 baseURL，拦截请求和响应、取消请求等等，这时只需要在应用的的 appConfig 中进行配置即可。

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
