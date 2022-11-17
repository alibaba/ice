/* eslint no-restricted-syntax:0, no-await-in-loop:0, no-restricted-syntax:0 */
import path from 'path';
import fse from 'fs-extra';
import glob from 'glob';

export default async function getPackages() {
  const packageNames = [];
  const packageDirs = [];
  const rootPkgPath = path.join(process.cwd(), 'package.json');
  const rootPkgContent = fse.readJSONSync(rootPkgPath);

  for (const workspace of rootPkgContent.workspaces || []) {
    const dirs = glob.sync(workspace);
    for (const dir of dirs) {
      if (fse.existsSync(path.resolve(dir, 'package.json'))) {
        const pkgContent = fse.readJSONSync(path.resolve(dir, 'package.json'));
        packageNames.push(pkgContent.name);
        packageDirs.push(path.resolve(dir));
      } else {
        console.warn('Invalid workspace package:', dir);
      }
    }
  }

  return { packageNames, packageDirs };
}
