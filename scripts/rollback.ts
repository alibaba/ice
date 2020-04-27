import * as execa from 'execa';
import getPackages from './fn/getPackages';

// eslint-disable-next-line
const chalk = require('chalk');

(async () => {
  const { packageNames } = await getPackages();
  const args = process.argv;
  const rollbackVersion = args[2];
  packageNames.forEach((packageName) => {
    console.log(`rollback: ${packageName}@${rollbackVersion}`);
    execa.commandSync(`npm dist-tags add ${packageName}@${rollbackVersion} latest`, {
      stdio: 'inherit'
    });
    console.log();
  });
})().catch((e) => {
  console.log(chalk.red('\n ⚠️  ⚠️  ⚠️  rollback failed\n\n'), e);
  process.exit(128);
});
