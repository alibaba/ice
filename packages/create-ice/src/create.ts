import * as inquirer from 'inquirer';
import * as fs from 'fs-extra';
import { checkAliInternal } from 'ice-npm-utils';
import { downloadAndGenerateProject, checkEmpty } from '@iceworks/generate-project';

// eslint-disable-next-line
const chalk = require('chalk');

interface ITemplate {
  npmName: string;
  description?: string;
}

export default async function create(dirPath: string, templateName: string, dirname: string): Promise<void> {
  if (!templateName) {
    templateName = await selectTemplate();
  }

  await fs.ensureDir(dirPath);
  const empty = await checkEmpty(dirPath);

  if (!empty) {
    const { go } = await inquirer.prompt({
      type: 'confirm',
      name: 'go',
      message:
        'The existing file in the current directory. Are you sure to continue ？',
      default: false,
    });
    if (!go) process.exit(1);
  }

  await downloadAndGenerateProject(dirPath, templateName);
  const isAliInternal = await checkAliInternal();

  console.log();
  console.log('Initialize project successfully.');
  console.log();
  console.log('Starts the development server.');
  console.log();
  console.log(chalk.cyan(`    cd ${dirname}`));
  
  if (isAliInternal) {
    console.log(chalk.cyan('    tnpm install'));
    console.log(chalk.cyan('    tnpm start'));
    console.log(chalk.cyan('Detected that you are an Alibaba user, DEF plugin has been added!'));
  } else {
    console.log(chalk.cyan('    npm install'));
    console.log(chalk.cyan('    npm start'));
  }

  console.log(chalk.cyan('\n\nWe have prepared develop toolkit for you. \nSee: https://marketplace.visualstudio.com/items?itemName=iceworks-team.iceworks'));
  console.log();
}

/**
 * 选择使用的模板
 *
 * @param {String} type project|material|component
 */
async function selectTemplate(): Promise<string> {
  const templates: ITemplate[] = [{
    npmName: '@alifd/scaffold-simple',
    description: 'Simple TypeScript template.',
  }, {
    npmName: '@alifd/scaffold-lite',
    description: 'Lightweight TypeScript template with fusion design components',
  }, {
    npmName: '@alifd/scaffold-lite-js',
    description: 'Lightweight JavaScript template with fusion design components',
  }, {
    npmName: '@alifd/fusion-design-pro',
    description: 'Fusion Design Pro TypeScript template.',
  }, {
    npmName: '@alifd/fusion-design-pro-js',
    description: 'Fusion Design Pro JavaScript template.',
  }, {
    npmName: '@miniprogram-materials/scaffolds-app-js',
    description: 'Lightweight JavaScript template with Mini Program.',
  }, {
    npmName: '@miniprogram-materials/scaffolds-app-ts',
    description: 'Lightweight TypeScript template with Mini Program.',
  }, {
    npmName: 'build-plugin-template',
    description: 'ice.js plugin development template.'
  }];
  const defaultTemplate = templates[0];

  const answer = await inquirer.prompt({
    type: 'list',
    name: 'template',
    message: 'Please select a template',
    default: defaultTemplate,
    choices: templates.map(item => {
      return {
        name: item.description,
        value: item.npmName,
      };
    })
  });

  return answer.template;
}
