import * as loadderUtils from '@ice/bundles/compiled/loader-utils/index.js';
import type webpack from 'webpack';

const { getOptions } = loadderUtils;
export default function (this: webpack.LoaderContext<any>, source: string) {
  const options = getOptions(this);

  const runtimePath = Array.isArray(options.runtimePath) ? options.runtimePath : [options.runtimePath];
  const setReconciler = runtimePath.reduce((res, item) => {
    return `${res}import '${item}'\n`;
  }, '');

  return `${setReconciler}
  ${source}`;
}
