---
title: 如何实现前后端通信
order: 9
category: 入门指引
---

实现前后端通信，我们推荐使用 Ajax 与后端 HTTP API 接口通信的方案。传输数据格式描述使用 JSON。

## 如何通信

ICE 提供了 ice-ajax 方法库提供基础的 AJAX 能力，也可以为组件（比如 Table）绑定 AJAX 接口数据，方便查询异步数据以及错误处理。

首先安装模块：

```bash
def add @ali/ice-ajax
```

引入，并使用 `ajax` 函数发送请求：

```js
import { ajax } from '@ali/ice-ajax';

ajax({
  url: '/path/to/your/api',
  type: 'POST',
  data: {
    foo: 'bar'
  }
}, (err, res) => {
  // handle response
});
```

`ajax` 函数的第一个参数是一个 JavaScript 的 object，用来对请求的配置进行描述。

`options` 配置基本描述：

```js
{
    // 请求发送的地址
    url: '',
    // 期望能够从服务器返回的数据类型，可选值为：`json`、`jsonp`、`script`、`xml`、`html`、`text`。如果没有指定，将尽量从返回的 `mimeType` | `Content-type` 相应头中推导出来
    dataType: '',
    // 超时时间，单位为秒，超时后会触发 error
    timeout: 3,
    // 请求类型，可选：get、post，默认 get
    type: '',
    // 发送的数据，如果为 Object 类型则会通过 param() 格式化为字符串，但 data 不能为嵌套 object 等复杂类型，只能为一级简单 object，如有嵌套数据，请自行序列化 JSON.stringify(data)
    data: '{String` | `Object}',
    // 是否缓存请求，dataType 为 script 或 jsonp 时默认 false，其他默认为 true。false 时则会自动给请求 url 加上时间戳
    cache: false
}
```

扩展阅读：[ice-ajax](/modules/ice-ajax)

## 通信过程的异常处理

ajax 的第二个参数是一个回调函数，这个函数会传入两个参数，一个是异常对象（err），如果这个值不为 `null`表示这个请求发送失败（可能由于跨域限制等），第二个是请求返回的数据（res），如果按照 JSON 格式约定了接口内容，这个值会自动被 `JSON.parse`成 JavaScript 的 object 或 array。

对于请求获得的数据，我们需要先进行数据校验，确认数据完整性，再使用。

```js
ajax({
  url: '/path/to/your/api'
}, (err, res) => {
  if (err) {
    // 前端发请求出错

  } else if (!res || res.status !== "status") {
    // 后端请求来的数据校验不通过

  } else {
    // 正常逻辑

  }
});
```

对于一些较深的对象数据，如果后端返回为空，就可能导致渲染异常，所以需要进行先行判断：

<span style="color: red;">注意：以下是错误的用法</span>

```js
this.setState({
  foo: data.list.foo
});
```

**最佳实践**

```js
if (data && data.list && data.list.foo) {
  this.setState({
    foo: data.list.foo
  });
} else {
  // foo 未取到
}
```

## 同源限制导致的跨域问题

浏览器安全的基石是"同源政策"，所谓"同源"指的是"三个相同"。

- 协议相同
- 域名相同
- 端口相同

举例来说，`http://www.example.com/dir/page.html`这个网址，协议是`http://`，域名是`www.example.com`，端口是`80`（默认端口可以省略）。它的同源情况如下。

- `http://www.example.com/dir2/other.html`：同源
- `http://example.com/dir/other.html`：不同源（域名不同）
- `http://v2.www.example.com/dir/other.html`：不同源（域名不同）
- `http://www.example.com:81/dir/other.html`：不同源（端口不同）

同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。

跨域指的是前端页面请求一个非同源的 API 地址，这种请求一般来说会被浏览器阻挡。

### 解决办法

对于本地调试过程中，可通过代理的方式解决接口调用的跨域问题，[详情见](/docs/addons/proxy)