import packageJSON from 'package-json';
import storage from './storage';
import { IMaterialNpmSource } from '../interface';

export default async (source: IMaterialNpmSource, iceVersion?: string): Promise<string> => {
  let version: string = source.version;

  // TODO special material logic
  if (iceVersion === '1.x') {
    version = source['version-0.x'] || source.version;
  }

  const registryUrl = typeof source.npm === 'string' && source.npm.startsWith('@icedesign')
    ? 'https://registry.npm.taobao.org'
    : ((storage.get('npmClient') === 'custom' && storage.get('registry')) || source.registry);

  const packageData: any = await packageJSON(source.npm, {
    version,
    registryUrl,
  });

  return packageData.dist.tarball;
};
