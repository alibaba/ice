import request from '../../../../lib/request';
import storage from '../../../../lib/storage';

const url = 'http://ice.alicdn.com/assets/react-materials.json';

export default (app) => {
  return class MaterialController extends app.Controller {
    async resource() {
      return storage.get('material');
    }

    async current() {
      const data = await request(url);
      return formatData(data);
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
