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

## 使用 hooks 简化状态管理

在异步数据请求中常见的一个需求是显示请求的加载中状态与显示请求的成功失败消息，使用原生的 axios 来实现时开发者往往需要定义相应的 state 来映射这些数据，这样做一方面管理起来比较麻烦，另一方面也会产生很多重复代码，因此对于 React 16.6.0 及以上版本，飞冰封装了一个 useRequest 的 hook 来解决这个问题，代码及使用方法如下：

*提示：对于 React 16.6.0 以下版本的项目建议使用 [DataBinder](https://ice.work/component/databinder)*

以下为 useRequest hook 的代码实现，其中的 `handleResponse` 方法为对 ajax 响应的处理逻辑，需要根据自身业务逻辑自定义：

```jsx
import { useReducer } from 'react';
import axios from 'axios';
import { Message } from '@alifd/next';

/**
 * 发送 ajax 请求的 hook
 *
 * @param {object} options - axios 配置 (https://github.com/axios/axios#request-config)
 * @return {object}
 *   @param {object} response - axios 返回值 (https://github.com/axios/axios#response-schema)
 *   @param {object} error - HTTP 或者用户返回的错误
 *   @param {boolean} loading - 请求的 loading 状态
 *   @param {function} request - 发送 ajax 请求的方法
 */
export function useRequest(options) {
  const initialState = {
    response: null,
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(requestReducer, initialState);

  /**
   * 发送 ajax 请求的方法
   * @param {object} config - 发送请求时的额外 axios 配置 (会与 useRequest 时传入的参数作合并)
   * @return {object}
   *   @param {object} response - axios 返回值 (https://github.com/axios/axios#response-schema)
   *   @param {object} error - HTTP 或者用户返回的错误
   *   @param {boolean} loading - 请求的 loading 状态
   */
  async function request(config) {
    try {
      dispatch({
        type: 'init',
      });

      const response = await axios({
        ...options,
        ...config,
      });

      const { error } = handleResponse(response);

      if (error) {
        throw error;
      } else {
        dispatch({
          type: 'success',
          response,
        });
        return state;
      }
    } catch (error) {
      Message.show({
        type: 'error',
        title: '错误消息',
        content: error.message,
      });
      dispatch({
        type: 'error',
        error,
      });
      throw error;
    }
  }

  return {
    ...state,
    request,
  };
}

/**
 * 处理请求状态的 reducer 方法
 * @param {object} state - 旧的状态
 * @param {object} action - dispatch 的 action 对象
 * @return {object} 新状态
 */
function requestReducer(state, action) {
  switch (action.type) {
    case 'init':
      return {
        repsonse: null,
        error: null,
        loading: true,
      };
    case 'success':
      return {
        response: action.response,
        error: null,
        loading: false,
      };
    case 'error':
      return {
        response: null,
        error: action.error,
        loading: false,
      };
    default:
      return {
        repsonse: null,
        error: null,
        loading: false,
      };
  }
}

/**
 * ajax 响应值自定义处理逻辑，根据业务需求自定义
 * @param {object} response - ajax 请求返回值
 * @return {object} 根据状态码返回成功数据或者错误对象
 */
function handleResponse(response) {
  const { data } = response;

  // 响应状态码通常为 status 或者 code，此处根据接口规范自定义
  if (data.status === 'SUCCESS') {
    return { data };
  } else if (data.status === 'NOT_LOGIN') {
    location.href = '';
  } else {
    const error = new Error(data.message || '后端接口异常');
    return { error };
  }
}
```

以下为使用 useRequest 的代码示例：

```javascript
import useRequest from './useRequest';

function ListView(props) {
  const { loading, error, response, request } = useRequest({
    url: '/api/list',
    method: 'GET',
  });

  useEffect(() => {
    request(); // 发 ajax 请求
  }, []);

  const loadingView = (
    <div>
      载入中...
    </div>
  );
  const errorView = (
    <div>
      {error.message}
    </div>
  );
  const listView = error ? errorView : (
    <div>
      {response && response.data && response.data.map((item) => {
        return item.content;
      })}
    </div>
  );

  return (
    <div>
      {loading ? loadingView : listView}
    </div>
  );
}
```

## 跨域问题

因为浏览器的同源策略，前端经常要面临跨域问题，同源策略/SOP（Same origin policy）是一种约定，由 Netscape 公司 1995 年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到 XSS、CSFR 等攻击。所谓同源是指协议、域名、端口三者相同，**因此如果当前页面与发起 AJAX 请求的地址中协议、域名、端口有一个不一致，则会出现跨域问题，跨域问题最明显的现象是 AJAX 接口无法请求成功**。

应对跨域问题有非常多的方案，当下主流以及推荐的方案是 CORS(Cross-origin resource sharing)，CORS 是一个 W3C 标准，全称是跨域资源共享。它允许浏览器向跨源服务器发起 MLHttpRequest 请求，从而克服了同源策略的限制。CORS 需要服务端配置一些头信息，这方面谷歌上有非常多的内容可以参考，这里不再详细描述，具体可参考 [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)。
