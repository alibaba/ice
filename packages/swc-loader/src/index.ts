/* eslint-disable import/no-dynamic-require */
import { getOptions } from 'loader-utils';
import { transform, plugins } from '@swc/core';
import Visitor from '@swc/core/Visitor';
import transformCode from './transform';

async function preCompileTsFile(source, initOptions, inputSourceMap) {
  const options = {
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: /\.tsx$/.test(initOptions.filename),
        dynamicImport: true,
        decorators: true,
      }
    },
    ...initOptions,
  };

  if (initOptions.sourceMaps && inputSourceMap) {
    options.inputSourceMap = inputSourceMap;
  }

  return await transform(source, options);
}

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
    // Ensure that Webpack will get a full absolute path in the sourcemap
    // so that it can properly map the module back to its internal cached
    // modules.
    sourceFileName: filename,
    sourceMaps,
  };

  const loaderOptions = getOptions(this) || {};

  if ((loaderOptions.plugins || loaderOptions.presets) && /\.tsx?$/.test(filename)) {
    const output = await preCompileTsFile(source, initOptions, inputSourceMap);
    source = output.code;
    if (inputSourceMap) {
      inputSourceMap = output.map;
    }
  }

  const programmaticOptions = Object.assign({}, loaderOptions, initOptions);
  if (sourceMaps && inputSourceMap) {
    programmaticOptions.inputSourceMap = inputSourceMap;
  }

  // Add swc plugins
  let swcPlugins = programmaticOptions.plugins || [];
  if (Array.isArray(programmaticOptions.presets)) {
    swcPlugins = [...swcPlugins, ...programmaticOptions.presets.reverse()];
  }
  if (swcPlugins.length > 0) {
    programmaticOptions.plugin = plugins(swcPlugins.map((pluginInfo) => {
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
      // Generate a plugin instance
      const PluginInstance = new Plugin();
      PluginInstance.filename = filename;
      // Return visitProgram method for this plugin, swc plugins will execute it
      return PluginInstance.visitProgram.bind(PluginInstance);
    }));
  }

  // Remove loader related options
  delete programmaticOptions.plugins;
  delete programmaticOptions.presets;

  // auto detect development mode
  if (this.mode && programmaticOptions.jsc && programmaticOptions.jsc.transform
          && programmaticOptions.jsc.transform.react &&
          !Object.prototype.hasOwnProperty.call(programmaticOptions.jsc.transform.react, 'development')) {
    programmaticOptions.jsc.transform.react.development = this.mode === 'development';
  }

  return await transformCode(source, programmaticOptions);
}

function interceptorRequire(moduleName: string) {
  // eslint-disable-next-line global-require
  const module = require(moduleName);
  if (module.default) return module.default;
  return module;
}

export default makeLoader();
exports.custom = makeLoader;
