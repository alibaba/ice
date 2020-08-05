import { runApp } from 'ice';

runApp({
  app: {
    todos: [1, 2, 3],
    onShow() {
      console.log('app show...');
    },
    onHide() {
      console.log('app hide...');
    }
  }
});
