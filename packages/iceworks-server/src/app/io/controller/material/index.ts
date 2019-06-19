import * as rp from 'request-promise-native';
import storage from '../../../../lib/storage';

const isArray = Array.isArray;

const RECOMMEND_SCAFFOLDS = [
  'ice-design-pro',
  'ice-design-lite',
];

export default (app) => {
  return class MaterialController extends app.Controller {
    async resource() {
      return storage.get('material');
    }

    async getOne(ctx) {
      const { args: { url }, logger } = ctx;

      logger.info(`get material by url, url: ${url}`);
      const data = await request(url);

      // update material metadata.
      const allMaterials = storage.get('material');
      let currentIdx = -1;
      const currentItem = allMaterials.find((item, idx) => {
        if (item.source === url) {
          currentIdx = idx;
          return true;
        }
        return false;
      });

      const {
        description = currentItem.description,
        homepage = currentItem.homepage,
        logo = currentItem.logo,
      } = data;

      const newMaterialData = {
        ...currentItem,
        description,
        homepage,
        logo,
      };
      // if the material has existed, update metadata
      if (currentIdx > -1) {
        const newMaterials = updateArrayItem(
          allMaterials,
          newMaterialData,
          currentIdx
        );
        storage.set('material', newMaterials);
      }

      return {...formatMaterialData(data), name: currentItem.name };
    }

    async getRecommendScaffolds() {
      const material = storage.get('material')[0];
      const { scaffolds = [] } = await request(material.source);
      return scaffolds.filter(({ name }) => RECOMMEND_SCAFFOLDS.includes(name));
    }

    async add(ctx) {
      const { args: { url, name }, logger } = ctx;
      const allMaterials = storage.get('material');
      const existed = allMaterials.some(m => m.source === url);

      if (existed) {
        logger.info(`current material has existed, source URL: ${url}`);
        throw Error('current material has existed.');
      }

      const data = await request(url);
      const {
        description = '',
        homepage = '',
        logo = '',
        source = url,
      } = data;

      // material's name is required
      if (!name) {
        logger.info(`material's name is required, source URL: ${url}`);
        throw Error('material\'s name is required.');
      }

      const material = storage.get('material');
      const currentItem = {
        official: false, name, description, homepage, logo, source
      };
      const newMaterials = material.filter((item) => item.name !== currentItem.name);
      newMaterials.unshift(currentItem);
      storage.set('material', newMaterials);

      const materialData = formatMaterialData(data);

      return { resource: storage.get('material'), current: { ...materialData, name } };
    }

    async delete(ctx) {
      const { args: { url }, logger } = ctx;
      logger.info(`delete material, source URL: ${url}`);

      const material = storage.get('material');
      const newMaterials = material.filter(item => item.source !== url);

      storage.set('material', newMaterials);

      return storage.get('material');
    }
  };
};

function formatMaterialData(data) {
  const { blocks = [], scaffolds = [], components = [], ...other } = data;
  return {
    ...other,
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
  const materials = { all: [] };

  if (isArray(data)) {
    data.forEach((item) => {
      const { categories } = item;

      materials['all'].push(item);
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
}

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

const updateArrayItem = (array, item, itemIdx) => {
  return [
    ...array.slice(0, itemIdx),
    item,
    ...array.slice(itemIdx + 1)
  ];
};
