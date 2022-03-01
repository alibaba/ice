import path from 'path';
import fse from 'fs-extra';
import semver from 'semver';
import type { IPackageInfo } from './getPackageInfos';
import { getPackageInfos, getVersionPrefix } from './getPackageInfos';

console.log('[VERSION] tag versions');

function updatePackageVersion(publishPackages: IPackageInfo[]) {
  publishPackages.forEach((publishPackage: IPackageInfo) => {
    const { directory, packageInfo, publishVersion, name } = publishPackage;
    packageInfo.version = publishVersion;
    // update package version depend on publish package
    for (let i = 0; i < publishPackages.length; i++) {
      const dependenceName = publishPackages[i].name;
      const dependenceVersion = publishPackages[i].publishVersion;

      if (packageInfo.dependencies && packageInfo.dependencies[dependenceName]) {
        packageInfo.dependencies[dependenceName] = `${getVersionPrefix(packageInfo.dependencies[dependenceName])}${dependenceVersion}`;
      } else if (packageInfo.devDependencies && packageInfo.devDependencies[dependenceName]) {
        if (!semver.satisfies(dependenceVersion, packageInfo.devDependencies[dependenceName])) {
          packageInfo.devDependencies[dependenceName] = `${getVersionPrefix(packageInfo.devDependencies[dependenceName])}${dependenceVersion}`;
        }
      }
    }
    console.log(`[VERSION] update package ${name} with version ${publishVersion}`);
    fse.writeFileSync(path.join(directory, 'package.json'), JSON.stringify(packageInfo, null, 2));
  });
}

getPackageInfos().then((packageInfos: IPackageInfo[]) => {
  const shouldPublishPackages = packageInfos
    .filter((packageInfo) => packageInfo.shouldPublish);
  console.log('shouldPublishPackages', shouldPublishPackages);
  updatePackageVersion(shouldPublishPackages);
});
