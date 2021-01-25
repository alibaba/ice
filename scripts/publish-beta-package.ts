/**
 * Scripts to check unpublished version and run publish
 */
import * as path from 'path';
import * as fs from 'fs-extra';
import { spawnSync } from 'child_process';
import { setPublishedPackages } from './published-info';
import { IPackageInfo, getPackageInfos, getVersionPrefix } from './getPackageInfos';

const BETA_REG = /([^-]+)-beta\.(\d+)/; // '1.0.0-beta.1'

interface IBetaPackageInfo extends IPackageInfo {
  betaVersion: string;
}

function getBetaVersionInfo(packageInfo: IPackageInfo): IBetaPackageInfo {
  const { name, localVersion } = packageInfo;

  let version = localVersion;

  if (!BETA_REG.test(localVersion)) {
    // Add beta version
    let betaVersion = 1;
    const childProcess = spawnSync('npm', [
      'show', name, 'dist-tags',
      '--json',
    ], {
      encoding: 'utf-8'
    });
    const distTags = JSON.parse(childProcess.stdout) || {};
    const matched = (distTags.beta || '').match(BETA_REG);

    // 1.0.0-beta.1 -> ["1.0.0-beta.1", "1.0.0", "1"] -> 1.0.0-beta.2
    if (matched && matched[1] === localVersion && matched[2]) {
      betaVersion = Number(matched[2]) + 1;
    }
    version += `-beta.${betaVersion}`;
  }

  return Object.assign({}, packageInfo, { betaVersion: version });
}

function updatePackageJson(betaPackageInfos: IBetaPackageInfo[]): void {
  betaPackageInfos.forEach((betaPackageInfo: IBetaPackageInfo) => {
    const { directory, betaVersion } = betaPackageInfo;

    const packageFile = path.join(directory, 'package.json');
    const packageData = fs.readJsonSync(packageFile);

    packageData.version = betaVersion;

    for (let i = 0; i < betaPackageInfos.length; i++) {
      const dependenceName = betaPackageInfos[i].name;
      const dependenceVersion = betaPackageInfos[i].betaVersion;

      if (packageData.dependencies && packageData.dependencies[dependenceName]) {
        packageData.dependencies[dependenceName] = `${getVersionPrefix(packageData.dependencies[dependenceName])}${dependenceVersion}`;
      } else if (packageData.devDependencies && packageData.devDependencies[dependenceName]) {
        packageData.devDependencies[dependenceName] = `${getVersionPrefix(packageData.devDependencies[dependenceName])}${dependenceVersion}`;
      }
    }

    fs.writeFileSync(packageFile, JSON.stringify(packageData, null, 2));
  });
}

function publish(pkg: string, betaVersion: string, directory: string): void {

  console.log('[PUBLISH BETA]', `${pkg}@${betaVersion}`);
  spawnSync('npm', [
    'publish',
    '--tag=beta',
  ], {
    stdio: 'inherit',
    cwd: directory,
  });
}

// Entry
console.log('[PUBLISH BETA] Start:');
getPackageInfos().then((packageInfos: IPackageInfo[]) => {

  const shouldPublishPackages = packageInfos
    .filter(packageInfo => packageInfo.shouldPublish)
    .map(packageInfo => getBetaVersionInfo(packageInfo));

  updatePackageJson(shouldPublishPackages);

  // Publish
  let publishedCount = 0;
  const publishedPackages = [];
  shouldPublishPackages.forEach((packageInfo) => {
    const { name, directory, betaVersion } = packageInfo;
    publishedCount++;
    console.log(`--- ${name}@${betaVersion} ---`);
    publish(name, betaVersion, directory);
    publishedPackages.push(`${name}:${betaVersion}`);
  });

  console.log(`[PUBLISH PACKAGE BETA] Complete (count=${publishedCount}):`);
  console.log(`${publishedPackages.join('\n')}`);
  setPublishedPackages(publishedPackages);
});
