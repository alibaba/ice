const { spawn } = require('child_process');
const chalk = require('chalk');
const fs = require('fs');
const glob = require('glob');
const npmRequestJson = require('npm-request-json');
const path = require('path');
const queue = require('queue');

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

// 检测 npm 是否已发布
function checkNpmPublish(packagePath) {
  const packageData = require(packagePath);
  return npmRequestJson({
    name: packageData.name,
    version: packageData.version,
    registry: registry,
  })
    .then((data) => {
      return null;
    })
    .catch(() => {
      console.log(chalk.red('未发布'), packageData.name, packageData.version);
      return packagePath;
    });
}

// 搜索所有物料文件
function scanMaterials() {
  Promise.all([
    scanPackageJson('../react-materials/*/*/package.json'),
    scanPackageJson('../rax-materials/*/*/package.json'),
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
    .then((publishCheck) => {
      const unpublished = publishCheck.filter((n) => !!n);

      if (unpublished.length > 0) {
        console.log(chalk.red('未发布的包：'), unpublished.length);
        publishQueue(unpublished);
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
    q.push(function() {
      return new Promise((resolve, reject) => {
        const ps = spawn('npm', ['publish'], {
          cwd: publishCwd,
          stdio: 'inherit',
          env: Object.assign({}, process.env, {
            NPM_CONFIG_GLOBALCONFIG: npmrc, // 定义 npm 发布权限认证 rc 文件
          }),
        });
      });
      ps.on('close', (code) => {
        if (code == 0) {
          console.log(chalk.green('发布成功：'), packageJson);
          resolve();
        } else {
          reject(new Error(packageJson + ' 发布失败'));
        }
      });
    });

    q.start();

    q.end(function(err) {
      if (err) throw err;
      console.log(chalk.green('所有未发布的物料已发布完成'));
    });
  });
}
