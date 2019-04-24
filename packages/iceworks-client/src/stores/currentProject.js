import logger from '@utils/logger';

export default {
  dataSource: {
    id: '0',
    name: '',
    pages: [
    ],
  },
  async refresh() {
    const response = await fetch('http://localhost:7001/api/project/current');
    const data = await response.json();
    this.dataSource = data.project;
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
