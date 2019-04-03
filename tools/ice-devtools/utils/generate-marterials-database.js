const fs = require('fs');
const path = require('path');
const glob = require('glob');
const mkdirp = require('mkdirp');
const chalk = require('chalk');
const uppercamelcase = require('uppercamelcase');
const BluebirdPromise = require('bluebird');
const { getNpmTime } = require('./npm');
const logger = require('./logger');
const depAnalyze = require('./dep-analyze');

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
  options
) {
  logger.verbose('generateMaterialsDatabases start', materialName, materialPath, options);

  const distDir = path.resolve(process.cwd(), 'build');
  mkdirp.sync(distDir);

  return Promise.all([
    gather('blocks/*/package.json', materialPath, 'block'),
    gather('components/*/package.json', materialPath, 'component'),
    gatherScaffolds('scaffolds/*/package.json', materialPath),
  ])
    .then(([blocks, components, scaffolds]) => {
      logger.info('数据收集完成，开始写入文件');

      const data = {
        name: materialName, // 物料池名
        ...options,
        blocks,
        components,
        scaffolds,
      };

      const file = path.join(distDir, `${materialName}.json`);
      fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
      console.log();
      console.log(`Created ${materialName} json at: ${chalk.yellow(file)}`);
      console.log();
    })
    .catch((err) => {
      console.log('uncaught error:\n', err.stack);
    });
};

function generatePartciple(payload, source) {
  if (process.env.PARTICIPLE) {
    const { cut } = require('../shared/participle');
    // 分词 payload
    const participle = {
      title: cut(source.title),
      content: cut(source.content),
    };
    if (payload && payload.features) {
      payload.features.participle = participle;
    }
  }
}

function filterDeps(deps) {
  return deps.filter((moduleName) => {
    return (
      !/^\./.test(moduleName) &&
      // 基础组件
      /* eslint-disable no-useless-escape */
      (/(@icedesign\/base)[$\/]lib/.test(moduleName) ||
        // 业务组件
        /^(@icedesign\/)\w+/.test(moduleName))
    );
  });
}

/**
 * 生成 blocks/components 数据
 *
 * @param {*} files
 * @param {*} SPACE
 * @param {String} type | block or react
 */
function generateBlocks(files, SPACE, type, done) {
  /**
   * TODO: 这部分代码有比较严重的性能问题
   *
   * 构造每个物料的数据：
   *  - 读取 package.json 数据
   *  - 区块：根据 src/index.js 分析依赖
   *  - 使用 jieba 分词，感觉并没有意义
   */
  const result = files.map((pkgPath) => {
    const pkg = JSON.parse(fs.readFileSync(path.join(SPACE, pkgPath)));
    const indexPoint = path.resolve(SPACE, pkgPath, '../src/index.js');

    // blockConfig or layoutConfig
    const configKey = `${type}Config`;
    const pkgConfig = pkg[configKey] || {};

    const registry =
      (pkg.publishConfig && pkg.publishConfig.registry) ||
      DEFAULT_REGISTRY;

    const payload = {
      // (必)英文名
      name: pkgConfig.name,
      // (必)中文描述
      title: pkgConfig.title,
      source: {
        type: 'npm',
        npm: pkg.name,
        version: pkgConfig['version-0.x'] || pkg.version,
        registry,
      },
      // (必) 用于说明组件依赖关系
      dependencies: pkg.dependencies || {},
      // (必) 截图
      // 兼容 snapshot 字段, 但是不推荐
      screenshot: pkgConfig.screenshot || pkgConfig.snapshot,

      categories: pkgConfig.categories || [],
      // publishTime: pkg.publishTime || new Date().toISOString(),
    };

    if (type === 'block') {
      payload.source['version-0.x'] = pkg.version;
    }

    // layout or block need src/
    if (type === 'block' || type === 'layout') {
      payload.source.sourceCodeDirectory = 'src/';
    }

    if (type !== 'component' && fs.existsSync(indexPoint)) {
      const componentDeps = depAnalyze(indexPoint);
      const useComponents = filterDeps(componentDeps).map((mod) => {
        let basePackage = '';
        let className = '';
        if (mod.startsWith('@icedesign/base')) {
          basePackage = '@icedesign/base';
          const subCom = /@icedesign\/base\/lib\/(.*)/.exec(mod)[1];
          className = uppercamelcase(subCom);
        } else {
          basePackage = mod;
          const subCom = /@icedesign\/(.*)/.exec(mod)[1];
          className = uppercamelcase(subCom);
        }

        return {
          basePackage,
          className,
        };
      });

      payload.features = {
        useComponents,
      };
    }

    generatePartciple(payload, {
      title: pkgConfig.title,
      content: pkg.description,
    });

    // (可)区块详细说明, markdown 格式
    if (pkg.description) {
      payload.description = pkg.description;
    }

    // (可) 标签
    if (pkgConfig.categories) {
      payload.categories = pkgConfig.categories;
    }

    if (pkgConfig.thumbnail) {
      payload.thumbnail = pkgConfig.thumbnail;
    }

    if (pkgConfig.sketchURL) {
      payload.sketchURL = pkgConfig.sketchURL;
    }

    if (pkgConfig.icelandURL) {
      payload.sketchURL = pkgConfig.icelandURL;
    }

    // if registry is user defined
    if (pkg.publishConfig && pkg.publishConfig.registry) {
      payload.source.registry = pkg.publishConfig.registry;
    }

    // 预览地址
    if (pkg.homepage) {
      payload.homepage = pkg.homepage;
    }

    // 仓库地址
    if (pkg.repository && pkg.repository.url) {
      payload.repository = pkg.repository.url;
    }

    return payload;
  });

  // 并行从 npm 查询包信息并补全数据
  const concurrency = 10;
  logger.info(`通过 npm 查询 ${type} 信息开始，个数：${result.length}，并行个数：${concurrency}`);

  BluebirdPromise.map(result, (item) => {
    return mergeNpmInfoData(item);
  }, {
    concurrency,
  }).then((data) => {
    logger.info(`通过 npm 查询 ${type} 信息完成`);
    done(data);
  });
}

