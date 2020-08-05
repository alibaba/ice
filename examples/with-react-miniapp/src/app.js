import { createApp } from 'ice';

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
