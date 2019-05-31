const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');
const validateName = require('validate-npm-package-name');
const fse = require('fs-extra');
const uppercamelcase = require('uppercamelcase');
const generate = require('../../utils/generate');
const pkgJSON = require('../../utils/pkg-json');

const initTemplatePath = path.join(__dirname, '../../template/init');

// 缓存目录 用于之后的自定义模板、seg add默认模板来源
const appTemplatePath = (appPath, ...subFiles) => path.join(appPath, '.template', ...subFiles);

/**
 * @param{String} cwd 当前路径
 * @param{Object} opt 参数
 */
module.exports = async function addMaterial(cwd, opt = {}) {
  const { templatePath, npmPrefix, forInnerNet } = opt;
  const dest = cwd;

  const questions = defaultQuestion({ cwd, forInnerNet, npmPrefix });
  const { name, description } = await inquirer.prompt(questions);

  // init material project
  await generate({
    name,
    version: '1.0.0',
    description,
    src: initTemplatePath,
    dest,
    categories: {},
  });

  // clone template to .template for custom template
  fse.copySync(templatePath, appTemplatePath(dest));

  // generate demo
  await generateMaterialsDemo(dest);

  completedMessage(dest, name);
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
async function generateMaterialsDemo(appPath) {
  const pkg = pkgJSON.getPkgJSON(appPath);

  // [block, component, scaffold]
  const types = fs.readdirSync(appTemplatePath(appPath)).filter((file) => fs.statSync(appTemplatePath(appPath, file)).isDirectory()
  );

  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    // 生成blocks\components\scaffolds文件夹 以及示例demo
    /* eslint-disable-next-line no-await-in-loop */
    await generate({
      src: appTemplatePath(appPath, type),
      dest: path.join(appPath, `${type}s/Example${uppercamelcase(type)}`),
      name: `example-${type}`,
      npmName: `${pkg.name}-example-${type}`,
      version: '1.0.0',
      title: `demo ${type}`,
      description: '示例',
      skipGitIgnore: true,
      categories: {},
    });
  }
}

/**
 * 下载完成后的提示信息
 * @param {string} appPath
 * @param {string} appName
 */
function completedMessage(appPath, appName) {
  console.log();
  console.log(`Success! Created ${appName} at ${appPath}`);
  console.log('Inside that directory, you can run several commands:');
  console.log();
  console.log('  Install dependencies');
  console.log(chalk.cyan('    npm install'));
  console.log();
  console.log('  Starts the block development server.');
  console.log(chalk.cyan('    cd blocks/ExampleBlock'));
  console.log(chalk.cyan('    npm install'));
  console.log(chalk.cyan('    npm start'));
  console.log();
  console.log('  Starts the scaffold development server.');
  console.log(chalk.cyan('    cd scaffolds/ExampleScaffold'));
  console.log(chalk.cyan('    npm install'));
  console.log(chalk.cyan('    npm start'));
  console.log();
  console.log('  Generate materials json.');
  console.log(chalk.cyan('    npm run generate'));
  console.log();
  console.log(
    '  You can upload the JSON file to a static web server and put the URL at Iceworks settings panel.'
  );
  console.log('  You will see your materials in Iceworks');
  console.log();
  console.log('  We suggest that you can sync the materials json to fusion or unpkg by run: ');
  console.log(`${chalk.cyan('    npm run sync')}  or  ${chalk.cyan('npm run sync-unpkg')}`);
  console.log();
  console.log('Happy hacking!');
}
