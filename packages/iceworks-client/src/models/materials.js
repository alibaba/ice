
import logger from '@utils/logger';

export default {
  namespace: 'materials',
  state: {
    inited: false,
    dataSource: [],
  },
  reducers: {
    async init() {
      if (this.state.inited) {
        return {};
      }
      await new Promise(resolve => setTimeout(() => {
        logger.debug('fetched materials.');
        resolve();
      }, 1000));
      return {
        inited: true,
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
