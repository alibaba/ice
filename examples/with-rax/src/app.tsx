import { createElement } from 'rax';
import { runApp } from 'rax-app';

runApp({
  router: {
    type: 'browser'
  },
  app: {
    // ErrorBoundary
    errorBoundary: true,

    // 生命周期
    onShow() {
      console.log('app show...');
    },
    onHide() {
      console.log('app hide...');
    },

    // 获取初始数据
    getInitialData: async () => {
      return {
        a: 1,
        b: 2
      };
    }
  }
});
