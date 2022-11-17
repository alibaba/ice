import { request as requestAPI, defineDataLoader } from 'ice';
import { defineRequestConfig } from '@ice/plugin-request/esm/types';

export const dataLader = defineDataLoader(async () => {
  try {
    return await requestAPI('/user');
  } catch (err) {
    console.log('request error', err);
  }
});

export default {
  app: {
    rootId: 'app',
  },
};

export const requestConfig = defineRequestConfig(() => ({
  // 可选的，全局设置 request 是否返回 response 对象，默认为 false
  withFullResponse: false,
  baseURL: '/api',
  headers: {},
  // 其它 RequestConfig 参数

  // 拦截器
  interceptors: {
    request: {
      onConfig: (config) => {
        // 发送请求前：可以对 RequestConfig 做一些统一处理
        config.headers = { a: 1 };
        return config;
      },
      onError: (error) => {
        return Promise.reject(error);
      },
    },
    response: {
      onConfig: (response) => {
        console.log(response);
        // 请求成功：可以做全局的 toast 展示，或者对 response 做一些格式化
        if (response.data.status === 1) {
          alert('请求失败');
        }
        return response;
      },
      onError: (error) => {
        // MOCK DATA for `/api/user`
        if (error.config.url === '/api/user') {
          return new Promise((resolve) => {
            setTimeout(() => {
              error.response.data = {
                name: 'ICE',
                age: 26,
              };
              resolve(error.response);
            }, 1000);
          });
        }
        // 请求出错：服务端返回错误状态码
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return Promise.reject(error);
      },
    },
  },
}));
