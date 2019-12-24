/**
 * material add [block|component|scaffold]:
 *  1. get options by materialType
 *  2. 仅 component: add rax options & adaptor
 *  3. copy and ejsRender，文件名称转换：
 *    - _package.json -> package.json
 *    - xxx.js.ejs -> xxx.js
 *    - _eslintxxx -> .eslintxxx (scaffold 不转换)
 *  4. 仅 component：remove eslint 相关文件，只有 component/scaffold 会有这些文件（因为有单独开发的需求）
 *
 * init component:
 *  1. get options by materialType
 *  2. add rax options & adaptor
 *  3. copy and ejsRender，文件名称转换
 *
 */
const path = require('path');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const decamelize = require('decamelize');
const validateName = require('validate-npm-package-name');
const uppercamelcase = require('uppercamelcase');
const { isAliNpm } = require('ice-npm-utils');
const log = require('../../lib/log');
const ejsRenderDir = require('./ejsRenderDir');
const generateNpmName = require('./generateNpmName');

module.exports = async function({
  materialDir,
  cwd,
  useDefaultOptions,
  npmScope,
  materialType,
  projectType,
}) {
  log.verbose('addSingleMaterial args', materialDir, cwd, useDefaultOptions, npmScope, materialType);

  const materialPath = path.join(materialDir, 'template', materialType);
  if (!fse.existsSync(materialPath)) {
    log.warn(`当前物料模板不存在 ${materialType} 类型的物料`);
    return;
  }

  const questions = getQuestions(npmScope, cwd)[materialType];
  let options = {};

  if (useDefaultOptions) {
    // inquire
    questions.forEach((item) => {
      options[item.name] = item.default;
    });
  } else {
    options = await inquirer.prompt(questions);
  }

  // @ali
  options.npmScope = npmScope;
  // TestComponent
  options.className = options.name;
  // test-component
  options.kebabCaseName = decamelize(options.name, '-');
  // @ali/test-component
  options.npmName = generateNpmName(options.name, npmScope);

  if (materialType === 'component') {
    options = Object.assign({}, options, {
      // 补全 rax 组件的几个字段
      projectName: options.npmName,
      projectAuthor: 'rax',
      projectTargets: ['web'],
      projectFeatures: [],
    });
  }

  log.verbose('addSingleMaterial options', options);

  const targetPath = projectType === 'material' ? path.join(cwd, `${materialType}s`, options.name) : cwd;

  await fse.ensureDir(targetPath);
  await fse.copy(materialPath, targetPath);

  if (materialType === 'component') {
    if (options.adaptor) {
      const templatePath = path.join(__dirname, '../../template/componentAdaptor');
      await fse.copy(templatePath, targetPath);
    }
  }

  // render ejs
  await ejsRenderDir(
    targetPath,
    options,
    // scaffold 不将 _eslintxxx 转换成 .eslintxxx
    materialType === 'scaffold',
  );

  if (isAliNpm(options.npmName)) {
    // 追加 publishConfig
    const pkgPath = path.join(targetPath, 'package.json');
    const pkgData = await fse.readJson(pkgPath);
    pkgData.publishConfig = {
      registry: 'https://registry.npm.alibaba-inc.com',
    };
    await fse.writeJson(pkgPath, pkgData, { spaces: 2 });
  }

  if (materialType === 'component' && projectType === 'material') {
    // 组件有单独开发的链路，有自己的 eslint 文件，在物料集合场景下需要删除掉
    await Promise.all([
      '.eslintignore',
      '.eslintrc.js',
      '.gitignore',
      '.stylelintignore',
      '.stylelintrc.js',
    ].map((filename) => {
      return fse.remove(path.join(targetPath, filename));
    }));
  }
};

const COMPONENT_CATEGORIES = [
  'Table',
  'Form',
  'Chart',
  'List',
  'Modal',
  'Filter',
  'DataDisplay',
  'Information',
  'Others',
];

