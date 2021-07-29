/* eslint-disable import/no-dynamic-require */
import { transformSync, Options } from '@swc/core';

export default function(source) {
  const callback = this.async();
  const filename = this.resourcePath;
  const { devtool } = this._compiler.options;
  // Define sourceMaps by webpack devtool values
  const sourceMaps = !!devtool;
  const compileOptions: Options = {
    sourceMaps,
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: /\.tsx/.test(filename),
      },
      target: 'es2021'
    },
  };
  try {
    const { code, map } = transformSync(source, compileOptions);
    callback(null, code, map);
  } catch(err) {
    callback(err);
  }
}
