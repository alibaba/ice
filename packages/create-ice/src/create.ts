import inquirer from 'inquirer';
import fs from 'fs-extra';
import chalk from 'chalk';
import { checkAliInternal } from 'ice-npm-utils';
import { downloadAndGenerateProject, checkEmpty } from '@iceworks/generate-project';

interface ITemplate {
  npmName: string;
  description?: string;
}
interface EjsOptions {
  iceConfig?: Record<string, any>;
  appConfig?: Record<string, any>;
  esLintConfigOptions?: string;
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
        'The existing file in the current directory. Are you sure to continue?',
      default: false,
    });
    if (!go) process.exit(1);
  }

  let ejsOptions: EjsOptions = {
    appConfig: null,
  };
  let extraDependencies: Record<string, any> = {};

  const isAliInternal = await checkAliInternal();
  if (isAliInternal) {
    ejsOptions = {
      ...ejsOptions,
      iceConfig: {
        importDeclarationsStr: 'import def from \'@ali/ice-plugin-def\';\n',
        options: {
          pluginItemsStr: 'def(),',
        },
        optionsStr: `plugins: [
          def(),
        ],`,
      },
      esLintConfigOptions: `{
        extends: ['@ali/eslint-config-att/typescript/react']
      }`,
    };

    extraDependencies = {
      ...extraDependencies,
      devDependencies: {
        ...extraDependencies?.devDependencies || {},
        '@ali/eslint-config-att': '^1.0.0',
        '@ali/ice-plugin-def': '^1.0.0',
      },
    };
  }
  await downloadAndGenerateProject(
    dirPath,
    templateName,
    {
      ejsOptions,
      extraDependencies,
    },
  );

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
  const templates: ITemplate[] = [
    {
      npmName: '@ice/lite-scaffold',
      description: 'Web Lite Scaffold',
    },
    {
      npmName: '@ice/antd-pro-scaffold',
      description: 'Antd Pro Scaffold',
    },
    {
      npmName: '@ice/fusion-pro-scaffold',
      description: 'Fusion Pro Scaffold',
    },
    {
      npmName: '@ice/miniapp-scaffold',
      description: 'Miniapp Scaffold',
    },
  ];
  const defaultTemplate = templates[0];

  const answer = await inquirer.prompt({
    type: 'list',
    name: 'template',
    loop: false,
    message: 'Please select a template',
    default: defaultTemplate,
    choices: templates.map(item => {
      return {
        name: item.description,
        value: item.npmName,
      };
    }),
  });

  return answer.template;
}
