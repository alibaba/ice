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
  // scaffold has it's own lint file
  if (initMaterial && materialConfig.type === 'react' && type !== 'scaffold') {
    // render lint files
    const lintTemplatePath = path.join(__dirname, '../../template/lint');
    await templateRender({
      src: lintTemplatePath,
      dest,
    });
    // add lint scripts to package.json
    extendPackage(dest, {
      scripts: {
        lint: 'npm run eslint && npm run stylelint',
        eslint: 'eslint --cache --ext .js,.jsx ./',
        stylelint: 'stylelint ./**/*.scss',
      },
      devDependencies: {
        '@ice/spec': '^0.1.1',
        eslint: '^6.0.1',
        stylelint: '^10.1.0',
      },
    });
  }

  completedMessage(type, name, dest, standalone);
};

function isObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]';
}
/**
 * extend packge
 * @param {string} pkgPath
 * @param {object} feilds
 */
function extendPackage(pkgPath, fields) {
  const pkgInfo = pkgJSON.getPkgJSON(pkgPath);
  if (isObject(fields)) {
    Object.keys(fields).forEach((fieldKey) => {
      const existing = pkgInfo[fieldKey];
      const fieldValue = fields[fieldKey];
      if (isObject(existing) && isObject(fieldValue)) {
        // TODO deepmerge
        pkgInfo[fieldKey] = Object.assign(existing, fieldValue);
      } else if (Array.isArray(existing) && Array.isArray(fieldValue)) {
        pkgInfo[fieldKey] = Array.from(new Set([...existing, ...fieldValue]));
      } else {
        pkgInfo[fieldKey] = fieldValue;
      }
    });
    pkgJSON.writePkgJSON(pkgInfo, pkgPath);
  } else {
    logger.fatal('package.json feilds must be an object');
  }
}

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

