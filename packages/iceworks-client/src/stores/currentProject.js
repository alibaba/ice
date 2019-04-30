import appConfig from '@src/appConfig';
import Cookies from 'cookies-js';

export default {
  dataSource: {
    id: '0',
    name: '',
    pages: [
    ],
  },
  async refresh() {
    const response = await fetch(`${appConfig.apiUrl}project/current`);
    const data = await response.json();
    this.dataSource = data.project;
  },
  async addPage(page) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { pages } = this.dataSource;
    this.pages = [].concat(pages).concat([{ ...page, id: pages.length }]);
  },
  async reset(folderPath) {
    const response = await fetch(`${appConfig.apiUrl}project/current`, {
      method: 'POST',
      body: JSON.stringify({ folderPath }),
      headers: {
        'content-type': 'application/json',
        'x-csrf-token': Cookies.get('csrfToken'),
      },
    });
    const data = await response.json();
    this.dataSource = data.project;
  },
};
