const componentCaterories = require('../lib/component/meta').categories;
const blockCaterories = require('../lib/block/meta').categories;

const createSchema = ((fn) => fn(require('@hapi/joi')));

const validate = (obj, schema) => {
  return new Promise((resolve, reject) => {
    const result = require('@hapi/joi').validate(obj, schema);

    if (result.error) {
      reject(result.reject);
    }
    resolve(obj);
  });
};

const materialSchema = createSchema((joi) => joi.object().keys({
  type: joi.string().required(),
  name: joi.string().required(),
  description: joi.string(),
  logo: joi.string().uri(),
  homepage: joi.string().uri(),
  author: joi.object(),
}));

const componentSchema = createSchema((joi) => joi.object().keys({
  name: joi.string().required(), // （必选）名称
  title: joi.string().required(),
  description: joi.string().required(), // （必选）描述
  homepage: joi.string().uri().required(), // （必选）预览地址
  categories: joi.string().only([...componentCaterories]), // （必选）分类
  repository: joi.string().uri().required(), // （必选）源码地址
  source: joi.object().keys({ // （必选）描述安装方式
    type: joi.string().only(['npm']), // （必选）安装方式 npm
    npm: joi.string().required(), // （必选）npm package name
    version: joi.string().required(), // （必选）版本号
    registry: joi.string().uri().required(), // （必选）npm 源
  }),
  dependencies: joi.object().required(), // （必选）依赖关系
  publishTime: joi.string().isoDate().required(), // （必选）发布时间
  updateTime: joi.string().isoDate().required(), // （必选）最后更新时间
}));

const blockSchema = createSchema((joi) => joi.object().keys({
  name: joi.string().required(), // （必选）名称
  title: joi.string().required(),
  description: joi.string().required(), // （必选）描述
  homepage: joi.string().uri().required(), // （必选）预览地址
  categories: joi.string().only([...blockCaterories]), // （必选）分类
  repository: joi.string().uri().required(), // （必选）源码地址
  source: joi.object().keys({ // （必选）描述安装方式
    type: joi.string().only(['npm']), // （必选）安装方式 npm
    npm: joi.string().required(), // （必选）npm package name
    version: joi.string().required(), // （必选）版本号
    registry: joi.string().uri().required(), // （必选）npm 源
    sourceCodeDirectory: joi.string().uri({ relativeOnly: true }).required(),
  }),
  screenshot: joi.string().uri().required(), // （必选）截图
  screenshots: joi.array().items(joi.string().uri()), // （可选）多张截图
  features: joi.object().keys({ // （可选）区块使用的功能
    useComponents: joi.array(), // （可选）区块使用到的组件
  }),
  dependencies: joi.object().required(), // （必选）依赖关系
  publishTime: joi.string().isoDate().required(), // （必选）发布时间
  updateTime: joi.string().isoDate().required(), // （必选）最后更新时间
}));

const scaffoldSchema = createSchema((joi) => joi.object().keys({
  name: joi.string().required(), // （必选）名称
  title: joi.string().required(),
  description: joi.string().required(), // （必选）描述
  homepage: joi.string().uri().required(), // （必选）预览地址
  // categories: joi.string().only([...componentCaterories]), // （必选）分类
  repository: joi.string().uri().required(), // （必选）源码地址
  source: joi.object().keys({ // （必选）描述安装方式
    type: joi.string().only(['npm']), // （必选）安装方式 npm
    npm: joi.string().required(), // （必选）npm package name
    version: joi.string().required(), // （必选）版本号
    registry: joi.string().uri().required(), // （必选）npm 源
    sourceCodeDirectory: joi.string().uri({ relativeOnly: true }).required(),
  }),
  screenshot: joi.string().uri().required(), // （必选）截图
  screenshots: joi.array().items(joi.string().uri()).required(), // （必选）多张截图
  builder: joi.string().required(), // （必选）构建方式
  dependencies: joi.object().required(), // （必选）依赖关系
  publishTime: joi.string().isoDate().required(), // （必选）发布时间
  updateTime: joi.string().isoDate().required(), // （必选）最后更新时间
}));

module.exports = {
  createSchema,
  validate,
  materialSchema,
  componentSchema,
  blockSchema,
};
