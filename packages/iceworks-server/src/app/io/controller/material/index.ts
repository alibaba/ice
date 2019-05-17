import request from '../../../../lib/request';
import storage from '../../../../lib/storage';

const url = 'http://ice.alicdn.com/assets/react-materials.json';

export default (app) => {
  return class MaterialController extends app.Controller {
    async resource(ctx) {
      const { args } = ctx;
      const callback = args[args.length - 1];
      const data = storage.get('material');

      callback({ data });
    }

    async current(ctx) {
      const { args } = ctx;
      const callback = args[args.length - 1];

      let data;
      let error;
      try {
        data = await request(url);
      } catch (err) {
        error;
      }

      callback({ data: formatData(data), error });
    }
  };
};

function formatData(data) {
  const { blocks = [], scaffolds = [], components = [] } = data;
  return {
    blocks: { categories: generateCates(blocks), blocks },
    scaffolds: { categories: generateCates(scaffolds), scaffolds },
    components: { categories: generateCates(components), components },
  };
}

function generateCates(data: any[]) {
  const result = [];
  const temp = {};
  for (let i = 0, l = data.length; i < l; i++) {
    const { categories = [] } = data[i];
    categories.forEach((catName) => {
      if (!(catName in temp)) {
        temp[catName] = 1;
      } else {
        temp[catName]++;
      }
    });
  }

  Object.keys(temp).forEach((name) => {
    result.push({ name, count: temp[name] });
  });

  return result;
}
