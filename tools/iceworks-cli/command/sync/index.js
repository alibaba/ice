const path = require('path');
const { checkAliInternal, isAliNpm } = require('ice-npm-utils');
const inquirer = require('inquirer');
const fse = require('fs-extra');
const { DB_PATH, TOKEN_ALI_KEY, TOKEN_KEY } = require('../../lib/constants');
const FusionSDK = require('./fusionSDK');
const goldlog = require('../../lib/goldlog');
const log = require('../../lib/log');
const config = require('../../lib/config');

module.exports = async () => {
  const cwd = process.cwd();
  const DB_PATH_ABSOLUTE = path.join(cwd, DB_PATH);
  const pkgPath = path.join(cwd, 'package.json');
  const pkgData = await fse.readJson(pkgPath);
  const { name, materialConfig = {} } = pkgData;

  const isAliInternal = await checkAliInternal();
  let syncToAli = false;

  if (isAliInternal) {
    const { forAli } = await inquirer.prompt([
      {
        type: 'confirm',
        message: '您正处于阿里巴巴内网环境，是否需要同步到内部站点？',
        name: 'forAli',
      },
    ]);
    syncToAli = forAli;
  }

  if (isAliNpm(name) && !syncToAli) {
    throw new Error(`${name} 为内网项目, 禁止同步到外网`);
  }

  goldlog('sync', materialConfig);

  // get materialsData
  const materialsData = await getMaterialData(pkgData, DB_PATH_ABSOLUTE);

  const fusionSDK = new FusionSDK({
    syncToAli,
  });

  // get fusion token
  const tokenKey = syncToAli ? TOKEN_ALI_KEY : TOKEN_KEY;
  let fusionToken = await config.get(tokenKey);
  if (!fusionToken) {
    fusionToken = await fusionSDK.getToken();
    try {
      await config.set(tokenKey, fusionToken);
    } catch(err) {
      log.warn('set token warning', err.message);
    }
  }
  log.verbose('get fusion token success', fusionToken);

  // select fusion site by token
  let fusionSite;
  if (materialConfig['fusion-site']) {
    fusionSite = materialConfig['fusion-site'];
  } else {
    try {
      fusionSite = await fusionSDK.getSite(fusionToken);
    } catch(err) {
      if (err.noAuth) {
        // token 失效，重置掉
        await config.set(tokenKey, null);
      }
      throw err;
    }

    materialConfig['fusion-site'] = fusionSite;
    pkgData.materialConfig = materialConfig;
    try {
      await fse.writeJson(pkgPath, pkgData, { spaces: 2 });
      log.verbose('write site success');
    } catch(err) {
      log.warn('write site warning', err.message);
      console.error(err);
    }
  }
  log.verbose('select fusion site success', fusionSite);

  // upload data to fusion
  try {
    const materialUrl = await fusionSDK.uploadMaterialsData(fusionToken, fusionSite, materialsData);
    console.log();
    log.info('物料上传完成，可以在 iceworks 中添加自定义物料使用啦！');
    log.info('物料地址：', materialUrl);
    console.log();
  } catch(err) {
    if (err.noAuth) {
      // token 失效，重置掉
      await config.set(tokenKey, null);
    }
    throw err;
  }
};

async function getMaterialData(pkgData, materialDataPath) {
  const result = [];

  if (pkgData.componentConfig) {
    // 单独的 component 项目
    result.push({
      npm: pkgData.name,
      version: pkgData.version,
      type: 'component',
    });
  } else if (pkgData.materialConfig) {
    // material collection
    const data = await fse.readJson(materialDataPath);

    ['block', 'scaffold', 'component'].forEach((materialType) => {
      (data[`${materialType}s`] || []).forEach(item => {
        result.push({
          npm: item.source.npm,
          version: item.source.version,
          type: materialType,
        });
      });
    });
  } else {
    throw new Error('Invalid ice materials project, Missing `materialConfig` property in package.json file.');
  }

  return result;
}
