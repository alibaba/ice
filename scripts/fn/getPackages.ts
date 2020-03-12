
import * as path from 'path'
import * as fse from 'fs-extra'
import * as _glob from 'glob'
import * as pify from 'pify'

const glob = pify(_glob)

export default async function getPackages() {
  const packageNames = []
  const packageDirs = []
  const rootPkgPath = path.join(__dirname, '../../package.json');
  const rootPkgContent = fse.readJSONSync(rootPkgPath);

  for (const workspace of rootPkgContent.workspaces || []) {
    const dirs = await glob(workspace)
    for (const dir of dirs) {
      if (fse.existsSync(path.resolve(dir, 'package.json'))) {
        const pkgContent = fse.readJSONSync(path.resolve(dir, 'package.json'))
        packageNames.push(pkgContent.name)
        packageDirs.push(path.resolve(dir))
      } else {
        console.warn('Invalid workspace package:', dir)
      }
    }
  }

  return { packageNames, packageDirs }
}
