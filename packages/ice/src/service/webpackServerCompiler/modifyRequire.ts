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
          Object.entries(assets).forEach(([pathname, source]) => {
            if (!pathname.includes('vendor')) {
              const sourceCode = source.source().toString();
              compilation.updateAsset(
                pathname,
                new compiler.webpack.sources.SourceMapSource(
                  sourceCode.replace(/require\(/g, 'system.files.import('),
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
