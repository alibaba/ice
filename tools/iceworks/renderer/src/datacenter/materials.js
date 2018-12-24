// 物料管理中心
// 负责加载所有物料，以及区块等

import uppercamelcase from 'uppercamelcase';
import services from '../services';
import filterMaterial from '../lib/filter-material';
import requestMaterial from '../lib/request-material';

const { settings } = services;

// 请求所有物料源数据
function fetchMaterialsData() {
  let materials = settings.get('materials'); // 获取物料接口
  materials = filterMaterial(materials);
  return new Promise((resolve) => {
    const requestPromise = materials.map((material) => {
      return requestMaterial(material.source, true);
    });

    const materialDatas = materials.map((m) => {
      return {
        name: m.name,
        source: m.source,
        body: {},
      };
    });

    Promise.all(requestPromise).then((requestResult) => {
      requestResult.forEach( (res, index) => {
        materialDatas[index].body = res || {};
      })
      resolve(materialDatas);
    });
  });
}

// 获取所有物料模板
const getScaffolds = () => {
  return fetchMaterialsData().then((materialDatas) => {
    return materialDatas.map((materials) => {
      return {
        name: materials.name,
        source: materials.source,
        data: materials.body.scaffolds,
      };
    });
  });
};

/**
 * 获取所有物料中可用的 layouts
 * @param {stirng} type 物料的类型，根据项目类型获取对应源的物料
 */

const getBlocks = (type = '') => {
  return fetchMaterialsData().then((materialDatas) => {
    if (type) {
      materialDatas = materialDatas.filter((materials) => {
        return materials.body.type == type;
      });
    }
    return materialDatas.map((materials) => {
      return {
        name: materials.name,
        source: materials.source,
        data: materials.body.blocks,
      };
    });
  });
};

/**
 * 获取所有物料中可用的 layouts
 * @param {stirng} type 物料的类型，根据项目类型获取对应源的物料
 */
const getLayouts = (type = '') => {
  return fetchMaterialsData().then((materialDatas) => {
    if (type) {
      materialDatas = materialDatas.filter((materials) => {
        return materials.body.type == type;
      });
    }
    return materialDatas.map((materials) => {
      return {
        name: materials.name,
        source: materials.source,
        data: materials.body.layouts,
      };
    });
  });
};

// 区块分类逻辑
const getCategoriesByBlocks = (blocks) => {
  const categoryMap = {
    table: '表格',
    form: '表单',
    chart: '图表',
    list: '列表',
    modal: '模态框',
    filter: '筛选',
    'data-display': '数据展示',
    'info-display': '信息展示',
    exception: '异常',
    layout: '布局',
  };

  const uniqueCategories = {};
  blocks.forEach((block) => {
    if (block.categories) {
      block.categories.forEach((originalCategoryName) => {
        const categoryName =
          categoryMap[originalCategoryName] || originalCategoryName;

        uniqueCategories[categoryName] = {
          name: originalCategoryName,
          className: uppercamelcase(originalCategoryName),
          description: categoryName,
        };
      });
    }
  });
  return Object.values(uniqueCategories);
};

export { getScaffolds, getBlocks, getLayouts, getCategoriesByBlocks };
