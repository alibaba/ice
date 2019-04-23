import logger from '@utils/logger';

export default {
  namespace: 'projects',
  state: {
    inited: false,
    dataSource: [],
    current: {},
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
        current: {
          id: '0',
          name: 'projectA',
        },
        dataSource: [
          {
            id: '0',
            name: 'projectA',
          },
          {
            id: '1',
            name: 'projectB',
          },
          {
            id: '2',
            name: 'projectC',
          },
        ],
      };
    },
    async add(project) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const { dataSource } = this.state;
      return {
        dataSource: [].concat(dataSource).concat([{ ...project, id: dataSource.length }]),
      };
    },
    async remove(selectedId) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        dataSource: [].concat(this.state.dataSource.filter(({ id }) => id !== selectedId)),
      };
    },
    async setCurrent(currentId) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      return {
        ...this.state,
        current: this.state.dataSource.filter(({ id }) => id === currentId)[0],
      };
    },
  },
};
