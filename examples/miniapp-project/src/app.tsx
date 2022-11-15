import { defineAppConfig, defineDataLoader } from 'ice';

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
  ],
};

export default defineAppConfig(() => {
  return {
    app: {
      strict: true,
      errorBoundary: true,
    },
  };
});
