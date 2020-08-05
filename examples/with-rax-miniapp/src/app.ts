import { createApp } from 'rax-app';

createApp({
  app: {
    onShow() {
      console.log('app show...');
    },
    onHide() {
      console.log('app hide...');
    }
  }
});
