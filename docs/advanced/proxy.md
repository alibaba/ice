---
title: 解决跨域接口调试问题
category: 进阶指南
order: 6
---

项目在本地开发调试时，预览的地址是 *http://127.0.0.1:3333* 本地的地址。

而一些接口服务往往由服务端的开发同学提供接口。

假如我们需要请求的接口地址是 `https://suggest.taobao.com/sug?code=utf-8&k=1&area=c2c&bucketid=8` 由于域名不同的问题。

```js
ajax({
  url: 'https://suggest.taobao.com/sug?code=utf-8&k=1&area=c2c&bucketid=8',
  dataType: 'json',
  data: {
    q: '连衣裙'
  }
}, (err, res) => {
  console.log(res)
});
```

这段代码在发起请求则会报错，可以在 Chrome 浏览器的开发者工具 Console 上看到：

![image](http://git.cn-hangzhou.oss.aliyun-inc.com/uploads/ice/notes/0c3688b3ee78253014add557726fe548/image.png)

```
XMLHttpRequest cannot load https://suggest.taobao.com/sug?q=%E8%BF%9E%E8%A1%A3%E8%A3%99&code=utf-8&k=1&area=c2c&bucketid=8.
Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header
is present on the requested resource. Origin 'http://127.0.0.1:3333' is therefore not allowed access.
```

> 扩展阅读：[HTTP访问控制(CORS)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)

通过 `http://127.0.0.1:3333` 发起请求，与 `suggest.taobao.com` 不同域，根据同源策略浏览器无法响应该请求。

## 通过代理解决跨域问题

了解了上面的错误问题后，我们可以通过代理设置绕过此限制。

还是通过 `http://127.0.0.1:3333` 发起请求，将以上代码修改为：

```js
ajax({
  url: '/sug?code=utf-8&k=1&area=c2c&bucketid=8',
  dataType: 'json',
  data: {
    q: '连衣裙'
  }
}, (err, res) => {
  console.log(res)
});
```

删除接口中的域名，使用相对地址请求，此时发起的请求是 `http://127.0.0.1:3333/sug?code=utf-8&k=1&area=c2c&bucketid=8`

这是一个不存在项目中的地址。再通过代理的功能将 `http://127.0.0.1:3333/sug?code=utf-8&k=1&area=c2c&bucketid=8` 的请求代理到 `https://suggest.taobao.com/sug?code=utf-8&k=1&area=c2c&bucketid=8` 上。解决跨域请求问题。

## 开启代理功能

根据需要代理的域名，如上的例子需要代理的域名是 `suggest.taobao.com`。

`def dev --proxy [proxy]` 启动本地调试即可开启代理功能。

如：

```bash
$ def dev --proxy suggest.taobao.com
[16:19:45] 正在启动 ICE server, port: 3333 . livereload: 49670
[16:19:45] 已启用 ICE 反向代理服务器, 反代地址: http://suggest.taobao.com
>>   ICE server at: http://127.0.0.1:3333
  ICE 代码编译中  [====================]  100% (8.5 seconds)

Build completed in 8.644s
```

启动日志中会显示出代理的信息 **`[16:19:45] 已启用 ICE 反向代理服务器, 反代地址: http://suggest.taobao.com`** 表示已开启代理功能。

再回来浏览器上看发出的请求信息：

![image](http://git.cn-hangzhou.oss.aliyun-inc.com/uploads/ice/notes/f00b2c0227706e40b903b4e57b1f950a/image.png)

在 Response Headers 里新增了 x-ice-proxy 和 x-ice-proxy-path 的响应头信息。则表示已成功代理。

## 总结

通过 `def dev --proxy [proxy]` 参数启动本地调试，可解决跨域请求接口的问题，提高本地开发调试的效率。
