import * as execa from 'execa';
import getPackages from './fn/getPackages';

// eslint-disable-next-line
const chalk = require('chalk');

(async () => {
  const { packageDirs } = await getPackages();
  packageDirs.forEach((pkgDir) => {
    execa.commandSync(`dependency-check ${pkgDir} --missing`, {
      cwd: pkgDir,
      stdio: 'inherit'
    });
  });
})().catch((e) => {
  console.log(chalk.red(`\n ⚠️  ⚠️  ⚠️  依赖检查失败\n\n`), e);
  process.exit(128);
});
