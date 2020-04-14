import * as spawn from 'cross-spawn';
import getPackages from './fn/getPackages';

(async function () {
  const { packageNames } = await getPackages();
  const npmClient = 'tnpm';
  console.log('syncing packages...');
  spawn.sync(npmClient, ['sync', ...packageNames], { stdio: 'inherit' });
})();
