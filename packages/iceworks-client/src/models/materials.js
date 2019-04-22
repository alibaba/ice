import { createModel } from '@store';

export default createModel('materials', {
  state: {
    dataSource: [],
  },
  reducers: {
    async init() {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        dataSource: [
          {
            name: 'material 1...',
          },
          {
            name: 'material 2...',
          },
        ],
      };
    },
  },
});
