---
title: 前后端通信
order: 2
---

前后端通信通常使用 AJAX 方案，对于 AJAX 社区有非常多的封装，目前主流推荐 [axios](https://github.com/axios/axios)。

## 使用 axios 进行通信

安装依赖：

```bash
$ npm install axios --save
```

通常情况下，AJAX 请求都是异步的，因此 axios 默认返回一个 Promise，因此你可以通过 Promise 或者 async/await 的方式调用：

```js
import axios from 'axios';

// async/await 方式使用
async function getUser() {
  try {
    const response = await axios.get('/user', {
      params: {
        ID: 12345
      }
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

// Promise 方式调用
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle network error
    console.log(error);
  })

// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  // request query
  params: {
    foo: 'bar'
  },
  // request body
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});

// 在 React 组件中使用
import React from 'react';

class Demo extends React.Component {
  state = {
    page: 1,
    pageSize: 10,
    total: 0,
    dataSource: [],
  }

  componentDidMount() {
    this.getData({page: 1, pageSize: 10})
  }

  getData(params) {
    axios({
      method: 'get',
      url: '/api/getData',
      params,
    }).then(response => {
      const { page, pageSize, total, dataSource } = res.data.data;
      this.setState({ page, pageSize, total, dataSource });
    });
  }

  render() {
    const { dataSource, page, pageSize, total } = this.state;
    return <div>...</div>
  }
}
```

在这些基础功能基础上，axios 支持丰富的请求参数、异常状态码判断、全局处理异常、全局配置请求参数等，具体参见 [axios 文档](https://github.com/axios/axios#axios)。

## 使用 DataBinder 简化状态管理

在 React 中使用 axios 时，因为数据是异步的，因此开发者往往需要定义一堆 state 来映射这些数据，这样做一方面管理起来比较麻烦，另一方面也会产生很多重复代码，因此飞冰提供了 [DataBinder](https://ice.work/component/databinder) 组件来解决这个问题，开发者只需要按照约定进行配置，然后在组件中直接使用这些数据即可：

```jsx
import React, { Component } from 'react';
import DataBinder from '@icedesign/data-binder';

@DataBinder({
  fooData: {
    url: 'https://www.easy-mock.com/mock/5cc669767a9a541c744c9be7/databinder/success',
    defaultBindingData: {
      foo: 'bar'
    }
  }
})
class App extends Component {
  componentDidMount() {
    this.props.updateBindingData('fooData', {
      params: {
        key: 'init'
      }
    });
  }

  render() {
    const { fooData } = this.props.bindingData;
    const { foo, __loading, __error } = fooData;

    return <div>...</div>;
  }
}
```

## 跨域问题

因为浏览器的同源策略，前端经常要面临跨域问题，同源策略/SOP（Same origin policy）是一种约定，由 Netscape 公司 1995 年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到 XSS、CSFR 等攻击。所谓同源是指协议、域名、端口三者相同，**因此如果当前页面与发起 AJAX 请求的地址中协议、域名、端口有一个不一致，则会出现跨域问题，跨域问题最明显的现象是 AJAX 接口无法请求成功**。

应对跨域问题有非常多的方案，当下主流以及推荐的方案是 CORS(Cross-origin resource sharing)，CORS 是一个 W3C 标准，全称是跨域资源共享。它允许浏览器向跨源服务器发起 MLHttpRequest 请求，从而克服了同源策略的限制。CORS 需要服务端配置一些头信息，这方面谷歌上有非常多的内容可以参考，这里不再详细描述，具体可参考 [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)。
