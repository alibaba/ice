import { type Compiler } from 'webpack';

const PLUGIN_NAME = 'modify_require';

class ModifyRequirePlugin {
  apply(compiler: Compiler) {
    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: PLUGIN_NAME,
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        (assets) => {
          // TODO: make it more universal
          Object.entries(assets).forEach(([pathname, source]) => {
            let sourceCode = source.source().toString();
            if (pathname.includes('vendor')) {
              let code = sourceCode
                .replace(/exports\.id/, 'const __quickMode = {} \n__quickMode.id')
                .replace(/exports\.ids/, '__quickMode.ids')
                .replace(/exports\.modules/, '__quickMode.modules')
                .replace(
                  'const { Writable } = stream_browserify_namespaceObject;',
                  'const { Writable } = stream_browserify;',
                );
              code += `\nmodule.exports = function () {
  window.__quickMode = __quickMode;
}`;
              compilation.updateAsset(
                pathname,
                new compiler.webpack.sources.SourceMapSource(
                  // require is not work in wormhole, so store the module chunk in window instead
                  code,
                  pathname,
                  source.map(),
                ),
              );
            } else {
              compilation.updateAsset(
                pathname,
                new compiler.webpack.sources.SourceMapSource(
                  // require is not work in wormhole, so store the module chunk in window instead
                  sourceCode.replace(/installChunk\(.+\)/, 'installChunk(window.__quickMode)'),
                  pathname,
                  source.map(),
                ),
              );
            }
          });
        },
      );
    });
  }
}

export default ModifyRequirePlugin;
