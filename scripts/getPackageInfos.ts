import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { getNpmInfo } from 'ice-npm-utils';
import semver from 'semver';

const TARGET_DIRECTORY = join(process.cwd(), 'packages');

export interface IPackageInfo {
  name: string;
  directory: string;
  localVersion: string;
  publishVersion: string;
  mainFile: string; // package.json main file
  shouldPublish: boolean;
  packageInfo: {
    [key: string]: any;
  };
}

function checkBuildSuccess(directory: string, mainFile: string): boolean {
  const isExist = existsSync(join(directory, mainFile));
  if (!isExist) {
    throw new Error(`build failed directory ${directory} do not exist main file`);
  }
  return isExist;
}

async function checkVersionExists(pkg: string, version: string, distTag: string): Promise<boolean> {
  const tag = distTag || 'latest';
  return getNpmInfo(pkg).then((data) => {
    if (!data['dist-tags'] || (!data['dist-tags'][tag] && !data['dist-tags'].latest)) {
      console.error(`${pkg} 没有 ${tag} 和 latest 版本号`, data);
      return Promise.reject(new Error('Error: 没有版本号信息'));
    }
    // 如果该 tag 未发布，用 latest
    return data['dist-tags'][tag] || data['dist-tags'].latest;
  }).then((tagVersion) => version === tagVersion).catch(() => false);
}

export function getVersionPrefix(version): string {
  return isNaN(version[0]) ? version[0] : '';
}

export async function getPackageInfos(distTag = ''): Promise<IPackageInfo[]> {
  const packageInfos: IPackageInfo[] = [];
  if (!existsSync(TARGET_DIRECTORY)) {
    console.log(`[ERROR] Directory ${TARGET_DIRECTORY} not exist!`);
  } else {
    const packageFolders: string[] = readdirSync(TARGET_DIRECTORY)
      .filter((filename) => filename[0] !== '.')
      .map((packageFolder) => join(TARGET_DIRECTORY, packageFolder));
    console.log('[PUBLISH] Start check with following packages:');
    await Promise.all(packageFolders.map(async (packageFolder) => {
      const packageInfoPath = join(packageFolder, 'package.json');
      // Process package info.
      if (existsSync(packageInfoPath)) {
        const packageInfo = JSON.parse(readFileSync(packageInfoPath, 'utf8'));
        const packageName = packageInfo.name;
        const publishVersion = semver.valid(semver.coerce(packageInfo.version));
        console.log(`- ${packageName}`);

        try {
          packageInfos.push({
            name: packageName,
            directory: packageFolder,
            localVersion: packageInfo.version,
            publishVersion,
            mainFile: packageInfo.main,
            packageInfo,
            // If localVersion not exist, publish it
            shouldPublish:
              checkBuildSuccess(packageFolder, packageInfo.main ?? 'index.js') &&
              !await checkVersionExists(packageName, publishVersion, distTag),
          });
        } catch (e) {
          console.log(`[ERROR] get ${packageName} information failed: `, e);
        }
      } else {
        console.log(`[ERROR] ${packageFolder}'s package.json not found.`);
      }
    }));
  }
  return packageInfos;
}
