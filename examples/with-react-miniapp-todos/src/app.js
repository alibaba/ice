import { runApp } from 'ice';

runApp({
  app: {
    onShow() {
      console.log('app show...');
    },
    onHide() {
      console.log('app hide...');
    },
  },
});
