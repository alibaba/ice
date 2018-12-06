---
title: 插件-代理配置
category: Iceworks
order: 2
---

Iceworks 提供代理配置功能，该功能可将匹配的路径代理到目标路径上。

## 代理设置

面板上的设置保存后以 `proxyConfig` 字段的方式保存在 package.json 文件中：

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

观察 network 面板可以看到如下信息：

![](https://img.alicdn.com/tfs/TB1iHxTwgmTBuNjy1XbXXaMrVXa-769-407.png)

## 注意事项

代理并不解决跨域问题，代理目标需要开启 CORS 配置 <https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS>

服务端开启后的请求如下：

![](https://img.alicdn.com/tfs/TB1RmuHweSSBuNjy0FlXXbBpVXa-769-407.png)
