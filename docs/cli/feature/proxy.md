---
title: 使用 Proxy 能力
order: 3
---

在使用代理功能时，请先明确一下问题：

- 所谓代理功能，是为了调试使用的，只能在本地开发时生效，构建或者发布之后无法使用
- ice-scripts 启动的代理服务只能代理当前服务端口的请求，比如 `http://127.0.0.1:4444/api/foo`，其他 ip 或者端口的请求都无法被代理，需要此功能的话请使用 Charles 或者 Nginx
- 如果后端服务对接口做了登录鉴权，基本很难代理成功，因为请求发出的前端页面里没有 cookie 等用户信息

然后结合一些常见的跨域场景推荐一些方案：

- 后端服务已部署（无论是测试环境还是生产环境），需要调试前端代码：直接访问后端服务的页面地址，然后将页面里加载的前端资源通过 [chrome 插件 xswitch](https://github.com/yize/xswitch) 代理成本地前端调试服务的资源，没有跨域问题，完全真实的数据，调试成本极低
- 同一个人同时开发前端和后端代码，直接访问后端的服务地址比如 `http://127.0.0.1:6001`，这个页面里加载本地的前端资源，实现前后端代码的同时调试

如果不符合以上情况，那应该就属于下面的情况了，推荐通过代理功能解决：

为了代码维护性考虑前端请求后端接口时写的都是相对路径如 `/api/getFoo.json`，此时如果我们在本地通过访问`http://127.0.0.1:4444` 来调试页面，所有相对路径的 API 最终都会变成 `http://127.0.0.1:4444/api/getFoo.json`，因为我们的前端调试服务并没有提供这些接口，这些请求自然都会以 404 而结束，这时候就需要将这些请求代理到真正的服务地址：

## 操作方式

在 `ice.config.js` 中配置 `proxy` 字段：

```js
// ice.config.js
module.exports = {
  proxy: {
    '/**': {
      enable: true,
      target: 'http://127.0.0.1:6001'
    }
  }
}
```

完整的配置项请参考 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)。

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

请求发出后将会被代理到 `http://127.0.0.1:6001/api/proxy`，代理成功后可在 network 面板看到对应的信息：

![](https://img.alicdn.com/tfs/TB1ivvqKxnaK1RjSZFBXXcW7VXa-769-407.png)

### 注意事项

- 代理之后我们可以通过相对路径的接口正常请求到后端服务，但是如果后端接口做了帐号登录鉴权之类的事情请求一样会失败，因为此时调试页面里并没有登录相关的 cookie 信息
- 代理之后可以理解为请求是从服务端发出，因此绕过了浏览器的同源策略，一定程度可以解决跨域问题，但一样无法绕过上文提到的 cookie 鉴权等相关问题
