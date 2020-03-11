
/**
 * npm run owner -- add sobear
 * npm run owner -- rm sobear
 * npm run owner -- ls
 */
import * as spawn from 'cross-spawn'
import getPackages from './fn/getPackages';


(async function () {
  const args = process.argv;
  const action = args[2];
  const name = args[3];
  const { packageNames }  = await getPackages();

  // console.log(`npm owner ${action} ${name} to ${packageNames.join(',')}...`);

  packageNames.forEach((npmName) => {
    console.log(`\nnpm owner ${action} ${name || ''} ${npmName}: `);
    // https://www.npmjs.cn/cli/owner/
    const params = action === 'ls' ? ['owner', action, npmName] : ['owner', action, name, npmName];
    spawn.sync('npm', params, { stdio: 'inherit' })
  });

})()
