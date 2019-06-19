import packageJSON from 'package-json';
import { IMaterialNpmSource } from '../interface';

export default async (source: IMaterialNpmSource, iceVersion?: string): Promise<string> => {
  let version: string = source.version;

  // TODO special material logic
  if (iceVersion === '1.x') {
    version = source['version-0.x'] || source.version;
  }

  // TODO use registry by user settings
  const registryUrl = 'https://registry.npm.taobao.org';

  const packageData: any = await packageJSON(source.npm, {
    version,
    registryUrl,
  });

  return packageData.dist.tarball;
};
