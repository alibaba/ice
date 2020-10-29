import { createElement } from 'rax';
import { runApp } from 'rax-app';

runApp({
  app: {
    // 生命周期
    onShow() {
      console.log('app show...');
    },
    onHide() {
      console.log('app hide...');
    },
    onLaunch() {
      console.log('app launch...');
    }
  }
});
