import { runApp } from 'rax-app';
import staticConfig from './app.json';

runApp({
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
}, staticConfig);
