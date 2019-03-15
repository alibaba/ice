const chalk = require('chalk');
const fs = require('fs');
const glob = require('glob');
const npmRequestJson = require('npm-request-json');
const path = require('path');
const { generateNpmrc } = require('./utils');

// 1. 创建 npmrc 文件
try {
  const cwd = process.cwd();
  generateNpmrc(cwd);
  console.log('npmrc 文件创建成功');
} catch (error) {
  console.error(error);
  process.exit(1);
}

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
