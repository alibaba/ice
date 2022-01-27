import { execSync } from 'child_process';
import { ESLint } from 'eslint';
import chalk from 'chalk';

const GIT_DIFF = 'git diff --diff-filter=ACMR --name-only';

(async () => {
  const linter = new ESLint();

  // file level
  const fileList = execSync(GIT_DIFF).toString().split('\n');
  // ignore file which is not js/jsx/ts/tsx
  const lintFileList = (await Promise.all(fileList
    .map(async (file) => !!file && (/\.(j|t)sx?$/g.test(file) && !(await linter.isPathIgnored(file)) && file))))
    .filter(Boolean);

  if (!lintFileList.length) {
    console.log(chalk.green('no file should be lint.'));
    return;
  }

  console.log(chalk.green(lintFileList.join('\n')));
  console.log();
  console.log(chalk.green('above file should be lint.'));
  const lintResults = await linter.lintFiles(lintFileList);
  const Formatter = await linter.loadFormatter();
  console.log(Formatter.format(lintResults));
})().catch((error) => {
  console.trace(error);
  process.exit(1);
});