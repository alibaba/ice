import { defineDataLoader } from 'ice';

export default {
  app: {
    rootId: 'app',
  },
};

export const dataLoader = defineDataLoader(async () => {
  return {
    id: 123,
  };
});
