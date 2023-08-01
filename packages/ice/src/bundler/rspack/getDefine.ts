import { getImportMetaEnv } from '@ice/webpack-config';

const RUNTIME_PREFIX = /^ICE_/i;

function getDefine(
  define: Record<string, string | boolean>,
  runtimeDefineVars: Record<string, any>,
  getExpandedEnvs: () => Record<string, string>,
) {
  Object.keys(process.env).filter((key) => {
    return RUNTIME_PREFIX.test(key) || ['NODE_ENV'].includes(key);
  }).forEach((key) => {
    // Automatically stringify all values.
    runtimeDefineVars[`process.env.${key}`] = JSON.stringify(process.env[key]);
  });
  // ImportMeta.env is ice defined env variables.
  runtimeDefineVars['import.meta.env'] = getImportMetaEnv(getExpandedEnvs);

  return {
    ...define,
    ...runtimeDefineVars,
    // Make sure ICE_CORE_SSR and ICE_CORE_SSG is always false in csr mode.
    'process.env.ICE_CORE_SSR': 'false',
    'process.env.ICE_CORE_SSG': 'false',
  };
}

export default getDefine;
