import * as ora from 'ora';
import {
  isAliNpm, getNpmTarball, getAndExtractTarball, log,
} from 'ice-npm-utils';
import formatProject from './fommatProject';
import checkEmpty from './checkEmpty';

export {
  formatProject,
  checkEmpty,
};

export async function downloadAndGenerateProject(
  projectDir: string, npmName: string, version?: string, registry?: string
): Promise<void> {
  registry = registry || await getNpmRegistry(npmName);
  const tarballURL = await getNpmTarball(npmName, version || 'latest', registry);

  log.verbose('download tarballURL', tarballURL);

  const spinner = ora(`download npm tarball start`).start();
  await getAndExtractTarball(
    projectDir,
    tarballURL,
    (state) => {
      spinner.text = `download npm tarball progress: ${Math.floor(state.percent*100)}%`;
    },
    formatFilename,
  );
  spinner.succeed('download npm tarball successfully.');

  try {
    await formatProject(projectDir);
  } catch (err) {
    log.warn('', 'formatProject error');
    console.log(err);
  }
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
    '_prettierrc.js',
    '_prettierignore',
  ];
  if (dotFilenames.indexOf(filename) !== -1) {
    // _eslintrc.js -> .eslintrc.js
    filename = filename.replace(/^_/, '.');
  }

  return filename;
}
