/* eslint-disable import/no-dynamic-require */
import { getOptions } from 'loader-utils';
import { transform, transformSync, plugins } from '@swc/core';
import Visitor from '@swc/core/Visitor';

function makeLoader() {
  return function (source, inputSourceMap) {
    // Make the loader async
    const callback = this.async();
    const filename = this.resourcePath;
    const { devtool } = this._compiler.options;
    // Define sourceMaps by webpack devtool values
    const sourceMaps = !!devtool;

    const loaderOptions = getOptions(this) || {};
    const programmaticOptions = Object.assign({}, loaderOptions, {
      filename,
      // Ensure that Webpack will get a full absolute path in the sourcemap
      // so that it can properly map the module back to its internal cached
      // modules.
      sourceFileName: filename,
      sourceMaps,
    });
    if (sourceMaps && inputSourceMap) {
      programmaticOptions.inputSourceMap = inputSourceMap;
    }

    const sync = programmaticOptions.sync;
    const parseMap = programmaticOptions.parseMap;

    // Add swc plugins
    let swcPlugins = programmaticOptions.plugins || [];
    if (Array.isArray(programmaticOptions.presets)) {
      swcPlugins = [...swcPlugins, ...programmaticOptions.presets.reverse()];
    }

    if (swcPlugins.length) {
      programmaticOptions.plugins = (m) => plugins.call(null, swcPlugins.map((pluginInfo) => {
        let pluginPath;
        let pluginArgs = {};
        if (Array.isArray(pluginInfo)) {
          pluginPath = pluginInfo[0];
          pluginArgs = pluginInfo[1];
        } else {
          pluginPath = pluginInfo;
        }
        let Plugin = interceptorRequire(pluginPath);
        if (typeof Plugin !== 'function') {
          throw new Error('swc plugin type should be function!');
        }
        if (!Object.prototype.isPrototypeOf.apply(Visitor, Plugin)) {
          Plugin = Plugin(filename, pluginArgs);
        }
        return new Plugin().visitProgram(m);
      }));
    }

    // Remove loader related options
    delete programmaticOptions.sync;
    delete programmaticOptions.parseMap;
    delete programmaticOptions.presets;
    // auto detect development mode
    if (this.mode && programmaticOptions.jsc && programmaticOptions.jsc.transform
            && programmaticOptions.jsc.transform.react &&
            !Object.prototype.hasOwnProperty.call(programmaticOptions.jsc.transform.react, 'development')) {
      programmaticOptions.jsc.transform.react.development = this.mode === 'development';
    }

    try {
      const handleTransformResult = generateResultHandler(callback, sourceMaps, inputSourceMap, parseMap);
      if (sync) {
        const output = transformSync(source, programmaticOptions);
        handleTransformResult(output);
      } else {
        transform(source, programmaticOptions).then(handleTransformResult, callback);
      }
    } catch (e) {
      callback(e);
    }
  };
}

function interceptorRequire(moduleName: string) {
  // eslint-disable-next-line global-require
  const module = require(moduleName);
  if (module.default) return module.default;
  return module;
}

function generateResultHandler(callback, sourceMaps: boolean, inputSourceMap: string, parseMap: boolean) {
  return (output) => {
    let { map } = output;
    if (!sourceMaps) {
      map = inputSourceMap;
    }
    callback(
      null,
      output.code,
      parseMap ? JSON.parse(map) : map
    );
  };
}

export default makeLoader();
exports.custom = makeLoader;
