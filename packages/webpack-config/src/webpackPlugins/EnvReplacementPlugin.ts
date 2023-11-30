/**
 * Used for env replacement, each resolved module has its own query to make tree shaking works.
 */
export default function EnvReplacementPlugin() {
  const envLibs = ['universal-env', '@uni/env'];
  let unique = 0;
  return {
    apply(compiler) {
      compiler.hooks.normalModuleFactory.tap('EnvReplacementNormalModuleFactoryPlugin', (normalModuleFactory) => {
        normalModuleFactory.hooks.beforeResolve.tap('EnvReplacementResolvePlugin', (resolveData) => {
          const { request } = resolveData;
          if (envLibs.includes(request)) {
            unique++;
            const query = `?u=${unique}`;
            resolveData.request += query;
            // resolveData.query = query;
            // resolveData.cacheable = false;
          }
        });
      });
    },
  };
}
