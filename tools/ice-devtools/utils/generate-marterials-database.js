const fs = require('fs');
const path = require('path');
const glob = require('glob');
const mkdirp = require('mkdirp');
const chalk = require('chalk');
const BluebirdPromise = require('bluebird');
// const {} = require('../utils/validate.js');
const pkgJSON = require('../utils/pkg-json');
const {
  getUnpkgHost,
} = require('ice-npm-utils');
const { getNpmTime } = require('./npm');
const logger = require('./logger');

const DEFAULT_REGISTRY = 'http://registry.npmjs.com';


/**
 * 生成物料数据文件：
 *  - 收集所有物料路径
 *  - [批量]根据每个物料的 package.json 组装原数据
 *  - [批量]从 npm 查询包信息补全数据
 *  - 写入 build 文件夹
 */
module.exports = function generateMaterialsDatabases(
  materialName,
  materialPath,
  materialConfig,
) {
  logger.verbose('generateMaterialsDatabases start', materialName, materialPath);

  const distDir = path.resolve(process.cwd(), 'build');
  mkdirp.sync(distDir);

  return Promise.all([
    gather('blocks/*/package.json', materialPath, 'block'),
    gather('components/*/package.json', materialPath, 'component'),
    gather('scaffolds/*/package.json', materialPath, 'scaffold'),
  ])
    .then(([blocks, components, scaffolds]) => {
      logger.info('数据收集完成，开始写入文件');

      const data = {
        ...materialConfig,
        name: materialName, // 物料池名
        blocks,
        components,
        scaffolds,
      };

      const file = path.join(distDir, 'materials.json');
      fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
      console.log();
      console.log(`Created ${materialName} json at: ${chalk.yellow(file)}`);
      console.log();
    });
};

/**
 * 使用 global 获取对应目录的所有物料
 *
 * @param {*} pattern
 * @param {*} SPACE
 */
function gather(pattern, SPACE, type) {
  logger.verbose('gather start', pattern);
  return new Promise((resolve, reject) => {
    glob(
      pattern,
      {
        cwd: SPACE,
        nodir: true,
      },
      (err, files) => {
        if (err) {
          console.log('err:', err);
          reject(err);
        } else {
          logger.verbose('gather end', pattern, files.length);
          resolve(files);
        }
      }
    );
  }).then((files) => {
    return generateMaterialsData(files, SPACE, type);
  }).then((data) => {
    logger.info(`通过 npm 查询 ${type} 信息完成`);
    return data;
  });
}

/**
 * 根据 files 生成 blocks/components/scaffolds 数据
 *
 * @param {*} files
 * @param {*} SPACE
 * @param {String} type | block or react
 */
function generateMaterialsData(files, SPACE, type) {
  /**
   * 构造每个物料的数据：
   *  - 读取 package.json 数据
   *  - 区块：根据 src/index.js 分析依赖
   */
  const result = files.map((pkgPath) => {
    const pkg = JSON.parse(fs.readFileSync(path.join(SPACE, pkgPath)));

    const materialConfig = pkg[`${type}Config`] || {};
    const unpkgHost = pkgJSON.getPkgJSON(SPACE).materialConfig.unpkg || getUnpkgHost(pkg.name);

    // 兼容 snapshot 字段
    const screenshot = materialConfig.screenshot
      || materialConfig.snapshot
      || `${unpkgHost}/${pkg.name}@${pkg.version}/screenshot.png`;

    const registry =
      (pkg.publishConfig && pkg.publishConfig.registry) ||
      DEFAULT_REGISTRY;

    const payload = {
      // (必)英文名
      name: materialConfig.name,
      // (必)中文描述
      title: materialConfig.title,
      description: pkg.description,
      homepage: pkg.homepage || `${unpkgHost}/${pkg.name}@${pkg.version}/build/index.html`,
      categories: materialConfig.categories || [],
      repository: pkg.repository && pkg.repository.url,
      source: {
        type: 'npm',
        npm: pkg.name,
        version: pkg.version,
        registry,
        author: pkg.author,
      },
      // (必) 用于说明组件依赖关系
      dependencies: pkg.dependencies || {},
      // (必) 截图
      screenshot,

      // 站点模板预览需要多张截图
      screenshots: materialConfig.screenshots || [screenshot],

      // ice-scripts/create-react-app，Iceworks 里选择模板里使用，不是 ice-scripts 给出提示
      builder: materialConfig.builder,

      // 支持用户自定义的配置
      customConfig: materialConfig.customConfig || null,
    };

    if (type === 'block') {
      if (materialConfig['version-0.x']) {
        // 仅官方 react 物料会走到这个逻辑，Iceworks 端会区分
        payload.source['version-0.x'] = pkg.version;
        payload.source.version = materialConfig['version-0.x'] || pkg.version;
      }

      payload.source.sourceCodeDirectory = 'src/';
    }

    return payload;
  });

  // 并行从 npm 查询包信息并补全数据
  // 实际并行数是 concurrency * 3（block+component+scaffold）
  const concurrency = 20;
  logger.info(`通过 npm 查询 ${type} 信息开始，个数：${result.length}，并行个数：${concurrency}`);

  // 根据 npm 信息补全物料数据：publishTime, updateTime
  return BluebirdPromise.map(result, (materialItem) => {
    const npmName = materialItem.source.npm;
    const version = materialItem.source.version;
    return getNpmTime(npmName, version).then((time) => {
      materialItem.publishTime = time.created;
      materialItem.updateTime = time.modified;
      return materialItem;
    });
  }, {
    concurrency,
  });
}
