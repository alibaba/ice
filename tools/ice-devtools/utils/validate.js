const Joi = require('@hapi/joi');
const getCategories = require('../config/material').getCategories;

const categories = getCategories();
const createSchema = ((fn) => fn(Joi));

const validate = (obj, schema) => {
  return new Promise((resolve, reject) => {
    const result = Joi.validate(obj, schema);

    if (result.error) {
      reject(result.error);
    }
    resolve(true);
  });
};

const authorSchema = createSchema((joi) => [joi.string().allow(''), joi.object().keys({
  name: joi.string(),
  email: joi.string().email(),
}).unknown()]);

const componentSchema = createSchema((joi) => joi.object().keys({
  name: joi.string().required(), // （必选）名称
  title: joi.string().required(),
  description: joi.string().required(), // （必选）描述
  homepage: joi.string().uri().required(), // （必选）预览地址
  categories: joi.array().items(joi.string().only([...categories.component])), // （必选）分类
  category: joi.string().only([...categories.component]), // （必选）分类
  repository: joi.string().uri(), // （可选）源码地址
  source: joi.object().keys({ // （必选）描述安装方式
    type: joi.string().only(['npm']), // （必选）安装方式 npm
    npm: joi.string().required(), // （必选）npm package name
    version: joi.string().required(), // （必选）版本号
    registry: joi.string().uri().required(), // （必选）npm 源
    author: authorSchema, // （可选）作者信息
  }),
  dependencies: joi.object().required(), // （必选）依赖关系
  publishTime: joi.string().isoDate().required(), // （必选）发布时间
  updateTime: joi.string().isoDate().required(), // （必选）最后更新时间
}).unknown());

const blockSchema = createSchema((joi) => joi.object().keys({
  name: joi.string().required(), // （必选）名称
  title: joi.string().required(),
  description: joi.string().required(), // （必选）描述
  homepage: joi.string().uri().required(), // （必选）预览地址
  categories: joi.array().items(joi.string().only([...categories.block])), // （必选）分类
  category: joi.string().only([...categories.block]), // （必选）分类
  repository: joi.string().uri().required(), // （必选）源码地址
  source: joi.object().keys({ // （必选）描述安装方式
    type: joi.string().only(['npm']), // （必选）安装方式 npm
    npm: joi.string().required(), // （必选）npm package name
    version: joi.string().required(), // （必选）版本号
    registry: joi.string().uri().required(), // （必选）npm 源
    sourceCodeDirectory: joi.string().uri({ relativeOnly: true }).required(),
    author: authorSchema, // （可选）作者信息
  }),
  screenshot: joi.string().uri().required(), // （必选）截图
  screenshots: joi.array().items(joi.string().uri()), // （可选）多张截图
  dependencies: joi.object().required(), // （必选）依赖关系
  publishTime: joi.string().isoDate().required(), // （必选）发布时间
  updateTime: joi.string().isoDate().required(), // （必选）最后更新时间
}).unknown());

const scaffoldSchema = createSchema((joi) => joi.object().keys({
  name: joi.string().required(), // （必选）名称
  title: joi.string().required(),
  description: joi.string().required(), // （必选）描述
  homepage: joi.string().uri().required(), // （必选）预览地址
  // categories: joi.array().items(joi.string().only([...componentCaterories])), // （必选）分类
  repository: joi.string().uri().required(), // （必选）源码地址
  source: joi.object().keys({ // （必选）描述安装方式
    type: joi.string().only(['npm']), // （必选）安装方式 npm
    npm: joi.string().required(), // （必选）npm package name
    version: joi.string().required(), // （必选）版本号
    registry: joi.string().uri().required(), // （必选）npm 源
    author: authorSchema, // （可选）作者信息
  }),
  screenshot: joi.string().uri().required(), // （必选）截图
  screenshots: joi.array().items(joi.string().uri()).required(), // （必选）站点模板预览需要多张截图
  builder: joi.string().required(), // （必选）模板构建方式
  dependencies: joi.object().required(), // （必选）依赖关系
  publishTime: joi.string().isoDate().required(), // （必选）发布时间
  updateTime: joi.string().isoDate().required(), // （必选）最后更新时间
}).unknown());

const materialSchema = createSchema((joi) => joi.object().keys({
  type: joi.string().required(),
  name: joi.string().required(),
  description: joi.string(),
  logo: joi.string().uri(),
  homepage: joi.string().uri(),
  author: authorSchema,
  components: joi.array().items(componentSchema).required(),
  blocks: joi.array().items(blockSchema).required(),
  scaffolds: joi.array().items(scaffoldSchema).required(),
}).unknown());

const validateMaterial = (obj) => validate(obj, materialSchema);
const validateComponent = (obj) => validate(obj, componentSchema);
const validateBlock = (obj) => validate(obj, blockSchema);
const validateScaffold = (obj) => validate(obj, scaffoldSchema);

module.exports = {
  validateMaterial,
  validateComponent,
  validateBlock,
  validateScaffold,
};
