const inquirer = require('inquirer');
const chalk = require('chalk');
const formatProject = require('../lib/formatProject');
const log = require('../lib/log');
const goldlog = require('../lib/glodlog');
const checkEmpty = require('../lib/checkEmpty');
const downloadNpm = require('../lib/downloadNpm');
const packageConfig = require('../package.json');

module.exports = (...args) => {
  return init(...args).catch((err) => {
    log.error('init error');
    console.error(err);
    process.exit(1);
  });
};


async function init(options = {}) {
  const cwd = process.cwd();
  const go = await checkEmpty(cwd);
  if (!go) process.exit(1);

  let { template } = options;
  if (!options.template) {
    template = await selectTemplate();
  }

  goldlog('version', { version: packageConfig.version });
  goldlog('init', { template });

  await downloadNpm({ npmName: template, destDir: cwd });

  try {
    await formatProject(cwd);
  } catch (err) {
    log.warn('formatProject error');
    console.error(err);
  }

  console.log();
  console.log('Initialize project successfully.');
  console.log();
  console.log('Starts the development server.');
  console.log();
  console.log(chalk.cyan('    npm install'));
  console.log(chalk.cyan('    npm start'));
  console.log();
}

async function selectTemplate() {
  const DEFAULT_TEMPLATE = '@icedesign/lite-scaffold';
  return inquirer
    .prompt({
      type: 'list',
      name: 'template',
      message: 'Please select a template',
      default: DEFAULT_TEMPLATE,
      choices: [
        {
          name: 'Lite template，A lightweight and simple template.',
          value: DEFAULT_TEMPLATE,
        },
        {
          name: 'TypeScript template，Built-in support for TypeScript.',
          value: '@icedesign/ts-scaffold',
        },
        {
          name:
            'Pro template，Integrated rich features such as charts, lists, forms, etc.',
          value: '@icedesign/pro-scaffold',
        },
      ],
    })
    .then((answer) => answer.template);
}
