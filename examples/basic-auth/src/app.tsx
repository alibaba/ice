import React from 'react';
import { createApp, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  app: {
    getInitialData: async () => {
      // 模拟服务端返回的数据
      const data = {
        role: 'admin',
        starPermission: true,
        followPermission: true
      };

      // 约定权限必须返回一个 auth 对象
      // 返回的每个值对应一条权限
      return {
        auth: {
          admin: data.role === 'admin',
          guest: data.role === 'guest',
          starRepo: data.starPermission,
          followRepo: data.followPermission
        }
      };
    },
  },
  auth: {
    // 可选的，设置无权限时的展示组件，默认为 null
    NoAuthFallback: <div>没有权限...</div>,
  }
};

createApp(appConfig);
