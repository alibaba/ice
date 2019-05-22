import { getNpmPackageVersionData } from './getNpmPacakge';
import { IMaterialSource } from '../../interface';

export default async (source: IMaterialSource, iceVersion: string): Promise<string> => {
  let version: string = source.version;

  // TODO special material logic
  if (iceVersion === '1.x') {
    version = source['version-0.x'] || source.version;
  }

  // TODO use registry by user settings
  const registry = 'https://registry.npm.taobao.org';

  const packageData = await getNpmPackageVersionData({
    name: source.npm,
    version,
    registry,
  });

  return packageData.dist.tarball;
};