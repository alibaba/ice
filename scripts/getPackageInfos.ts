import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { getLatestVersion } from 'ice-npm-utils';
import * as semver from 'semver';

const TARGET_DIRECTORY = join(__dirname, '../packages');

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

function checkVersionExists(pkg: string, version: string): Promise<boolean> {
  return getLatestVersion(pkg).then(latestVersion => version === latestVersion).catch(() => false);
}

export function getVersionPrefix(version): string {
  return isNaN(version[0]) ? version[0] : '';
}

export async function getPackageInfos(): Promise<IPackageInfo[]> {
  const packageInfos: IPackageInfo[] = [];
  if (!existsSync(TARGET_DIRECTORY)) {
    console.log(`[ERROR] Directory ${TARGET_DIRECTORY} not exist!`);
  } else {
    const packageFolders: string[] = readdirSync(TARGET_DIRECTORY).filter((filename) => filename[0] !== '.');
    console.log('[PUBLISH] Start check with following packages:');
    await Promise.all(packageFolders.map(async (packageFolder) => {

      const directory = join(TARGET_DIRECTORY, packageFolder);
      const packageInfoPath = join(directory, 'package.json');

      // Process package info.
      if (existsSync(packageInfoPath)) {

        const packageInfo = JSON.parse(readFileSync(packageInfoPath, 'utf8'));
        const packageName = packageInfo.name || packageFolder;
        const publishVersion = semver.valid(semver.coerce(packageInfo.version));
        console.log(`- ${packageName}`);

        try {
          packageInfos.push({
            name: packageName,
            directory,
            localVersion: packageInfo.version,
            publishVersion,
            mainFile: packageInfo.main,
            packageInfo,
            // If localVersion not exist, publish it
            shouldPublish:
              checkBuildSuccess(directory, packageInfo.main) &&
              !await checkVersionExists(packageName, publishVersion)
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