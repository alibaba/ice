import type { TransformOptions } from 'esbuild';

/** preset esbuild target/format/loader */
const esbuildPreset: TransformOptions = {
  // same as packages\icejs\package.json {engines}
  target: 'node12',
  format: 'cjs',
  loader: 'ts',
};

export default esbuildPreset;
