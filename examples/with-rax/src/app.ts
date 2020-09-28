import { runApp } from 'rax-app';

runApp({
  router: {
    type: 'browser'
  },
  app: {
    onShow() {
      console.log('app show...');
    },
    onHide() {
      console.log('app hide...');
    },
    getInitialData: async () => {
      return {
        a: 1,
        b: 2
      };
    }
  }
});
