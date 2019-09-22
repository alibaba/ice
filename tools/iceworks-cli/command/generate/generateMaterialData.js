const path = require('path');
const fse = require('fs-extra');
const chalk = require('chalk');
const { getUnpkgHost, isAliNpm } = require('ice-npm-utils');
const request = require('request-promise-native');
const log = require('../../lib/log');

module.exports = async function generateMaterialData(pkgPath, materialType) {
  const pkg = await fse.readJson(pkgPath);

  const materialConfig = pkg[`${materialType}Config`] || {};
  const { name: npmName, version } = pkg;
  const unpkgHost = getUnpkgHost(npmName);
  const registry = getRegistry(npmName, pkg);

  // 检查包是否发布并补全时间
  log.verbose('getNpmPublishTime start', npmName, version, registry);
  const { created: publishTime, modified: updateTime } = await getNpmPublishTime(npmName, version, registry);
  log.verbose('getNpmPublishTime success', npmName, version);

  const screenshot = materialConfig.screenshot
    || materialConfig.snapshot
    || (hasScreenshot(path.dirname(pkgPath)) ? `${unpkgHost}/${npmName}@${pkg.version}/screenshot.png` : '');
  const screenshots = materialConfig.screenshots || (screenshot && [screenshot]);
  const homepage = pkg.homepage || `${unpkgHost}/${npmName}@${pkg.version}/build/index.html`;

  const {categories: originCategories, category: originCategory} = materialConfig;
  // categories 字段：即将废弃，但是展示端还依赖该字段，因此短期内不能删除，同时需要兼容新的物料无 categories 字段
  const categories = originCategories || (originCategory ? [originCategory] : []);
  // category 字段：兼容老的物料无 category 字段
  const category = originCategory || ((originCategories && originCategories[0]) ? originCategories[0] : '');

  const materialData = {
    // 允许（但不推荐）自定义单个物料的数据
    ...materialConfig,
    name: materialConfig.name,
    title: materialConfig.title,
    description: materialConfig.description,
    homepage,
    categories,
    category,
    repository: (pkg.repository && pkg.repository.url) || pkg.repository,
    source: {
      type: 'npm',
      npm: npmName,
      version: pkg.version,
      registry,
      author: pkg.author,
    },
    dependencies: pkg.dependencies || {},
    screenshot,
    screenshots,
    publishTime,
    updateTime,
  };

  if (materialConfig === 'block') {
    // iceworks 2.x 依赖该字段，下个版本删除
    materialData.source.sourceCodeDirectory = 'src/';
  }

  return { materialData, materialType };
}

function hasScreenshot(cwd) {
  return fse.existsSync(path.join(cwd, 'screenshot.png'));
}

/**
 * 生成物料数据里的 source.registry 字段；检查物料发布 npm 的信息
 *
 * 这里不使用 ice-npm-utils 里的 getNpmRegistry 原因：
 * 发布到私有 npm，走 env 自定义逻辑
 * 发布到官方 npm，需要走官方源的逻辑，getNpmRegistry 默认是淘宝源，同步官方源有延迟，因此不能用
 */
function getRegistry(npm, pkg) {
  let registry = 'https://registry.npmjs.org';
  if (pkg.publishConfig && pkg.publishConfig.registry) {
    registry = pkg.publishConfig.registry;
  } else if (process.env.REGISTRY) {
    registry = process.env.REGISTRY;
  } else if (isAliNpm(npm)) {
    registry = 'https://registry.npm.alibaba-inc.com';
  }
  return registry;
}

/**
 * 检测 NPM 包是否已发送，并返回包的发布时间
 *
 * @param  {string} npm      package name
 * @param  {String} version  pacage version
 * @return {array} [code, resute]
 */
function getNpmPublishTime(npm, version = 'latest', registry) {
  const url = `${registry}/${npm}`;
  return request.get(url)
    .then((response) => {
      const data = JSON.parse(response);
      if (!data.time) {
        console.error(chalk.red('time 字段不存在'));
        return Promise.reject(new Error(`${npm}@${version} time 字段不存在`));
      }
      // 传进来的可能是 latest 这种非 数字型的 版本号
      const distTags = data['dist-tags'];
      version = distTags[version] || version;
      const { versions } = data;
      if (!versions || versions[version] === undefined) {
        return Promise.reject(new Error(`${npm}@${version} 未发布! 禁止提交!`));
      }
      return data.time;
    })
    .catch((err) => {
      if (
        (err.response && err.response.status === 404)
        || err.message === 'Not found' // tnpm
        || /not found/i.test(err.message) // tnpm
        || err.message === 'not_found' // npm
      ) {
        // 这种情况是该 npm 包名一次都没有发布过
        return Promise.reject(new Error(`[ERR checkAndQueryNpmTime] ${npm}@${version} hasn't been published! please publish npm first!`));
      }

      return Promise.reject(err);
    });
}
