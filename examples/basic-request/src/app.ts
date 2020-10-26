import { runApp, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
  },

  // 配置单一请求实例
  // request: {
  //   // 可选的，全局设置 request 是否返回 response 对象，默认为 false
  //   // withFullResponse: true,
  //   baseURL: '/api',
  //   interceptors: {
  //     response: {
  //       // 可选的
  //       onConfig: (config) => {
  //         return config;
  //       },
  //       // 可选的
  //       onError: (error) => {
  //         return Promise.reject(error);
  //       }
  //     },
  //   }
  // },

  // 配置多个请求实例
  request: [
    {
      // 可选的，全局设置 request 是否返回 response 对象，默认为 false
      // withFullResponse: true,
      baseURL: '/api',
      interceptors: {
        response: {
          // 可选的
          onConfig: (config) => {
            return config;
          },
          // 可选的
          onError: (error) => {
            return Promise.reject(error);
          }
        },
      }
    },
    {
      instanceName: 'request2',
      baseURL: '/api2'
    }
  ]
};

runApp(appConfig);
