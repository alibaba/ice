import * as rp from 'request-promise-native';
import storage from '../../../../lib/storage';

const isArray = Array.isArray;

export default (app) => {
  return class MaterialController extends app.Controller {
    async resource() {
      return storage.get('material');
    }

    async getOne(ctx) {
      const { args, logger } = ctx;

      logger.info(`get material by url, url: ${args.url}`);

      try {
        const data = await request(args.url);
        return formatData(data);
      } catch (error) {
        logger.error('request error', error);
        return {}
      }
    }
  };
};

function formatData(data) {
  const { blocks = [], scaffolds = [], components = [] } = data;
  return {
    blocks: { categories: generateCates(blocks), materials: formatMaterialsByCatrgory(blocks) },
    scaffolds: { categories: generateCates(scaffolds), materials: formatMaterialsByCatrgory(scaffolds) },
    components: { categories: generateCates(components), materials: formatMaterialsByCatrgory(components) },
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

function formatMaterialsByCatrgory(data: any[]) {
  const materials = { "all": [] };

  if (isArray(data)) {
    data.forEach((item) => {
      const { categories } = item;

      materials["all"].push(item);
      if (isArray(categories) && categories.length) {
        categories.forEach((category) => {
          if (isArray(materials[category])) {
            materials[category].push(item);
          } else {
            materials[category] = [item];
          }
        });
      }
    });
  }

  return materials;
};

// http request function
const request = async (uri: string, options = {}) => {
  options = Object.assign(
    {},
    {
      uri,
      json: true,
      rejectUnauthorized: false,
      headers: {
        'Cache-Control': 'no-cache',
      },
      timeout: 5000,
    },
    options
  );

  return await rp(options);
};
