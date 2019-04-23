
import logger from '@utils/logger';

export default {
  namespace: 'materials',
  state: {
    inited: false,
    dataSource: [],
  },
  reducers: {
    async refresh() {
      await new Promise(resolve => setTimeout(() => {
        logger.debug('fetched materials.');
        resolve();
      }, 1000));
      return {
        dataSource: [
          {
            name: 'material 1...',
          },
          {
            name: 'material 2...',
          },
        ],
      };
    },
  },
};
