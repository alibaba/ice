const chalk = require('chalk');
const fs = require('fs');
const glob = require('glob');
const npmRequestJson = require('npm-request-json');
const path = require('path');

// 1. 创建 npmrc 文件

const cwd = process.cwd();
const npmrc = path.join(cwd, 'npmrc');

const NPM_EMAIL = process.env.NPM_EMAIL;
const NPM_TOKEN = process.env.NPM_TOKEN;
const NPM_REGISTRY = process.env.NPM_REGISTRY || 'registry.npmjs.com';

const registry = `https://${NPM_REGISTRY}`;

const npmrcContext = `email=${NPM_EMAIL}
registry=http://${NPM_REGISTRY}/
//${NPM_REGISTRY}/:_authToken=${NPM_TOKEN}
`;

fs.writeFile(npmrc, npmrcContext, (error) => {
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
    registry,
  })
    .then(() => {
      return null;
    })
    .catch(() => {
      console.log(chalk.red('未发布'), packageData.name, packageData.version);
      return packagePath;
    });
}

// 搜索所有物料文件
function scanMaterials() {
  const pattern =
    '../?(react|rax|vue|angular)-materials/!(components)/*/package.json';
  scanPackageJson(pattern)
    .then((allMaterials = []) => {
      return Promise.all(allMaterials.map(checkNpmPublish));
    })
    .then((publishCheck) => {
      const unpublished = publishCheck.filter((n) => !!n);
      if (unpublished.length > 0) {
        console.log('未发布的区块：', unpublished.length);
        process.exit(1);
      }
    });
}
