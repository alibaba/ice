---
title: 前后端通信
order: 4
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
      // request query
      params: {
        id: 1
      }
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

// Promise 方式调用
axios.get('/user')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 发送 POST 请求
axios({
  method: 'post',
  url: '/user',
  // request query
  params: { foo: 'bar' },
  // request body
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```

在这些基础功能上，axios 支持对请求进行自定义配置，如请求参数、异常状态码判断、全局处理异常、全局配置请求参数等，具体参见 [axios 文档](https://github.com/axios/axios#axios)。

业务里通常会有请求成功或失败的通用逻辑，建议参考下文为业务封装统一的请求方法。

## 在 React 组件中请求并渲染数据

请求异步数据并渲染，往往需要在视图上区分不同的视图，比如加载中、接口出错、渲染数据，此处以 Function Component + Hooks 为例：

```js
import React, { useState } from 'react';

function CustomComponent {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios('/list');
        setData(result.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {error && <div>{error.message}</div>}
      {
        loading ? <div>loading...</div> : (
          (data || []).map((item, idx) => {
            return <div key={idx}>{item.name}</div>;
          })
        )
      }
    </>
  );
}
```

## 简化请求状态

通过上面的例子，会发现每个请求都包含请求成功、加载中、请求异常三个状态，如果每个请求都这样处理就会非常繁琐，因此接下来介绍如何通过封装让业务层无需关心请求过程中的这么多状态。对于 React 16.8.0 以下不支持 Hooks 的项目建议使用组件 [DataBinder](https://ice.work/component/databinder)。

在业务代码中封装 request 以及 useRequest 的通用方法：

```jsx
// src/utils/request.js
import { useReducer } from 'react';
import axios from 'axios';
import { Message } from '@alifd/next';

// Set baseURL when debugging production url in dev mode
// axios.defaults.baseURL = '//xxxx.taobao.com';

/**
 * Method to make ajax request
 *
 * @param {object} options - axios config (https://github.com/axios/axios#request-config)
 */
export async function request(options) {
  try {
    const response = await axios(options);
    const { data, error } = handleResponse(response);
    if (error) {
      throw error;
    } else {
      return { response, data };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Hooks to make ajax request
 *
 * @param {object} options - axios config (https://github.com/axios/axios#request-config)
 * @return {object}
 *   @param {object} response - response of axios (https://github.com/axios/axios#response-schema)
 *   @param {object} error - HTTP or use defined error
 *   @param {boolean} loading - loading status of the request
 *   @param {function} request - function to make the request manually
 */
export function useRequest(options) {
  const initialState = {
    response: null,
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(requestReducer, initialState);

  /**
   * Method to make request manually
   * @param {object} config - axios config to shallow merged with options before making request
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

      const { data, error } = handleResponse(response);

      if (error) {
        throw error;
      } else {
        dispatch({
          type: 'success',
          response,
        });
        return { response, data };
      }
    } catch (error) {
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
 * Reducer to handle the status of the request
 * @param {object} state - original status
 * @param {object} action - action of dispatch
 * @return {object} new status
 */
function requestReducer(state, action) {
  switch (action.type) {
    case 'init':
      return {
        response: null,
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
        response: null,
        error: null,
        loading: false,
      };
  }
}

/**
 * Custom response data handler logic
 *
 * @param {object} response - response data returned by request
 * @return {object} data or error according to status code
 */
function handleResponse(response) {
  const { data } = response;
  // Please modify the status key according to your business logic
  // normally the key is `status` or `code`
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

单独使用 `request` 方法：

```js
import { request } from '@/utils/request';

async function test() {
  try {
    const { response, data } = await request({
       url: '/api/list',
    });
    console.log('success', data);
  } catch(err) {
    // request 方法已处理异常，通常这里不需要做特殊处理
    console.error(err);
  }
}
```

在组件中使用 `useRequest` 请求数据并渲染：

```javascript
import { useRequest } from '@/utils/request';

function ListView(props) {
  const { loading, error, response, request } = useRequest({
    url: '/api/list',
    method: 'GET',
  });
  const dataSource = response ? response.data.dataSource : [];

  useEffect(() => {
    request();
  }, []);

  return (
    <>
      {error && <div>{error.message}</div>}
      {loading ? (
        <div>loading....</div>
      ) : (
        data.map(item => {
          return <div>{item.name}</div>;
        })
      )}
    </>
  );
}
```

## 跨域问题

因为浏览器的同源策略，前端经常要面临跨域问题，同源策略/SOP（Same origin policy）是一种约定，由 Netscape 公司 1995 年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到 XSS、CSFR 等攻击。所谓同源是指协议、域名、端口三者相同，**因此如果当前页面与发起 AJAX 请求的地址中协议、域名、端口有一个不一致，则会出现跨域问题，跨域问题最明显的现象是 AJAX 接口无法请求成功**。

应对跨域问题有非常多的方案，当下主流以及推荐的方案是 CORS(Cross-origin resource sharing)，CORS 是一个 W3C 标准，全称是跨域资源共享。它允许浏览器向跨源服务器发起 MLHttpRequest 请求，从而克服了同源策略的限制。CORS 需要服务端配置一些头信息，这方面谷歌上有非常多的内容可以参考，这里不再详细描述，具体可参考 [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)。
