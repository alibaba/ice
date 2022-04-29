import { defineAppConfig } from 'ice';

if (process.env.ICE_CORE_ERROR_BOUNDARY) {
  console.log('__REMOVED__');
}

console.log('ICE_VERSION', process.env.ICE_VERSION);

export default defineAppConfig({
  app: {},
});
