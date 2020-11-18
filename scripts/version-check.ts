import * as semver from 'semver';
import { getPackageInfos, IPackageInfo } from './getPackageInfos';

function checkPackageVersion(publishPackages: IPackageInfo[]) {
  publishPackages.forEach((publishPackage: IPackageInfo) => {
    const { publishVersion, localVersion, name, packageInfo } = publishPackage;
    if (publishVersion !== localVersion) {
      throw new Error(`[ERROR] version of package ${name} is not valid local verison: ${localVersion}`);
    }

    for (let i = 0; i < publishPackages.length; i++) {
      const dependenceName = publishPackages[i].name;
      const dependenceVersion = publishPackages[i].publishVersion;

      if (packageInfo.dependencies && packageInfo.dependencies[dependenceName]) {
        if (!semver.satisfies(dependenceVersion, packageInfo.dependencies[dependenceName])) {
          throw new Error(`[ERROR] dependency ${dependenceName}${packageInfo.dependencies[dependenceName]} of package ${name} is not satisfied with verison ${dependenceVersion}`);
        }
      } else if (packageInfo.devDependencies && packageInfo.devDependencies[dependenceName]) {
        if (!semver.satisfies(dependenceVersion, packageInfo.devDependencies[dependenceName])) {
          throw new Error(`[ERROR] devDependency ${dependenceName}${packageInfo.devDependencies[dependenceName]} of package ${name} is not satisfied with verison ${dependenceVersion}`);
        }
      }
    }
  });
}

getPackageInfos().then((packageInfos: IPackageInfo[]) => {
  const shouldPublishPackages = packageInfos
    .filter(packageInfo => packageInfo.shouldPublish);
  checkPackageVersion(shouldPublishPackages);
  console.log('[VERSION] check successfully');
}).catch((e) => {
  console.trace(e.message);
  process.exit(128);
});