const BLOCK_CATEGORIES = [
  'Table',
  'Form',
  'Chart',
  'List',
  'Modal',
  'Filter',
  'DataDisplay',
  'Information',
  'Exception',
  'Landing',
  'video',
  'Others',
];


const SCAFFOLD_CATEGORIES = [
  'Basic',
  'Pro',
  'Others',
];

function nameQuestion(type, npmScope, cwd) {
  const defaultName = `Example${uppercamelcase(type)}`;
  return {
    type: 'input',
    name: 'name',
    message: `${type} name`,
    default: defaultName,
    validate: (value) => {
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
        return `Name must be a Upper Camel Case word, e.g. Example${uppercamelcase(type)}.`;
      }
      if (fse.existsSync(path.join(cwd, `${type}s`, value))) {
        return `${value} is exist, please try another name.`;
      }

      const npmName = generateNpmName(value, npmScope);
      if (!validateName(npmName).validForNewPackages) {
        return `this ${type} name(${npmName}) has already exist. please retry`;
      }
      return true;
    },
  };
}

function getQuestions(npmScope, cwd) {
  return {
    component: [
      {
        type: 'confirm',
        name: 'adaptor',
        message: '组件是否需要接入 Fusion Cool & 设计板块？',
        default: false,
      },
      nameQuestion('component', npmScope, cwd),
      {
        type: 'input',
        name: 'title',
        message: 'title',
        default: 'demo component',
        validate: (value) => {
          if (!value) {
            return 'title cannot be empty';
          }
          return true;
        },
        filter(value) {
          return value.trim();
        },
      },
      {
        type: 'string',
        required: true,
        name: 'version',
        message: 'version',
        default: '1.0.0',
      },
      {
        type: 'string',
        required: true,
        name: 'description',
        message: 'description',
        default: 'intro component',
        filter(value) {
          return value.trim();
        },
        validate: (value) => {
          if (!value) {
            return 'description cannot be empty';
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'category',
        message: 'category',
        default: 'Information',
        choices: COMPONENT_CATEGORIES,
        filter: (answer) => {
          return answer;
        },
      },
    ],
    block: [
      nameQuestion('block', npmScope, cwd),
      {
        type: 'input',
        name: 'title',
        message: 'title',
        default: 'demo block',
        filter(value) {
          return value.trim();
        },
        validate: (value) => {
          if (!value) {
            return 'title cannot be empty';
          }
          return true;
        },
      },
      {
        type: 'string',
        required: true,
        name: 'version',
        message: 'version',
        default: '0.1.0',
      },
      {
        type: 'string',
        required: true,
        name: 'description',
        message: 'description',
        default: 'intro block',
        filter(value) {
          return value.trim();
        },
        validate: (value) => {
          if (!value) {
            return 'description cannot be empty';
          }
          return true;
        },
      },
      {
        type: 'list',
        message: 'category',
        name: 'category',
        default: 'Information',
        choices: BLOCK_CATEGORIES,
        validate: (answer) => {
          if (answer.length < 1) {
            return 'It must be at least one';
          }
          return true;
        },
        filter: (answer) => {
          return answer;
        },
      },
    ],
    scaffold: [
      nameQuestion('scaffold', npmScope, cwd),
      {
        type: 'input',
        name: 'title',
        message: 'title',
        default: 'demo scaffold',
        filter(value) {
          return value.trim();
        },
        validate: (value) => {
          if (!value) {
            return 'title cannot be empty';
          }
          return true;
        },
      },
      {
        type: 'string',
        required: true,
        name: 'version',
        message: 'version',
        default: '0.1.0',
      },
      {
        type: 'string',
        required: true,
        name: 'description',
        message: 'description',
        default: 'intro scaffold',
        filter(value) {
          return value.trim();
        },
        validate: (value) => {
          if (!value) {
            return 'description cannot be empty';
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'category',
        message: 'category',
        default: 'Basic',
        choices: SCAFFOLD_CATEGORIES,
        filter: (answer) => {
          return answer;
        },
      },
    ],
  };
}
