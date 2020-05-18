import React from 'react';
import { createApp, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  app: {
    getInitialData: async () => {
      return {
        role: ['admin', 'guest']
      }
    },
  },
  auth: {
    // 可选的，设置无权限时的展示组件，默认为 null
    noAuthFallback: <div>没有权限</div>,

    // 可选的，通过 getInitialState 获取的数据可通过 setRole 进行格式化处理
    setRole: (initialData) => {
      return initialData.role;
    }
  }
};

createApp(appConfig);
