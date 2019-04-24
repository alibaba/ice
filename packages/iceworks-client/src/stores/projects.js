import logger from '@utils/logger';

export default {
  dataSource: [],
  async refresh() {
    const response = await fetch('http://localhost:7001/api/project');
    const data = await response.json();
    this.dataSource = data.projects;
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