const npmRequestJson = require('npm-request-json');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const rimraf = require("rimraf");

function publishMaterialsDB() {
  
  // 1. 创建临时文件夹
  const cwd = process.cwd();
  const temp_dir = path.join(cwd, 'temp_dir');
  rmTempDir(temp_dir);
  let temp_lib_dir;
  try {
    fs.mkdirSync(temp_dir);
    temp_lib_dir = path.join(temp_dir, 'lib');
    fs.mkdirSync(temp_lib_dir);
    console.log('临时文件夹 temp_dir、temp_dir/lib 创建完成');
  } catch (error) {
    console.error('temp_dir 文件夹创建失败');
    console.error(error);
    process.exit(1);
  }

  // 2 同步build下物料源配置文件到 temp_dir/src 下
  const buildPath = path.resolve(__dirname, '../build');
  try {
    fs.readdirSync(buildPath).map(
      (filename) => {
        const from = path.join(buildPath, filename);
        const to = path.join(temp_lib_dir, filename);
        fs.copyFileSync(from, to);
      }
    );
    console.log('物料资源同步到 temp_dir/lib 完成');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  // 4. 创建 package.json 文件
  const pkgConfig = {
    "name": "@icedesign/materails-db",
    "version": "1.0.0",
    "description": "iceworks 官方物料源备份数据",
    "main": "lib",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "MIT",
    "publishConfig": {
      "registry": "http://registry.npmjs.com",
      "access": "public"
    }
  };

  // 获取已发布版本号
  const NPM_REGISTRY = process.env.NPM_REGISTRY || 'registry.npmjs.com';
  const registry = `https://${NPM_REGISTRY}`;
  npmRequestJson({
    name: pkgConfig.name,
    version: 'latest',
    registry,
  })
  .then((pkgData) => {
    //  版本号自增1
    const currentVersion = pkgData.version;
    console.log(`当前版本号：${currentVersion}`);
    const versionArr = currentVersion.split('.');
    versionArr[2] = +versionArr[2]+1;
    const publishVersion = versionArr.join('.');
    console.log(`待发布版本号：${publishVersion}`);
    pkgConfig.version = publishVersion;
    generatePkg(temp_dir, pkgConfig);
    // 5. 发布
    publish(temp_dir);
  })
  .catch((error) => {
    console.log(`获取${pkgConfig.name}包信息出错：${error}`);
    process.exit(1);
  });
}

function generatePkg(temp_dir, pkgConfig) {
  const pkg = path.join(temp_dir, 'package.json');
  try {
    fs.writeFileSync(pkg, JSON.stringify(pkgConfig));
    console.log('package.json 文件创建成功');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

function publish(temp_dir) {
  console.log('开始发布');
  exec('npm publish', {
    cwd: temp_dir
  }, (error, stdout, stderr) => {
    if(error) {
      console.error(error);
      rmTempDir(temp_dir);
      return
    }
    console.log('发布完成: ' + stdout);
    rmTempDir(temp_dir);
  });
}

function rmTempDir(temp_dir) {
  // 6. 删除临时文件
  rimraf.sync(temp_dir);
  console.log('移除临时文件 temp_dir 完成');
}

module.exports = {
  publishMaterialsDB
}