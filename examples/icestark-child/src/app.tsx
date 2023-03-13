import { defineAppConfig } from 'ice';
import { defineChildConfig } from '@ice/plugin-icestark/types';

export const icestark = defineChildConfig(() => {
  return {
    mount: () => {
      console.log('mount');
    },
    unmount: () => {
      console.log('unmount');
    },
  };
});

let basename = '/';

if (typeof window !== 'undefined') {
  if (window.ICESTARK?.basename) {
    basename = window.ICESTARK.basename;
  } else if (window.__POWERED_BY_QIANKUN__) {
    basename = '/child';
  }
}

export default defineAppConfig(() => ({
  app: {
    rootId: 'app',
  },
  router: {
    basename,
  },
}));