function generateScaffolds(files, SPACE, done) {
  // TODO: 代码要重构，逻辑重新梳理
  const result = files.map((pkgPath) => {
    const pkg = JSON.parse(fs.readFileSync(path.join(SPACE, pkgPath)));

    const generatorJsonPath = path.resolve(pkgPath, '../generator.json');
    const generatorJson = {};
    if (fs.existsSync(generatorJsonPath)) {
      /* eslint-disable-next-line import/no-dynamic-require */
      Object.assign(generatorJson, require(generatorJsonPath));
    }

    const registry =
      (pkg.publishConfig && pkg.publishConfig.registry) ||
      DEFAULT_REGISTRY;

    const screenshot = pkg.scaffoldConfig.screenshot || pkg.scaffoldConfig.snapshot;
    const payload = {
      // (必)英文名
      name: pkg.scaffoldConfig.name,
      // (必)中文描述
      title: pkg.scaffoldConfig.title,
      source: {
        type: 'npm',
        npm: pkg.name,
        version: pkg.version,
        registry,
      },
      builder: pkg.scaffoldConfig.builder || '',
      // (必) 用于说明组件依赖关系
      dependencies: pkg.dependencies || {},
      devDependencies: pkg.devDependencies || {},
      // (必) 截图
      screenshot,
      // 站点模板预览需要多张截图
      screenshots: pkg.scaffoldConfig.screenshots || [screenshot],

      categories: pkg.scaffoldConfig.categories || [],
      // publishTime: pkg.publishTime || new Date().toISOString(),
      features: {},
    };

    generatePartciple(payload, {
      title: pkg.scaffoldConfig.title,
      content: pkg.description,
    });

    // (可)预览地址
    if (pkg.homepage) {
      payload.homepage = pkg.homepage;
    }

    // 仓库地址
    if (pkg.repository && pkg.repository.url) {
      payload.repository = pkg.repository.url;
    }

    // (可)区块详细说明, markdown 格式
    if (pkg.description) {
      payload.description = pkg.description;
    }

    // (可) 标签
    if (pkg.scaffoldConfig.categories) {
      payload.categories = pkg.scaffoldConfig.categories;
    }

    if (pkg.scaffoldConfig.thumbnail) {
      payload.thumbnail = pkg.scaffoldConfig.thumbnail;
    }

    if (pkg.scaffoldConfig.sketchURL) {
      payload.sketchURL = pkg.scaffoldConfig.sketchURL;
    }

    if (pkg.scaffoldConfig.icelandURL) {
      payload.sketchURL = pkg.scaffoldConfig.icelandURL;
    }

    // if registry is user defined
    if (pkg.publishConfig && pkg.publishConfig.registry) {
      payload.source.registry = pkg.publishConfig.registry;
    }

    return payload;
  });

  const concurrency = 10;
  logger.info(`通过 npm 查询模板信息开始，模板个数：${result.length}，并行个数：${concurrency}`);

  BluebirdPromise.map(result, (item) => {
    return mergeNpmInfoData(item);
  }, {
    concurrency,
  }).then((data) => {
    logger.info('通过 npm 查询模板信息成功');
    done(data);
  });
}

/**
 * 生成 blocks or layouts 信息
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
          generateBlocks(files, SPACE, type, resolve);
        }
      }
    );
  });
}

/**
 * 生成 scaffolds 信息
 * @param {*} pattern
 * @param {*} SPACE
 */
function gatherScaffolds(pattern, SPACE) {
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
          generateScaffolds(files, SPACE, resolve);
        }
      }
    );
  });
}

function mergeNpmInfoData(materialItem) {
  return getNpmTime(
    materialItem.source.npm,
    materialItem.source.version,
  ).then(([code, npmResult]) => {
    if (code === 0) {
      materialItem.publishTime = npmResult.created;
      materialItem.updateTime = npmResult.modified;
    } else {
      materialItem.publishTime = null;
      materialItem.updateTime = null;
    }

    return materialItem;
  });
}
