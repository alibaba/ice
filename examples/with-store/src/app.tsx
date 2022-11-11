import type { GetAppData } from 'ice';
import { defineAppConfig } from 'ice';
import { defineStoreConfig } from '@ice/plugin-store/esm/types';

export const store = defineStoreConfig(async (appData) => {
  return {
    initialStates: {
      ...appData,
    },
  };
});

export const getAppData: GetAppData = () => {
  return new Promise((resolve) => {
    resolve({
      user: {
        name: 'icejs',
      },
    });
  });
};

export default defineAppConfig(() => ({}));
