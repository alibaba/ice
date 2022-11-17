import { execaCommand } from 'execa';
import chalk from 'chalk';
import getPackages from './getPackages';

(async () => {
  const { packageDirs } = await getPackages();
  packageDirs.forEach((pkgDir) => {
    execaCommand(`dependency-check ${pkgDir} --missing`, {
      cwd: pkgDir,
      stdio: 'inherit',
    });
  });
})().catch((e) => {
  console.log(chalk.red('\n ⚠️  ⚠️  ⚠️  依赖检查失败\n\n'), e);
  process.exit(128);
});
