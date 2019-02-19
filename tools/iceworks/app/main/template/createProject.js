/**
 * 创建项目下载并解压 tar 包
 */
const fs = require('fs');
const path = require('path');
const utils = require('./utils');

/**
 * destDir 项目解压路径: 项目文件夹下/client文件夹下
 * 根据 NPM 包创建项目，下载 tarball 后解压
 * @param {Object} 项目参数
 */
module.exports = async function createProject(
  { destDir, scaffold, projectName, interpreter, progressFunc },
  afterCreateRequest
) {
  const tarballURL = await utils.getTarballURLBySource(scaffold.source);
  const extractedFiles = await utils.extractTarball(
    tarballURL,
    destDir,
    scaffold.source,
    progressFunc,
    afterCreateRequest
  );

  // 写 package.json 文件
  const pkgJSONPath = path.join(destDir, 'package.json');
  let pkgJSON = fs.readFileSync(pkgJSONPath);

  try {
    pkgJSON = JSON.parse(pkgJSON.toString());
    utils.createInterpreter('FILE_CREATED', extractedFiles, interpreter);

    pkgJSON.title = projectName;
    pkgJSON.version = '1.0.0'; // 初始化项目到 1.0.0

    delete pkgJSON.homepage;

    fs.writeFileSync(
      pkgJSONPath,
      JSON.stringify(pkgJSON, null, 2) + '\n',
      'utf-8'
    );
  } catch (error) {
    throw error;
  }
};
