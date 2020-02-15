import * as inquirer from 'inquirer';
import * as fs from 'fs-extra';
import chalk from 'chalk';
import { downloadAndGenerateProject, checkEmpty } from '@iceworks/generate-project';

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

  console.log();
  console.log('Initialize project successfully.');
  console.log();
  console.log('Starts the development server.');
  console.log();
  console.log(chalk.cyan(`    cd ${dirname}`));
  console.log(chalk.cyan('    npm install'));
  console.log(chalk.cyan('    npm start'));
  console.log();
}

/**
 * 选择使用的模板
 *
 * @param {String} type project|material|component
 */
async function selectTemplate(): Promise<string> {
  const templates: ITemplate[] = [{
    npmName: '@alifd/scaffold-lite',
    description: 'A lightweight TypeScript template.',
  }, {
    npmName: '@alifd/scaffold-lite-js',
    description: 'A lightweight JavaScript template.',
  }, {
    npmName: '@alifd/fusion-design-pro',
    description: 'Pro TypeScript template，Integrated rich features such as charts, lists, forms, etc.',
  }, {
    npmName: '@alifd/fusion-design-pro-js',
    description: 'Pro JavaScript template，Integrated rich features such as charts, lists, forms, etc.',
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
