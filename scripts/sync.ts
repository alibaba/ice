import * as spawn from 'cross-spawn';
import getPackages from './fn/getPackages';

const MAIN_PACKAGE = 'ice.js';
function getWeights(name: string) {
  if (name === MAIN_PACKAGE) {
    return 2;
  } else if (name.includes('build-plugin')) {
    return 1;
  } else {
    return 0;
  }
}

(async function () {
  const { packageNames } = await getPackages();
  const npmClient = 'tnpm';
  console.log('syncing packages...');
  const sortedNames = packageNames.sort((a, b) => getWeights(a) - getWeights(b));
  console.log(sortedNames);
  spawn.sync(npmClient, ['sync', ...packageNames], { stdio: 'inherit' });
})();
