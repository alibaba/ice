import { defineAppConfig } from 'ice';

if (process.env.ICE_CORE_ERROR_BOUNDARY) {
  console.error('__REMOVED__');
}

console.log('__LOG__');
console.warn('__WARN__');
console.error('__ERROR__');

export default defineAppConfig({
  app: {
    // @ts-expect-error loss tslib dependency
    getData: async () => {
      return {
        title: 'gogogo',
        auth: {
          admin: true,
        },
      };
    },
  },
});
