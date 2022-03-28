import { defineAppConfig } from 'ice';

if (process.env.ICE_RUNTIME_ERROR_BOUNDARY) {
  console.log('__REMOVED__');
}

export default defineAppConfig({
  app: {
    // @ts-expect-error loss tslib dependency
    getInitialData: async (ctx) => {
      return {
        auth: {
          admin: true,
        },
      };
    },
  },
});
