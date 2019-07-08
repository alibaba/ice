const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');
const validateName = require('validate-npm-package-name');
const uppercamelcase = require('uppercamelcase');
const templateRender = require('../../utils/template-render');
const pkgJSON = require('../../utils/pkg-json');
const logger = require('../../utils/logger');
const boxenLog = require('../../utils/boxen-log');

const { generateNpmNameByPrefix } = require('../../utils/npm');

const initTemplatePath = path.join(__dirname, '../../template/init');

const MATERIAL_TYPES = ['block', 'component', 'scaffold'];

// 缓存目录 用于之后的自定义模板、idev add默认模板来源
// const appTemplatePath = (appPath, ...subFiles) => path.join(appPath, '.template', ...subFiles);

/**
 * @param{String} cwd 当前路径
 * @param{Object} opt 参数
 */
module.exports = async function addMaterial(cwd, opt = {}) {
  try {
    const { template, templatePath, npmPrefix, forInnerNet, materialConfig } = opt;

    const questions = defaultQuestion({ cwd, forInnerNet, npmPrefix });
    const { name, description } = await inquirer.prompt(questions);
    const npmName = generateNpmNameByPrefix(name, npmPrefix);

    // init material project
    await templateRender({
      template,
      name: npmName,
      npmName,
      version: '1.0.0',
      description,
      src: initTemplatePath,
      dest: cwd,
      materialConfig,
      categories: {},
      registry: process.env.REGISTRY,
    });

    // generate example:
    // components/ExampleComponent blocks/ExampleBlock scaffold/ExampleScaffold
    await generateExample(cwd, templatePath, materialConfig);

    completedMessage(cwd, name);
  } catch (err) {
    logger.fatal(err);
  }
};

function defaultQuestion({ cwd, forInnerNet, npmPrefix }) {
  const projectName = path.basename(cwd);
  return [
    {
      type: 'input',
      message: 'materials name',
      name: 'name',
      default: projectName,
      require: true,
      validate: (value) => {
        if (!value) {
          return 'cannot be empty, please enter again';
        }
        const materialsName = (npmPrefix ? `${npmPrefix}/` : '') + value.replace(/\s+/g, '');
        if (forInnerNet && !validateName(materialsName).validForNewPackages) {
          return `this material name(${materialsName}) has already exist. please enter again`;
        }
        return true;
      },
    },
    {
      name: 'description',
      type: 'string',
      label: 'description',
      message: 'description',
      default: 'This is a ice material project',
    },
  ];
}

/**
 * generate demo for material project
 */
async function generateExample(cwd, templatePath, materialConfig) {
  const pkg = pkgJSON.getPkgJSON(cwd);

  // [block, component, scaffold]
  const types = MATERIAL_TYPES.filter((type) => fs.statSync(path.join(templatePath, type)).isDirectory());

  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    // generate blocks\components\scaffolds folders and demo
    /* eslint-disable-next-line no-await-in-loop */
    await templateRender({
      src: path.join(templatePath, type),
      dest: path.join(cwd, `${type}s/Example${uppercamelcase(type)}`),
      name: `example-${type}`,
      npmName: `${pkg.name}-example-${type}`,
      adaptor: false, // TODO
      version: '1.0.0',
      title: `demo ${type}`,
      description: '示例',
      skipGitIgnore: true,
      categories: {},
      materialConfig,
    });
  }
}

/**
 * 下载完成后的提示信息
 * @param {string} appPath
 * @param {string} appName
 */
function completedMessage(appPath, appName) {
  boxenLog(`
    Success! Created ${appName} at ${appPath}
    Inside that directory, you can run several commands:

      Install dependencies
    ${chalk.cyan('    npm install')}

      Starts the block development server.
    ${chalk.cyan('    cd blocks/ExampleBlock')}
    ${chalk.cyan('    npm install')}
    ${chalk.cyan('    npm start')}

      Starts the scaffold development server.
    ${chalk.cyan('    cd scaffolds/ExampleScaffold')}
    ${chalk.cyan('    npm install')}
    ${chalk.cyan('    npm start')}

      Generate materials json.
    ${chalk.cyan('    npm run generate')}

      You can upload the JSON file to a static web server and put the URL at Iceworks settings panel.
      You will see your materials in Iceworks

      We suggest that you can sync the materials json to fusion or unpkg by run:
    ${chalk.cyan('    npm run sync')}  or  ${chalk.cyan('npm run sync-unpkg')}

    Happy hacking!
  `);
}
