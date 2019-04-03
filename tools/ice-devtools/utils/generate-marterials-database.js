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
  materialFilename,
  materialConfig,
) {
  logger.verbose('generateMaterialsDatabases start', materialName, materialPath, materialFilename);

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

      const file = path.join(distDir, `${materialFilename}.json`);
      fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
      console.log();
      console.log(`Created ${materialName} json at: ${chalk.yellow(file)}`);
      console.log();
    })
    .catch((err) => {
      console.log('uncaught error:\n', err.stack);
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
          generateMaterialsData(files, SPACE, type, resolve);
        }
      }
    );
  });
}

/**
 * 根据 files 生成 blocks/components/scaffolds 数据
 *
 * @param {*} files
 * @param {*} SPACE
 * @param {String} type | block or react
 */
function generateMaterialsData(files, SPACE, type, done) {
  /**
   * 构造每个物料的数据：
   *  - 读取 package.json 数据
   *  - 区块：根据 src/index.js 分析依赖
   */
  const result = files.map((pkgPath) => {
    const pkg = JSON.parse(fs.readFileSync(path.join(SPACE, pkgPath)));

    const materialConfig = pkg[`${type}Config`] || {};
    // 兼容 snapshot 字段
    const screenshot = materialConfig.screenshot || materialConfig.snapshot;

    const registry =
      (pkg.publishConfig && pkg.publishConfig.registry) ||
      DEFAULT_REGISTRY;

    const payload = {
      // (必)英文名
      name: materialConfig.name,
      // (必)中文描述
      title: materialConfig.title,
      description: pkg.description,
      homepage: pkg.homepage,
      categories: materialConfig.categories || [],
      repository: pkg.repository && pkg.repository.url,
      source: {
        type: 'npm',
        npm: pkg.name,
        version: pkg.version,
        registry,
      },
      // (必) 用于说明组件依赖关系
      dependencies: pkg.dependencies || {},
      // (必) 截图
      screenshot,
      // 站点模板预览需要多张截图
      screenshots: materialConfig.screenshots || [screenshot],

      // ice-scripts/create-react-app，Iceworks 里选择模板里使用，不是 ice-scripts 给出提示
      builder: materialConfig.builder,

      // 没有使用
      thumbnail: materialConfig.thumbnail,
      sketchURL: materialConfig.sketchURL,

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

      // 解析区块依赖：payload.features.useComponents
      // 用于站点上关联组件的使用区块
      const blockIndex = path.resolve(SPACE, pkgPath, '../src/index.js');
      if (fs.existsSync(blockIndex)) {
        try {
          const componentDeps = depAnalyze(blockIndex);
          const useComponents = filterDeps(componentDeps).map((mod) => {
            let basePackage = '';
            let className = '';
            if (mod.startsWith('@icedesign/base')) {
              basePackage = '@icedesign/base';
              const subCom = /@icedesign\/base\/lib\/(.*)/.exec(mod)[1];
              className = uppercamelcase(subCom);
            } if (mod.startsWith('@alifd/next')) {
              basePackage = '@alifd/next';
              const subCom = /@alifd\/next\/lib\/(.*)/.exec(mod)[1];
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
        } catch (err) {
          logger.warn('解析区块依赖失败', err);
        }
      }
    }

    return payload;
  });

  // 并行从 npm 查询包信息并补全数据
  // 实际并行数是 concurrency * 3（block+component+scaffold）
  const concurrency = 20;
  logger.info(`通过 npm 查询 ${type} 信息开始，个数：${result.length}，并行个数：${concurrency}`);

  // 根据 npm 信息补全物料数据：publishTime, updateTime
  BluebirdPromise.map(result, (materialItem) => {
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
  }, {
    concurrency,
  }).then((data) => {
    logger.info(`通过 npm 查询 ${type} 信息完成`);
    done(data);
  });
}

function filterDeps(deps) {
  return deps.filter((moduleName) => {
    return (
      !/^\./.test(moduleName) &&
      /* eslint-disable no-useless-escape */
      (
        // 基础组件
        /(@icedesign\/base)[$\/]lib/.test(moduleName)
        || /(@alifd\/next)[$\/]lib/.test(moduleName)
        // 业务组件
        || /^(@icedesign\/)\w+/.test(moduleName)
      )
    );
  });
}
