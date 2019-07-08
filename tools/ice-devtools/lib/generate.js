const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const mkdirp = require('mkdirp');
const BluebirdPromise = require('bluebird');
const getUnpkgHost = require('ice-npm-utils').getUnpkgHost;

const generateI18nData = require('../utils/i18n');
const validate = require('../utils/validate');
const getNpmTime = require('../utils/npm').getNpmTime;
const getPkgJSON = require('../utils/pkg-json').getPkgJSON;
const logger = require('../utils/logger');
const message = require('../utils/message');

const DEFAULT_REGISTRY = 'http://registry.npmjs.com';

module.exports = async function generate(cwd) {
  try {
    const pkgJson = getPkgJSON(cwd);
    const { materialConfig } = pkgJson;

    // 全局的 materialConfig，字段会生成在全局 json 上，仅用于标识物料源根目录以及自定义全局字段
    if (!materialConfig) {
      throw new Error(message.invalid);
    }
    await generateMaterialsDatabases(pkgJson, cwd);
  } catch (err) {
    console.log(chalk.red('Generate fail!'));
    logger.fatal(err);
  }
};

/**
 * 生成物料数据文件：
 *  - 收集所有物料路径
 *  - [批量]根据每个物料的 package.json 组装原数据
 *  - [批量]从 npm 查询包信息补全数据
 *  - 写入 build 文件夹
 */
async function generateMaterialsDatabases(pkgJson, materialPath) {
  logger.verbose('generateMaterialsDatabases start', pkgJson.name, materialPath);

  const distDir = path.resolve(process.cwd(), 'build');
  const materialConfig = pkgJson.materialConfig;
  mkdirp.sync(distDir);

  const [blocks, components, scaffolds] = await Promise.all([
    gather('blocks/*/package.json', materialPath, 'block', materialConfig),
    gather('components/*/package.json', materialPath, 'component', materialConfig),
    gather('scaffolds/*/package.json', materialPath, 'scaffold', materialConfig),
  ]);

  const i18nData = generateI18nData({ description: pkgJson.description });

  logger.info('Start validating material data.');

  // validate material data
  const data = await validate.validateMaterial({
    ...materialConfig,
    ...i18nData,
    name: pkgJson.name,
    description: i18nData.zh_CN.description || i18nData.en_US.description,
    homepage: pkgJson.homepage,
    author: pkgJson.author,
    blocks,
    components,
    scaffolds,
  });

  logger.info('Verification passed. Start writing materials.json.');

  const file = path.join(distDir, 'materials.json');
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);

  console.log();
  console.log(chalk.cyan('Success! materials db generated'));
  logger.success(`Created ${pkgJson.name} json at: ${chalk.yellow(file)}`);
  console.log();
}

/**
 * get all materials through global pattern
 *
 * @param {*} pattern path pattern
 * @param {*} targetDir target directory
 * @param {Object} options generate options
 */
function gather(pattern, targetDir, type, options) {
  logger.verbose('gather start', pattern);
  return new Promise((resolve, reject) => {
    glob(
      pattern,
      {
        cwd: targetDir,
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
    return generateMaterialsData(files, targetDir, type, options);
  }).then((data) => {
    logger.info(`通过 npm 查询 ${type} 信息完成`);
    return data;
  });
}

/**
 * 根据 files 生成 blocks/components/scaffolds 数据
 *
 * @param {*} files
 * @param {*} targetDir target directory
 * @param {String} type block or react
 * @param {Object} options material options
 */
function generateMaterialsData(files, targetDir, type, options) {
  /**
   * 构造每个物料的数据：
   *  - 读取 package.json 数据
   *  - 区块：根据 src/index.js 分析依赖
   */
  const result = files.map((pkgPath) => {
    const pkg = JSON.parse(fs.readFileSync(path.join(targetDir, pkgPath)));

    const materialConfig = pkg[`${type}Config`] || {};
    const unpkgHost = options.unpkg || getUnpkgHost(pkg.name);
    const materialType = options.type;

    // 兼容 snapshot 字段
    const screenshot = materialConfig.screenshot
      || materialConfig.snapshot
      || hasScreenshot(path.dirname(pkgPath)) ? `${unpkgHost}/${pkg.name}@${pkg.version}/screenshot.png` : '';

    const registry =
      (pkg.publishConfig && pkg.publishConfig.registry) ||
      DEFAULT_REGISTRY;

    // generate i18n data
    const i18nData = generateI18nData({ title: materialConfig.title, description: pkg.description });

    // details: ../utils/validate.js
    const payload = {
      name: materialConfig.name,
      title: i18nData.zh_CN.title || i18nData.en_US.title,
      description: i18nData.zh_CN.description || i18nData.en_US.description,
      homepage: pkg.homepage || `${unpkgHost}/${pkg.name}@${pkg.version}/build/index.html`,
      categories: materialConfig.categories || [],
      repository: (pkg.repository && pkg.repository.url) || pkg.repository,
      source: {
        type: 'npm',
        npm: pkg.name,
        version: pkg.version,
        registry,
        author: pkg.author,
      },
      dependencies: pkg.dependencies || {},
      screenshot,
      screenshots: materialConfig.screenshots || (screenshot && [screenshot]),
      builder: materialConfig.builder,
      iceworks: {
        type: materialType,
      },
      ...i18nData,
      // 支持用户自定义的配置
      // customConfig: materialConfig.customConfig || null,
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

function hasScreenshot(cwd) {
  return fs.existsSync(path.join(cwd, 'screenshot.png'));
}
