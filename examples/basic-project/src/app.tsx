import { defineAppConfig } from 'ice';

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
