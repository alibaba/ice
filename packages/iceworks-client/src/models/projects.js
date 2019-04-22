import logger from '@utils/logger';

export default {
  namespace: 'projects',
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
        logger.debug('fetched projects.');
        resolve();
      }, 1000));
      return {
        inited: true,
        dataSource: [
          {
            name: 'project 1',
          },
          {
            name: 'project 2',
          },
        ],
      };
    },
    async add(project) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        dataSource: [].concat(this.state.dataSource).concat([project]),
      };
    },
  },
};
