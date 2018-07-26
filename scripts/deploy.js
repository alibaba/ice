const { spawn } = require('child_process');
const chalk = require('chalk');
const fs = require('fs');
const glob = require('glob');
const npmRequestJson = require('npm-request-json');
const path = require('path');
const queue = require('queue');
const rp = require('request-promise');
const uppercamelcase = require('uppercamelcase');
const buildBlock = require('./block-scripts/build-block');

//1. 创建 npmrc 文件

const cwd = process.cwd();
const npmrc = path.join(cwd, 'npmrc');

const NPM_EMAIL = process.env.NPM_EMAIL;
const NPM_TOKEN = process.env.NPM_TOKEN;
const NPM_REGISTRY = process.env.NPM_REGISTRY || 'registry.npmjs.com';

const registry = 'https://' + NPM_REGISTRY;

const npmrcContext = `email=${NPM_EMAIL}
registry=http://${NPM_REGISTRY}/
//${NPM_REGISTRY}/:_authToken=${NPM_TOKEN}
`;

fs.writeFile(npmrc, npmrcContext, function(error) {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log('npmrc 文件创建成功');
  scanMaterials();
});

function scanPackageJson(pattern) {
  return new Promise((resolve, reject) => {
    glob(pattern, { cwd: __dirname }, (error, files) => {
      if (error) {
        reject();
      }
      resolve(files.map((f) => path.join(__dirname, f)));
    });
  });
}

/**
 * 搜索所有物料文件
 * 1. 检查 NPM 包是否发布
 *    如果未发布，则执行脚本进行发布，发布完成后发布对应的 dist 资源
 *
 * 2. 发布对应的 dist 资源(NPM发布成功后可能 dist 资源发布失败)：
 *    如果已发布，需要对比 oss 上是否存在该区块的 dist 资源，如果存在则跳过
 *    如果不存在则需要发布对应的 dist 然后上传
 */
function scanMaterials() {
  Promise.all([
    scanPackageJson('../react-materials/*/*/package.json'),
    scanPackageJson('../vue-materials/*/*/package.json'),
    scanPackageJson('../angular-materials/*/*/package.json'),
  ])
    .then(([reactMaterials = [], vueMaterials = [], angularMaterials = []]) => {
      const allMaterials = [
        ...reactMaterials,
        ...vueMaterials,
        ...angularMaterials,
      ];
      return Promise.all(allMaterials.map(checkNpmPublish));
    })
    .then((data) => {
      // 未发布的包，如果未发布，则执行脚本进行发布，发布完成后发布对应的 dist 资源
      const unpublished = data.filter((block) => !block.published);
      if (unpublished.length > 0) {
        console.log(
          chalk.red(
            ` ===========【 未发布的包：${unpublished.length} 】========== `
          )
        );

        publishQueue(unpublished);
      } else {
        // 如果所有的包都已发布，则检查所有的 dist 资源是否发布(区块发布成功后可能 dist 资源发布失败或者 dist 资源被误删除)：
        // 如果已发布，需要对比 oss 上是否存在该区块的 dist 资源，如果存在则跳过
        // 如果不存在则需要发布对应的 dist 然后上传
        const reactMaterialBlocks = fs.readdirSync(
          path.join(cwd, 'react-materials/blocks')
        );

        const blocks = data.slice(0, reactMaterialBlocks.length).map((item) => {
          const blockConfig = item.data.blockConfig || {};
          const blockName = uppercamelcase(blockConfig.name);
          const blocksPkg = path.join(
            cwd,
            'react-materials/blocks',
            blockName,
            'package.json'
          );
          return blocksPkg;
        });

        console.log(
          chalk.green(
            ` ===========【 所有的 NPM 包发布完成: ${
              blocks.length
            } 】========== `
          )
        );

        publishBlockDist(blocks);
      }
    });
}

// npm publish 发布队列
function publishQueue(unpublishedPackageJson) {
  const q = queue({
    concurrency: 1, // 一次执行一个
  });

  unpublishedPackageJson.forEach((packageJson) => {
    const publishCwd = path.dirname(packageJson);
    const pkg = require(packageJson);
    const blockName = uppercamelcase(pkg.blockConfig.name);
    q.push(function() {
      return new Promise((resolve, reject) => {
        const ps = spawn('npm', ['publish'], {
          cwd: publishCwd,
          stdio: 'inherit',
          env: Object.assign({}, process.env, {
            NPM_CONFIG_GLOBALCONFIG: npmrc, // 定义 npm 发布权限认证 rc 文件
          }),
        });

        ps.on('close', (code) => {
          if (code == 0) {
            console.log(chalk.green('发布成功：'), blockName);

            // NPM 发布成功后，发布对应的 dist 资源
            publishBlockDist([packageJson]);

            resolve();
          } else {
            reject(new Error(packageJson + ' 发布失败'));
          }
        });
      });
    });

    // begin processing, get notified on end / failure
    q.start();

    q.end(function(err) {
      if (err) throw err;

      console.log(chalk.green('所有未发布的物料已发布完成'));
    });
  });
}

/**
 * 构建区块对应的资源
 * @param {array} blocksPkg
 */
function publishBlockDist(blocksPkg) {
  const p = Promise.all(blocksPkg.map(checkBlockDist));

  p.then((data) => {
    const unpublished = data.filter((n) => !!n);

    if (unpublished.length) {
      buildBlock(unpublished);
    } else {
      console.log('所有资源已经发布线上');
    }
  }).catch((err) => {
    console.log(err);
  });
}

/**
 * 检查 block 资源是否已发布
 * @param {string} blockName
 * @param {number} blockVersion
 */
function checkBlockDist(blockPkg) {
  const pkgData = require(blockPkg);
  const blockName = uppercamelcase(pkgData.blockConfig.name);
  const blockVersion = pkgData.version;

  return rp({
    uri: `https://ice.alicdn.com/${
      process.env.TRAVIS_BRANCH
    }/${blockName}/${blockVersion}.js`,
    resolveWithFullResponse: true,
  })
    .then((response) => {
      if (response.statusCode === 200) {
        console.log(`线上资源已存在: ${blockName}`);
        return null;
      }
    })
    .catch((error) => {
      if (error.statusCode === 404) {
        console.log(
          chalk.red(`=========== 【 线上资源不存在: ${blockName} 】===========`)
        );
        return blockName;
      }
    });
}

/**
 * 检测 npm 是否已发布
 * @param {string} packagePath
 */
function checkNpmPublish(packagePath) {
  const packageData = require(packagePath);
  return npmRequestJson({
    name: packageData.name,
    version: packageData.version,
    registry: registry,
  })
    .then((data) => {
      return {
        published: true,
        data,
      };
    })
    .catch(() => {
      console.log(chalk.red('未发布'), packageData.name, packageData.version);
      return packagePath;
    });
}
