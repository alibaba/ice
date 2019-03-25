---
title: 如何实现前后端通信
order: 9

---

实现前后端通信，我们推荐使用 axios 或 DataBinder 与后端 HTTP API 接口通信的方案。

传输数据格式描述使用 JSON。

## 使用 axios 进行请求

我们推荐使用 `axios` 方法库提供基础的 Ajax 能力，也可以使用 DataBinder 为组件（比如 Table）绑定 AJAX 接口数据，方便查询异步数据以及错误处理。

首先安装模块：

```bash
npm install axios --save
```

引入对应组件，并使用 `axios` 函数获取数据：

```jsx
import axios from 'axios';

export default class extends Component {
  componentDidMount() {
    // 使用 axios 获取数据
    axios(remoteURL).then((response) => {
      const { body } = response;
      this.setState({
        data: body,
      });
    });
  }

  render() {
    // ...
  }
}
```

> 更多请参考 [axios 的文档](https://github.com/axios/axios)

## 使用 DataBinder 为组件绑定数据

DataBinder 是 ICE 推出的基于约定，在组件上绑定数据和自动更新数据的组件，让你专注于 UI 显示逻辑，从而屏蔽数据状态管理的开发成本。

**使用方法**

```jsx
@DataBinder({
  '模块名 key': {
    url: 'xxxx.json',
    method: 'post',
    // 请求附带的 request 参数，method post 下是 data 参数，method get 下是 params
    data: {
      page: 1,
    },
    // AJAX 部分的参数完全继承自 axios ，参数请详见：https://github.com/axios/axios
    // 下面是请求会返回的默认数据
    defaultBindingData: {
      // ...字段需要与 xxxx.json 接口返回的字段一一对应
    },
  },
})
class ListView extends Component {
  // ...
  render() {
    const { account } = this.props.bindingData;

    return (
      <div>
        <p>用户名：{account.userName}</p>
        <p>年龄：{account.userAge}</p>
      </div>
    );
  }
}
```

> 更多请参考 [DataBinder 的文档](#/component/databinder)

## 最佳实践

对于一些嵌套较深的对象数据，如果后端返回为空，就可能导致渲染异常，所以需要进行先行判断：

**注意：以下是错误的用法**

```js
this.setState({
  foo: data.list.foo,
});
```

**最佳实践**

```js
if (data && data.list && data.list.foo) {
  this.setState({
    foo: data.list.foo,
  });
} else {
  // foo 未取到
}
```

## 同源限制导致的跨域问题

浏览器安全的基石是"同源政策"，所谓"同源"指的是"三个相同"。

* 协议相同
* 域名相同
* 端口相同

举例来说，`http://www.example.com/dir/page.html`这个网址，协议是`http://`，域名是`www.example.com`，端口是`80`（默认端口可以省略）。它的同源情况如下。

* `http://www.example.com/dir2/other.html`：同源
* `http://example.com/dir/other.html`：不同源（域名不同）
* `http://v2.www.example.com/dir/other.html`：不同源（域名不同）
* `http://www.example.com:81/dir/other.html`：不同源（端口不同）

同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。

跨域指的是前端页面请求一个非同源的 API 地址，这种请求一般来说会被浏览器阻挡。
