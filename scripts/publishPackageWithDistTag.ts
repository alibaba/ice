/**
 * Scripts to check unpublished version and run publish
 */
import path from 'path';
import fse from 'fs-extra';
import { spawnSync } from 'child_process';
import { setPublishedPackages } from './publishedInfo';
import { getPackageInfos, getVersionPrefix } from './getPackageInfos';
import type { IPackageInfo } from './getPackageInfos';

const PUBLISH_TYPE = process.env.PUBLISH_TYPE || 'beta';
const VERSION_PREFIX = process.env.VERSION_PREFIX || PUBLISH_TYPE;
const DIST_TAG_REG = new RegExp(`([^-]+)-${VERSION_PREFIX}\\.(\\d+)`);

interface ITagPackageInfo extends IPackageInfo {
  distTagVersion: string;
}

const publishTag = process.env.PUBLISH_TAG || '';
function getVersionInfo(packageInfo: IPackageInfo, tag: string): ITagPackageInfo {
  const { name, localVersion } = packageInfo;

  let version = localVersion;

  if (!DIST_TAG_REG.test(localVersion)) {
    let distTagVersion = 1;
    const childProcess = spawnSync('npm', [
      'show', name, 'dist-tags',
      '--json',
    ], {
      encoding: 'utf-8',
    });

    let distTags = {};
    try {
      distTags = JSON.parse(childProcess.stdout) || {};
    // eslint-disable-next-line no-empty
    } catch (err) {}
    const matched = (distTags[tag] || '').match(DIST_TAG_REG);

    // 1.0.0-beta.1 -> ["1.0.0-beta.1", "1.0.0", "1"] -> 1.0.0-beta.2
    if (matched && matched[1] === localVersion && matched[2]) {
      distTagVersion = Number(matched[2]) + 1;
    }
    version += `-${VERSION_PREFIX}.${distTagVersion}`;
  }

  return Object.assign({}, packageInfo, { distTagVersion: version });
}

function updatePackageJson(packageInfos: ITagPackageInfo[]): void {
  packageInfos.forEach((packageInfo: ITagPackageInfo) => {
    const { directory, distTagVersion } = packageInfo;

    const packageFile = path.join(directory, 'package.json');
    const packageData = fse.readJsonSync(packageFile);

    packageData.version = distTagVersion;

    for (let i = 0; i < packageInfos.length; i++) {
      const dependenceName = packageInfos[i].name;
      const dependenceVersion = packageInfos[i].distTagVersion;

      if (packageData.dependencies && packageData.dependencies[dependenceName]) {
        packageData.dependencies[dependenceName] = `${getVersionPrefix(packageData.dependencies[dependenceName])}${dependenceVersion}`;
      } else if (packageData.devDependencies && packageData.devDependencies[dependenceName]) {
        packageData.devDependencies[dependenceName] = `${getVersionPrefix(packageData.devDependencies[dependenceName])}${dependenceVersion}`;
      }
    }

    fse.writeFileSync(packageFile, JSON.stringify(packageData, null, 2));
  });
}

function publish(pkg: string, distTagVersion: string, directory: string, tag: string): void {
  console.log(`[PUBLISH ${tag.toUpperCase()}]`, `${pkg}@${distTagVersion}`);
  spawnSync('npm', [
    'publish',
    `--tag=${tag}`,
  ], {
    stdio: 'inherit',
    cwd: directory,
  });
}

// Entry
console.log(`[PUBLISH ${PUBLISH_TYPE.toUpperCase()}] Start:`);
getPackageInfos(publishTag).then((packageInfos: IPackageInfo[]) => {
  const shouldPublishPackages = packageInfos
    .filter(packageInfo => packageInfo.shouldPublish)
    .map(packageInfo => getVersionInfo(packageInfo, PUBLISH_TYPE));

  updatePackageJson(shouldPublishPackages);

  // Publish
  let publishedCount = 0;
  const publishedPackages = [];
  shouldPublishPackages.forEach((packageInfo) => {
    const { name, directory, distTagVersion } = packageInfo;
    publishedCount++;
    console.log(`--- ${name}@${distTagVersion} ---`);
    publish(name, distTagVersion, directory, PUBLISH_TYPE);
    publishedPackages.push(`${name}:${distTagVersion}`);
  });

  console.log(`[PUBLISH PACKAGE ${PUBLISH_TYPE.toUpperCase()}] Complete (count=${publishedCount}):`);
  console.log(`${publishedPackages.join('\n')}`);
  setPublishedPackages(publishedPackages);
});
