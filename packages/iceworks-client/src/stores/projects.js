import appConfig from '@src/appConfig';

export default {
  dataSource: [],
  async refresh() {
    const response = await fetch(`${appConfig.apiUrl}project`);
    const json = await response.json();
    this.dataSource = json.data;
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
