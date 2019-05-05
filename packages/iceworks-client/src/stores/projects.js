import logger from '@utils/logger';

export default {
  dataSource: [],
  async refresh() {
    await new Promise(resolve => setTimeout(() => {
      logger.debug('fetched projects.');
      resolve();
    }, 1000));
    this.dataSource = [
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
    ];
  },
  add(project) {
    const { dataSource } = this;
    this.dataSource = [].concat(dataSource).concat([{ ...project, id: dataSource.length }]);
  },
  async remove(selectedId) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.dataSource = [].concat(this.dataSource.filter(({ id }) => id !== selectedId));
  },
};
