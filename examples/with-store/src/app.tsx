import { defineAppConfig, defineDataLoader } from 'ice';
import { defineStoreConfig } from '@ice/plugin-store/esm/types';

export const storeConfig = defineStoreConfig(async (appData) => {
  return {
    initialStates: {
      ...appData,
    },
  };
});

export const dataLoader = defineDataLoader(() => {
  return new Promise((resolve) => {
    resolve({
      user: {
        name: 'icejs',
      },
    });
  });
});

export default defineAppConfig(() => ({}));
