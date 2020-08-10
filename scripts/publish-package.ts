/**
 * Scripts to check unpublished version and run publish
 */
import { spawnSync } from 'child_process';
import { setPublishedPackages } from './published-info';
import { IPackageInfo, getPackageInfos } from './getPackageInfos';

function publish(pkg: string, version: string, directory: string): void {
  console.log('[PUBLISH]', `${pkg}@${version}`);

  spawnSync('npm', [
    'publish',
    // use default registry
  ], {
    stdio: 'inherit',
    cwd: directory,
  });
}

// Entry
console.log('[PUBLISH] Start:');
getPackageInfos().then((packageInfos: IPackageInfo[]) => {
  // Publish
  let publishedCount = 0;
  const publishedPackages = [];
  for (let i = 0; i < packageInfos.length; i++) {
    const { name, directory, localVersion, shouldPublish } = packageInfos[i];
    if (shouldPublish) {
      publishedCount++;
      console.log(`--- ${name}@${localVersion} ---`);
      publish(name, localVersion, directory);
      publishedPackages.push(`${name}:${localVersion}`);
    }
  }
  console.log(`[PUBLISH PACKAGE PRODUCTION] Complete (count=${publishedCount}):`);
  console.log(`${publishedPackages.join('\n')}`);
  setPublishedPackages(publishedPackages);
});
