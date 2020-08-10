---
title: 数据请求
order: 7
---

大多数前端应用都需要通过 HTTP 协议与后端服务器通讯，开发小程序时我们提供了 `universal-request` 用于网络请求。

## HTTP 请求

universal-request 模块已支持多端发送请求，要发起简单的 GET 请求的话，只需简单地将网址作为 url 参数即可。

```js
import request from 'universal-request';

request({
  url: 'https://api.github.com/repos/alibaba/ice'
});
```

universal-request 支持配置请求参数，如 header 参数，或指定使用 POST 方法等。

```js
import request from 'universal-request';

request({
  url: 'https://api.github.com/repos/alibaba/ice',
  method: 'POST',
  data: {
    from: 'ice',
  },
  dataType: 'json'
}).then(response => {})
  .catch(error => {});
```

完成配置选项参考 [request#methods](https://github.com/raxjs/universal-api/tree/master/packages/request#methods)

