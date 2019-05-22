import request from 'request-promise-native';
import * as semver from 'semver';

export interface INpmPackageParams {
  name: string;
  registry: string;
}

export interface INpmPackageVersionParams {
  name: string;
  version: string;
  registry: string;
}

/**
 * Get NPM pacakge information
 */
const getNpmPackageData = async (params: INpmPackageParams): Promise<any> => {
  const { registry, name } = params;
  return await request({
    url: `${registry}/${name.replace(/\//g, '%2f')}`,
    json: true,
    timeout: 5000,
  });
}

export const getNpmPackageVersionData = async (params: INpmPackageVersionParams) => {
  const packageData = await getNpmPackageData(params);

  let version = params.version || 'latest';
  if (!semver.valid(version)) {
    version = packageData['dist-tags'][version];
  }

  if (semver.valid(version) && packageData && packageData.versions && packageData.versions[version]) {
    return packageData.versions[version];
  } else {
    throw new Error(`${name}@${version} 尚未发布在 ${params.registry}`);
  }
}

export default getNpmPackageData;