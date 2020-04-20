/* eslint @typescript-eslint/no-var-requires:0 */
import { join } from 'path';
import * as execa from 'execa';
import * as fse from 'fs-extra';
import { run } from './fn/shell';
import getPackages from './fn/getPackages';

const chalk = require('chalk');
const gitP = require('simple-git/promise');

async function publish() {
  log('1. ✔️ ✔️ ✔️  Checking the working tree status...');
  // const gitStatus = await run('git status --porcelain');
  const status = await gitP().status();
  if (status.modified.length) {
    console.log(chalk.red('   ⚠️  ⚠️  ⚠️  Local file changes are not allowed to publish...\n'));
    process.exit(0);
  }

  const { stdout } = execa.commandSync('lerna changed');
  const needsPublishPackages = stdout.split('\n') || [];
  if (!needsPublishPackages.length) {
    console.log(chalk.red('   ⚠️  ⚠️  ⚠️  No packages to publish...\n'));
    process.exit(0);
  }

  log('2. 📦 📦 📦 Building packages...');
  await run('npm run build');

  log('3. ⚡ ⚡ ⚡ Update package version automatically...');
  await run('lerna version  --force-publish --exact --no-commit-hooks --no-git-tag-version');

  // Note：
  // cannot use lerna publish
  // because lerna publish will not update version
  log('4. 🚀 🚀 🚀 Start publishing...');
  const { version: newVersion } = fse.readJsonSync(join(__dirname, '../lerna.json'));
  const isLatestVersion = !((newVersion.includes('rc') || newVersion.includes('alpha') || newVersion.includes('beta')));
  const { packageDirs } = await getPackages();
  packageDirs.forEach((pkgDir) => {
    // eslint-disable-next-line
    const pkgContent = require(join(pkgDir, 'package.json'));
    const { name, version } = pkgContent;
    if (needsPublishPackages.includes(name)) {
      console.log(`📦 📦 📦 开始发布 ${name}@${version}`);
      const publishArgs = isLatestVersion ? 'publish' : 'publish --tag=beta';
      execa.commandSync(`npm ${publishArgs}`, {
        cwd: pkgDir,
        stdio: 'inherit'
      });
    }
  });

  log(`5. 🔖 🔖 🔖 Commit changes...`);
  await run(`git commit --all -m v${newVersion}`);
  await run('git push');

  log(`\n\n 🎉 🎉 🎉 Published successfully...`);

  log('6. 💡 💡 💡 Start syncing...');
  await run('npm run sync');
}

function log(msg) {
  console.log(chalk.yellow(`\n ${msg} \n`));
}

(async() => {
  try {
    await publish();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
