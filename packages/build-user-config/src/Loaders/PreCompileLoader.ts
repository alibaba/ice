/* eslint-disable import/no-dynamic-require */
import { transformSync, Options } from '@builder/swc';
import { getOptions } from 'loader-utils';
import * as deepmerge from 'deepmerge';

export default function(source) {
  const callback = this.async();
  const filename = this.resourcePath;
  const { devtool } = this._compiler.options;
  // Define sourceMaps by webpack devtool values
  const loaderOptions = getOptions(this) || {};
  const sourceMaps = !!devtool;

  const compileOptions: Options = deepmerge({
    filename,
    sourceFileName: filename,
    sourceMaps,
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: /\.tsx/.test(filename),
      },
      target: 'es2021'
    },
  }, loaderOptions);

  try {
    const { code, map } = transformSync(source, compileOptions);
    callback(null, code, map);
  } catch(err) {
    callback(err);
  }
}
