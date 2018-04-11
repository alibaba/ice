const fs = require('fs');
const path = require('path');
const glob = require('glob');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const moment = require('moment');
const cp = require('child_process');
const os = require('os');
const uppercamelcase = require('uppercamelcase');
const rp = require('request-promise');
const depAnalyze = require('../shared/dep-analyze');
const { cut } = require('../shared/participle');

/**
 * 生成 blocks 信息列表
 * @param {*} files
 * @param {*} SPACE
 */
function generateBlocks(files, SPACE) {
  const result = [];
  files.forEach((pkgPath) => {
    const pkg = JSON.parse(fs.readFileSync(path.join(SPACE, pkgPath)));
    const componentDeps = depAnalyze(
      path.resolve(SPACE, pkgPath, '../src/index.js')
    );

    const useComponents = componentDeps.map((mod) => {
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

    // 分词 payload
    const participle = {
      title: cut(pkg.blockConfig.title),
      content: cut(pkg.description),
    };

    const payload = {
      // (必)英文名
      name: pkg.blockConfig.name,
      // (必)中文描述
      title: pkg.blockConfig.title,
      source: {
        type: 'npm',
        npm: pkg.name,
        version: pkg.version,
        sourceCodeDirectory: 'src/',
      },
      // (必) 用于说明组件依赖关系
      dependencies: pkg.dependencies || {},
      // (必) 截图
      snapshot: pkg.blockConfig.snapshot,

      categories: pkg.blockConfig.categories || [],
      publishTime: pkg.publishTime || new Date().toISOString(),
      features: {
        participle,
        useComponents,
      },
    };

    // (可)区块详细说明, markdown 格式
    if (pkg.description) {
      payload.description = pkg.description;
    }

    // (可) 标签
    if (pkg.blockConfig.categories) {
      payload.categories = pkg.blockConfig.categories;
    }

    if (pkg.blockConfig.thumbnail) {
      payload.thumbnail = pkg.blockConfig.thumbnail;
    }

    if (pkg.blockConfig.sketchURL) {
      payload.sketchURL = pkg.blockConfig.sketchURL;
    }

    if (pkg.blockConfig.icelandURL) {
      payload.sketchURL = pkg.blockConfig.icelandURL;
    }

    // if registry is user defined
    if (pkg.publishConfig && pkg.publishConfig.registry) {
      payload.source.registry = pkg.publishConfig.registry;
    }

    result.push(payload);
  });

  return result;
}

function generateScaffolds(files, SPACE) {
  return files.map((pkgPath) => {
    const pkg = JSON.parse(fs.readFileSync(path.join(SPACE, pkgPath)));
    const dependencies = pkg.dependencies || {};
    const devDependencies = pkg.devDependencies || {};

    const generatorJsonPath = path.resolve(pkgPath, '../generator.json');
    const generatorJson = {};
    if (fs.existsSync(generatorJsonPath)) {
      Object.assign(generatorJson, require(generatorJsonPath));
    }

    // 分词 payload
    const participle = {
      title: cut(pkg.scaffoldConfig.title),
      content: cut(pkg.description),
    };

    const payload = {
      // (必)英文名
      name: pkg.scaffoldConfig.name,
      // (必)中文描述
      title: pkg.scaffoldConfig.title,
      source: {
        type: 'npm',
        npm: pkg.name,
        version: pkg.version,
      },
      // (必) 用于说明组件依赖关系
      dependencies: pkg.dependencies || {},
      devDependencies: pkg.devDependencies || {},
      // (必) 截图
      snapshot: pkg.scaffoldConfig.snapshot,

      categories: pkg.scaffoldConfig.categories || [],
      publishTime: pkg.publishTime || new Date().toISOString(),
      features: {
        participle,
      },
    };

    // (可)预览地址
    if (pkg.homepage) {
      payload.homepage = pkg.homepage;
    }

    // (可)区块详细说明, markdown 格式
    if (pkg.description) {
      payload.description = pkg.description;
    }

    // (可) 标签
    if (pkg.scaffoldConfig.categories) {
      payload.categories = pkg.blockConfig.categories;
    }

    if (pkg.scaffoldConfig.thumbnail) {
      payload.thumbnail = pkg.blockConfig.thumbnail;
    }

    if (pkg.scaffoldConfig.sketchURL) {
      payload.sketchURL = pkg.blockConfig.sketchURL;
    }

    if (pkg.scaffoldConfig.icelandURL) {
      payload.sketchURL = pkg.blockConfig.icelandURL;
    }

    // if registry is user defined
    if (pkg.publishConfig && pkg.publishConfig.registry) {
      payload.source.registry = pkg.publishConfig.registry;
    }

    return payload;
  });
}

/**
 * 生成 blocks or layouts 信息
 * @param {*} pattern
 * @param {*} SPACE
 */
function gatherBlocksOrLayouts(pattern, SPACE) {
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
          resolve(generateBlocks(files, SPACE));
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
          resolve(generateScaffolds(files, SPACE));
        }
      }
    );
  });
}

/**
 * 从 npm 源补充字段
 * @param {*} npm npm 名
 * @param {*} version 版本号
 * @param {*} registry
 * @param {Object} appender 需要补充的字段, key 是返回的字段, 对应的 value 是 registry 返回的字段
 */
function appendFieldFromNpm(item) {
  const registry = 'http://registry.npm.taobao.org/';
  const { npm, version } = item;
  return rp({ uri: `${registry}${npm}`, json: true }).then((body) => {
    const latestVersionBody = body.versions[version];
    if (!latestVersionBody) {
      // check version is not published
      throw new Error(`${npm}@${version} is not published at ${registry}`);
    }
    const TIMEFMT = 'YYYY-MM-DD HH:mm';
    return Object.assign({}, item, {
      createdTime: moment(body.time.created).format(TIMEFMT),
      publishTime: moment(latestVersionBody.publish_time).format(TIMEFMT),
      keywords: latestVersionBody.keywords || [],
    });
  });
}

// entry and run
module.exports = function main(materialName, materialPath, options) {
  const distDir = path.resolve(process.cwd(), 'build');
  mkdirp.sync(distDir);

  return (
    Promise.resolve(materialPath)
      .then((space) => {
        return Promise.all([
          gatherBlocksOrLayouts('blocks/*/package.json', space),
          gatherBlocksOrLayouts('layouts/*/package.json', space),
          gatherScaffolds('scaffolds/*/package.json', space),
        ]);
      })
      // .then(([blocks, layouts, scaffolds]) => {
      //   // 补充字段
      //   return Promise.all([
      //     Promise.all(blocks.map(appendFieldFromNpm)),
      //     Promise.all(layouts.map(appendFieldFromNpm)),
      //     Promise.all(scaffolds.map(appendFieldFromNpm)),
      //   ]);
      // })
      .then(([blocks, layouts, scaffolds]) => {
        const data = {
          name: materialName, // 物料池名
          type: options.type, // vue or react,...
          blocks,
          layouts,
          scaffolds,
        };

        const file = path.join(distDir, materialName + '.json');
        fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');

        console.log(
          `${materialName} 物料数据生成完毕. Marterials DB Generated.\n${file}`
        );
      })
      .catch((err) => {
        console.log('uncaught error:\n', err.stack);
      })
  );
};
