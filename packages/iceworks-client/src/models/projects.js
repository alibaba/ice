import { createModel } from '@store';

export default createModel('projects', {
  state: {
    dataSource: [],
  },
  reducers: {
    async init() {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
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
});
