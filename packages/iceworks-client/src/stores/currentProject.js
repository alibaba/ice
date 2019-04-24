import logger from '@utils/logger';

export default {
  dataSource: {
    id: '0',
    name: 'projectA',
    pages: [
    ],
  },
  async refresh() {
    await new Promise(resolve => setTimeout(() => {
      logger.debug('fetched project!!!');
      resolve();
    }, 1000));

    this.dataSource = {
      id: '0',
      name: 'projectA',
      pages: [
        {
          id: '0',
          name: 'pageA',
        },
      ],
    };
  },
  async addPage(page) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { pages } = this.dataSource;
    this.pages = [].concat(pages).concat([{ ...page, id: pages.length }]);
  },
  async setData(project) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.dataSource = project;
  },
};
