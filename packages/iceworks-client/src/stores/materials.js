
import logger from '@utils/logger';

export default {
  dataSource: [],
  async refresh() {
    await new Promise(resolve => setTimeout(() => {
      logger.debug('fetched materials 1.');
      resolve();
    }, 500));
    await new Promise(resolve => setTimeout(() => {
      logger.debug('fetched materials 2.');
      resolve();
    }, 500));
    this.dataSource = [
      {
        name: 'material 1...',
      },
      {
        name: 'material 2...',
      },
    ];
  },
};
