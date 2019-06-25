const componentCaterories = require('../lib/component/meta').categories;
const blockCaterories = require('../lib/block/meta').categories;

const createSchema = ((fn) => fn(require('@hapi/joi')));

const validate = (obj, schema) => {
  return new Promise((resolve, reject) => {
    const result = require('@hapi/joi').validate(obj, schema);

    if (result.error) {
      reject(result.error);
    }
    resolve(obj);
  });
};

const componentSchema = createSchema((joi) => joi.object().keys({
  name: joi.string().required(), // （必选）名称
  title: joi.string().required(),
  description: joi.string().required(), // （必选）描述
  homepage: joi.string().uri().required(), // （必选）预览地址
  categories: joi.array().items(joi.string().only([...componentCaterories])), // （必选）分类
  repository: joi.string().uri(), // （可选）源码地址
  source: joi.object().keys({ // （必选）描述安装方式
    type: joi.string().only(['npm']), // （必选）安装方式 npm
    npm: joi.string().required(), // （必选）npm package name
    version: joi.string().required(), // （必选）版本号
    registry: joi.string().uri().required(), // （必选）npm 源
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
  categories: joi.array().items(joi.string().only([...blockCaterories])), // （必选）分类
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
  author: joi.object(),
  components: joi.array().items(componentSchema).required(),
  blocks: joi.array().items(blockSchema).required(),
  scaffolds: joi.array().items(scaffoldSchema).required(),
}));

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
