import swcPlugin from './swc.js';
import type { Config } from '@ice/types';

const getTransformPlugins = (rootDir: string, config: Config) => {
  const { sourceMap, transformPlugins = [], transforms = [], mode, isServer } = config;
  return [
    swcPlugin({ rootDir, sourceMap, mode, isServer }),
    ...transformPlugins,
    ...transforms.map((transform, index) => ({ name: `transform_${index}`, transform })),
  ];
};

export default getTransformPlugins;
