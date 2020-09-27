import { runApp } from 'rax-app';
import staticConfig from './app.json';

console.log('==', staticConfig);

runApp({
  app: {
    onShow() {
      console.log('app show...');
    },
    onHide() {
      console.log('app hide...');
    }
  },
}, staticConfig);
