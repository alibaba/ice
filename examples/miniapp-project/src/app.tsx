import { defineAppConfig, defineDataLoader } from 'ice';
import { defineMiniappConfig } from '@ice/plugin-miniapp/runtime';

export const dataLoader = defineDataLoader(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        id: 34293,
      });
    }, 1000);
  });
});

export const miniappManifest = {
  window: {
    defaultTitle: 'miniapp test',
  },
  routes: [
    'index',
    'about',
    'second/profile',
    'third/index',
    'third/test',
    'classComponent',
  ],
};

export const miniappLifecycles = defineMiniappConfig(() => {
  return {
    onLaunch(options) {
      console.log('on launch', options);
    },
    onShow(options) {
      console.log('on show', options);
    },
    onShareAppMessage(options) {
      console.log('onShareAppMessage', options);
      return {
        title: 'test',
        path: 'pages/index',
        desc: '呵呵',
      };
    },
  };
});

export default defineAppConfig(() => {
  return {
    app: {
      strict: true,
      errorBoundary: true,
    },
  };
});
