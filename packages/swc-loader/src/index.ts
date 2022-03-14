import { getOptions } from 'loader-utils';
import transformCode from './transform';

function makeLoader() {
  return function (source, inputSourceMap) {
    // Make the loader async
    const callback = this.async();

    loader.call(this, source, inputSourceMap).then(
      args => callback(null, ...args),
      err => callback(err),
    );
  };
}

async function loader(source, inputSourceMap) {
  const filename = this.resourcePath;
  const { devtool } = this._compiler.options;
  // Define sourceMaps by webpack devtool values
  const sourceMaps = !!devtool;
  const initOptions = {
    filename,
    sourceMaps,
    inputSourceMap,
  };

  const loaderOptions = getOptions(this) || {};

  const programmaticOptions = Object.assign({}, loaderOptions, initOptions);

  // auto detect development mode
  if (this.mode && programmaticOptions.jsc && programmaticOptions.jsc.transform
          && programmaticOptions.jsc.transform.react &&
          !Object.prototype.hasOwnProperty.call(programmaticOptions.jsc.transform.react, 'development')) {
    programmaticOptions.jsc.transform.react.development = this.mode === 'development';
  }

  return await transformCode(source, programmaticOptions);
}

export default makeLoader();
exports.custom = makeLoader;
