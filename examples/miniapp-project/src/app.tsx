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
    'second',
    'third/index',
    'fourth',
  ],
};

export const miniappLifecycles = defineMiniappConfig(() => {
  return {
    onLaunch(options) {
      console.log('[App] on launch', options);
    },
    onShow(options) {
      console.log('[App] on show', options);
    },
    onShareAppMessage(options) {
      // Only works in ali miniapp
      console.log('[App] onShareAppMessage', options);
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
      errorBoundary: true,
    },
  };
});
