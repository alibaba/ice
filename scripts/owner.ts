/**
 * npm run owner -- add sobear
 * npm run owner -- rm sobear
 * npm run owner -- ls
 */
import * as spawn from 'cross-spawn';
import getPackages from './fn/getPackages';

(async function () {
  const args = process.argv;
  const action = args[2];
  const name = args[3];
  const { packageNames }  = await getPackages();

  // eslint-disable-next-line
  for(const packageName of packageNames) {
    // https://www.npmjs.cn/cli/owner/
    const params = action === 'ls' ? ['owner', action, packageName] : ['owner', action, name, packageName];
    console.log(`\nnpm owner ${action} ${name || ''} ${packageName}`);
    spawn.sync('npm', params, { stdio: 'inherit' });
    console.log('added successfully...');
  }
})();
