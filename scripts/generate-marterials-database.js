const fs = require('fs');
const path = require('path');
const glob = require('glob');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const cp = require('child_process');
const os = require('os');
const uppercamelcase = require('uppercamelcase');

const request = require('request-promise');
const rp = require('request-promise');
const depAnalyze = require('./helpers/dep-analyze');

const TMPDIR = path.join(os.tmpdir(), 'iceblocks');
rimraf.sync(TMPDIR);
mkdirp.sync(TMPDIR);

/**
 * 下载和解压
 */
function downloadAndUntar() {
  const tarballURL = 'https://github.com/alibaba/ice/archive/master.tar.gz';
  console.log('Temp Dir Path:', TMPDIR);
  return new Promise((resolve, reject) => {
    console.log('Start downloading alibaba/ice@master.tgz...');
    cp.spawnSync('wget', [tarballURL], {
      cwd: TMPDIR,
      // stdio: 'inherit',
    });

    console.log('Start untaring...');
    cp.spawnSync('tar', ['xzvf', 'master.tar.gz'], {
      cwd: TMPDIR,
      // stdio: 'inherit',
    });
    resolve(
      path.join(TMPDIR, 'ice-master')
    );
  });
}

/**
 * 生成 blocks 信息列表
 * @param {*} files
 * @param {*} SPACE
 */
function generateBlocks(files, SPACE) {
  const result = [];
  files.forEach((pkgPath) => {
    const pkg = JSON.parse(fs.readFileSync(
      path.join(SPACE, pkgPath)
    ));
    const componentDeps = depAnalyze(path.resolve(SPACE, pkgPath, '../src/index.js'));
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
    const payload = {
      npm: pkg.name,
      version: pkg.version,
      name: pkg.blockConfig.name,
      className: uppercamelcase(pkg.blockConfig.name),
      title: pkg.blockConfig.title,
      categories: pkg.blockConfig.categories || [],
      description: pkg.description,
      snapshot: pkg.blockConfig.snapshot,
      useComponents,
    };

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

function generateScaffords(files, SPACE) {
  return files.map((pkgPath) => {
    const pkg = JSON.parse(fs.readFileSync(
      path.join(SPACE, pkgPath)
    ));
    const dependencies = pkg.dependencies || {};
    const devDependencies = pkg.devDependencies || {};

    const generatorJsonPath = path.resolve(pkgPath, '../generator.json');
    const generatorJson = {};
    if (fs.existsSync(generatorJsonPath)) {
      Object.assign(generatorJson, require(generatorJsonPath));
    }

    return {
      ...pkg.scaffordConfig,
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
    glob(pattern, {
      cwd: SPACE,
      nodir: true,
    }, (err, files) => {
      if (err) {
        console.log('err:', err);
        reject(err);
      } else {
        resolve(generateBlocks(files, SPACE));
      }
    });
  });
}

/**
 * 生成 scaffords 信息
 * @param {*} pattern
 * @param {*} SPACE
 */
function gatherScaffords(pattern, SPACE) {
  return new Promise((resolve, reject) => {
    glob(pattern, {
      cwd: SPACE,
      nodir: true,
    }, (err, files) => {
      if (err) {
        console.log('err:', err);
        reject(err);
      } else {
        resolve(generateScaffords(files, SPACE));
      }
    });
  })
}

// entry and run
function main() {
  return downloadAndUntar()
    .then((space) => {
      return Promise.all([
        gatherBlocksOrLayouts('blocks/*/package.json', space),
        gatherBlocksOrLayouts('layouts/*/package.json', space),
        gatherScaffords('scaffords/*/package.json', space),
      ]);
    })
    .then(([blocks, layouts, scaffords]) => {
      const distDir = path.resolve(__dirname, '../databases');
      mkdirp.sync(distDir);
      fs.writeFileSync(
        path.join(distDir, 'blocks.db.json'),
        JSON.stringify(blocks, null, 2) + '\n',
      );

      fs.writeFileSync(
        path.join(distDir, 'layouts.db.json'),
        JSON.stringify(layouts, null, 2) + '\n',
      );

      fs.writeFileSync(
        path.join(distDir, 'scaffords.db.json'),
        JSON.stringify(scaffords, null, 2) + '\n',
      );

      console.log('done');
      // console.log('blocks', blocks);
      // console.log('layouts', layouts);
      // console.log('scaffords', scaffords);
    });
};
Promise.resolve(main());
