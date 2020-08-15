import { runApp } from 'rax-app';

runApp({
  app: {
    onShow() {
      console.log('app show...');
    },
    onHide() {
      console.log('app hide...');
    }
  }
});
