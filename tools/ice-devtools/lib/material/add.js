const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const fse = require('fs-extra');
const { getQuestions } = require('../../config/material');
const boxenLog = require('../../utils/boxen-log');
const logger = require('../../utils/logger');
const { generateNpmNameByPrefix } = require('../../utils/npm');
const templateRender = require('../../utils/template-render');
const pkgJSON = require('../../utils/pkg-json');

module.exports = async function addMaterial(cwd, opts = {}) {
  logger.verbose('init -> init single material', opts);

  const {
    type,
    npmPrefix,
    templatePath: src,
    standalone,
    materialConfig,
    initMaterial,
  } = opts;

  const questions = getQuestions(npmPrefix);

  const answers = await (inquirer.prompt(questions[type]));

  const name = answers.name;
  const npmName = generateNpmNameByPrefix(name, npmPrefix);
  const dest = standalone ? cwd : path.join(cwd, `${type}s`, name);

  if (answers.adaptor) {
    // copy template adaptor to src
    const adaptorDir = path.join(__dirname, '../../template/component');
    fse.copySync(adaptorDir, src);
  }

  await templateRender({
    ...answers,
    src,
    dest,
    npmName,
    materialConfig,
    transformRegexp: initMaterial ? /.+/ : /_package.json/,
    skipGitIgnore: !standalone, // 物料仓库中，不处理 _gitignore 文件
  });

  // generate lint file only material type is react
  if (initMaterial && materialConfig.type === 'react') {
    // render lint files
    const lintTemplatePath = path.join(__dirname, '../../template/lint');
    await templateRender({
      src: lintTemplatePath,
      dest,
    });

    const pkgInfo = pkgJSON.getPkgJSON(dest);
    // add lint scripts to package.json
    pkgInfo.scripts.lint = 'npm run eslint && npm run stylelint';
    pkgInfo.scripts.eslint = 'eslint --cache --ext .js,.jsx ./';
    pkgInfo.scripts.stylelint = 'stylelint ./**/*.scss';
    // add lint devDependencies to package.json
    pkgInfo.devDependencies['@ice/spec'] = '^0.1.1';
    pkgInfo.devDependencies.eslint = '^6.0.1';
    pkgInfo.devDependencies.stylelint = '^10.1.0';
    pkgJSON.writePkgJSON(pkgInfo, dest);
  }

  completedMessage(type, name, dest, standalone);
};

/**
 * 下载完成后的提示信息
 * @param {string} name 组件名称
 * @param {string} filepath 组件路径
 * @param {boolean} standalone
 */
function completedMessage(type, name, filepath, standalone) {
  boxenLog(`
    Success! Created ${name} at ${filepath}
    Inside ${name} directory, you can run several commands:

      Starts the development server.
    ${!standalone ? chalk.cyan(`    cd ${type}s/${name}`) : ''}
    ${chalk.cyan('    npm install')}
    ${chalk.cyan('    npm start')}

      When the development is complete, you need to run npm publish
    ${chalk.cyan('    npm publish')}
  `);
}

