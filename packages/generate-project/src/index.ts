import * as chalk from 'chalk';
import {
  isAliNpm, getNpmTarball, getAndExtractTarball, log,
} from 'ice-npm-utils';
import { formatProject } from './fommatProject';

export {
  formatProject,
};

export async function downloadAndGenerateProject(projectDir: string, npmName: string, registry?: string): Promise<void> {
  registry = registry || await getNpmRegistry(npmName);
  const tarballURL = await getNpmTarball(npmName, 'latest', registry);

  log.verbose('download tarballURL', tarballURL);

  await getAndExtractTarball(
    projectDir,
    tarballURL,
    () => {},
    formatFilename,
  );

  try {
    await formatProject(projectDir);
  } catch (err) {
    log.warn('', 'formatProject error');
    console.log(err);
  }

  console.log();
  console.log('Initialize project successfully.');
  console.log();
  console.log('Starts the development server.');
  console.log();
  console.log(chalk.cyan('    npm install'));
  console.log(chalk.cyan('    npm start'));
  console.log();
};

async function getNpmRegistry(npmName: string): Promise<string> {
  if (process.env.REGISTRY) {
    return process.env.REGISTRY;
  } else if (isAliNpm(npmName)) {
    return 'https://registry.npm.alibaba-inc.com';
  } else {
    return 'https://registry.npm.taobao.org';
  }
}

/**
 * 下载 npm 后的文件名处理
 */
function formatFilename(filename) {
  // 只转换特定文件，防止误伤
  const dotFilenames = [
    '_eslintrc.js',
    '_eslintrc',
    '_eslintignore',
    '_gitignore',
    '_stylelintrc.js',
    '_stylelintrc',
    '_stylelintignore',
    '_editorconfig',
    '_prettierrc',
    '_prettierignore',
  ];
  if (dotFilenames.indexOf(filename) !== -1) {
    // _eslintrc.js -> .eslintrc.js
    filename = filename.replace(/^_/, '.');
  }

  return filename;
}
