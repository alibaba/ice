---
title: 插件-代理配置
category: Iceworks
order: 2
---

代理功能是前后端联调时很常见的需求，为了代码维护性考虑前端请求后端接口时写的都是相对路径如 `/api/getFoo.json`，此时如果我们在本地通过访问`http://127.0.0.1:4444` 来调试页面，所有相对路径的 API 最终都会变成 `http://127.0.0.1:4444/api/getFoo.json`，因为我们调试服务并没有提供这些接口，这些请求自然都会以 404 而结束。本文档介绍代理功能的使用方法。

## 操作方式

以下两种方式都可以使用：

1. 在 Iceworks 上点击代理配置的编辑按钮，进行代理配置
2. 在 `package.json` 中配置 `proxyConfig` 字段：

  ```js
  {
    ...
    "proxyConfig": {
      "/**": {
        "enable": true,
        "target": "http://127.0.0.1:6001"
      }
    }
  }
  ```

### 匹配规则

```
         foo://example.com:8042/over/there?name=ferret#nose
         \_/   \______________/\_________/ \_________/ \__/
          |           |            |            |        |
       scheme     authority       path        query   fragment
```

- `/` 匹配所有规则
- `/api` 匹配 path 以 `/api` 开头的路径

### 代理示例

```js
axios({
  url: '/api/proxy',
  method: 'get',
})
  .then((response) => {})
  .catch((err) => {});
```

请求发出后将会被代理到 `http://127.0.0.1:6001/api/proxy`

### 注意事项

- 代理之后我们可以通过相对路径的接口正常请求到后端服务，但是如果后端接口做了帐号登录鉴权之类的事情请求一样回失败，因为此时调试页面里并没有登录相关的 cookie 信息
- 代理之后可以理解为请求是从服务端发出，因此绕过了浏览器的同源策略，一定程度可以解决跨域问题，但一样无法绕过上文提到的 cookie 鉴权等相关问题
