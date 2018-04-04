const fs = require('fs');
const path = require('path');
const glob = require('glob');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const moment = require('moment');
const cp = require('child_process');
const os = require('os');
const uppercamelcase = require('uppercamelcase');
const request = require('request-promise');
const rp = require('request-promise');
const depAnalyze = require('./helpers/dep-analyze');
const { cut } = require('./participle');

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
      npm: pkg.name,
      version: pkg.version,
      name: pkg.blockConfig.name,
      className: uppercamelcase(pkg.blockConfig.name),
      title: pkg.blockConfig.title,
      participle,
      categories: pkg.blockConfig.categories || [],
      description: pkg.description,
      snapshot: pkg.blockConfig.snapshot,
      publishTime: pkg.publishTime || new Date().toISOString(),
      useComponents,
    };

    if (pkg.blockConfig.thumbnail) {
      payload.thumbnail = pkg.blockConfig.thumbnail;
    }

    if (pkg.blockConfig.sketchURL) {
      payload.sketchURL = pkg.blockConfig.sketchURL;
    }

    if (pkg.blockConfig.icelandURL) {
      payload.sketchURL = pkg.blockConfig.icelandURL;
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

    return {
      ...pkg.scaffoldConfig,
      npm: pkg.name,
      participle,
      description: pkg.description,
      version: pkg.version,
      homepage: pkg.homepage || '',
      layouts: generatorJson.layouts || [],
      dependencies,
      devDependencies,
    };
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
function main() {
  return Promise.resolve(path.resolve(__dirname, '..'))
    .then((space) => {
      return Promise.all([
        gatherBlocksOrLayouts('blocks/*/package.json', space),
        gatherBlocksOrLayouts('layouts/*/package.json', space),
        gatherScaffolds('scaffolds/*/package.json', space),
      ]);
    })
    .then(([blocks, layouts, scaffolds]) => {
      // 补充字段
      return Promise.all([
        Promise.all(blocks.map(appendFieldFromNpm)),
        Promise.all(layouts.map(appendFieldFromNpm)),
        Promise.all(scaffolds.map(appendFieldFromNpm)),
      ]);
    })
    .then(([blocks, layouts, scaffolds]) => {
      const distDir = path.resolve(__dirname, '../databases');
      mkdirp.sync(distDir);
      const blocksDest = path.join(distDir, 'blocks.db.json');
      const layoutsDest = path.join(distDir, 'layouts.db.json');
      const scaffoldsDest = path.join(distDir, 'scaffolds.db.json');
      fs.writeFileSync(blocksDest, JSON.stringify(blocks, null, 2) + '\n');

      fs.writeFileSync(layoutsDest, JSON.stringify(layouts, null, 2) + '\n');

      fs.writeFileSync(
        scaffoldsDest,
        JSON.stringify(scaffolds, null, 2) + '\n'
      );

      console.log('物料数据生成完毕. Marterials DB Generated.');
      console.log(blocksDest);
      console.log(layoutsDest);
      console.log(scaffoldsDest);
    })
    .catch((err) => {
      console.log('caught error:\n', err.message);
    });
}
Promise.resolve(main());
