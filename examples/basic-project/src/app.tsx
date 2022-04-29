import { defineAppConfig } from 'ice';

if (process.env.ICE_CORE_ERROR_BOUNDARY === 'true') {
  console.error('__REMOVED__');
}

console.log('__LOG__');
console.warn('__WARN__');
console.error('__ERROR__');
console.log('process.env.HAHA', process.env.HAHA);

export default defineAppConfig({
  app: {
    // @ts-expect-error loss tslib dependency
    getData: async (ctx) => {
      return {
        title: 'gogogo',
        auth: {
          admin: true,
        },
      };
    },
  },
});
