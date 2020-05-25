---
title: 本地 Proxy 方案
order: 9
---

本地开发场景下，访问页面的 url 是 `http://127.0.0.1:3333`，但是后端接口可能是其他 ip、域名或端口，此时就会产生跨域问题，导致无法调试，针对这个问题推荐两种代理方式：

1. 访问前端页面地址代理后端接口：访问 `npm start` 启动的页面地址 `http://127.0.0.1:3333`，然后将页面中发出的请求代理到前端调试服务（devServer），然后通过调试服务向后端发起实际的接口请求
2. 访问后端页面地址代理前端资源：访问后端服务提供的页面 url 地址，此时页面中通常加载的都不是本地调试的前端资源，因此无法联调，需要通过工具进行资源地址的代理

|         纬度\方案       | 访问前端页面地址代理后端接口 | 访问后端地址代理前端资源 |
|------------------------|---------------------------|------------------------|
|浏览器中打开的页面地址     | http://127.0.0.1:3333     | 用户真实访问的地址如：https://taobao.com |
|是否支持接口鉴权          | 不支持（本地页面没有用户信息） | 支持                     |
|是否依赖后端服务          | 弱依赖（只有接口）           | 强依赖（页面+接口）         |

两种方式的优缺点如上，开发者按需选择一个即可。接下来介绍两种方案具体的操作方式。

## 访问前端调试地址代理后端接口

### 配置 proxy 字段

在 `build.json` 中配置 `proxy` 字段：

```js
{
  "proxy": {
	  "/api": {
      "enable": true,
      "target": "http://127.0.0.1:6001"
    }
  }
}
```

页面中发出的所有 `/api` 开头的接口都会被代理到 `http://127.0.0.1:6001`。proxy 完整的配置项请参考 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)。

### 匹配规则

```
         foo://example.com:8042/over/there?name=ferret#nose
         \_/   \______________/\_________/ \_________/ \__/
          |           |            |            |        |
       scheme     authority       path        query   fragment
```

- `/` 匹配所有规则
- `/api` 匹配 path 以 `/api` 开头的路径

### 请求示例

```js
request({
  url: '/api/proxy',
  method: 'get',
});
```

请求发出后将会被代理到 `http://127.0.0.1:6001/api/proxy`，代理成功后可在 network 面板看到对应的信息：

![](https://img.alicdn.com/tfs/TB1ivvqKxnaK1RjSZFBXXcW7VXa-769-407.png)

## 访问后端地址代理前端资源

直接访问后端服务提供的页面 url 地址，然后将页面中加载的资源代理成本地调试的资源，推荐两种方案：

1. **推荐**：通过 icejs 插件 [build-plguin-smart-debug](/docs/guide/develop/plugin-list#plugin-smart-debug)
2. [chrome 插件 xswitch](https://github.com/yize/xswitch)
