import { defineAppConfig } from 'ice';
import { defineChildConfig } from '@ice/plugin-icestark/esm/types';

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

export default defineAppConfig(() => ({
  app: {
    rootId: 'app',
  },
}));