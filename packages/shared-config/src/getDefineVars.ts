const RUNTIME_PREFIX = /^ICE_/i;

function getImportMetaEnv(getExpandedEnvs: () => Record<string, string>): Record<string, string> {
  const env = {};
  const validEnvKeys = ['NODE_ENV'];

  Object.keys(process.env)
    .filter((key) => RUNTIME_PREFIX.test(key) || validEnvKeys.includes(key))
    .forEach((key) => {
      env[key] = JSON.stringify(process.env[key]);
    });

  // User defined envs at `.env` series files.
  const expandedEnvs = getExpandedEnvs();
  for (const [key, value] of Object.entries(expandedEnvs)) {
    env[`import.meta.env.${key}`] = JSON.stringify(value);
  }
  return env;
}

export default function getDefineVars(
  define: Record<string, string | boolean>,
  runtimeDefineVars: Record<string, any>,
  getExpandedEnvs: () => Record<string, string>,
  webpack?: any,
) {
  Object.keys(process.env).filter((key) => {
    return RUNTIME_PREFIX.test(key) || ['NODE_ENV'].includes(key);
  }).forEach((key) => {
    if (webpack && /^ICE_CORE_/i.test(key)) {
      // ICE_CORE_* will be updated dynamically, so we need to make it effectively
      runtimeDefineVars[`process.env.${key}`] = webpack.DefinePlugin.runtimeValue(() => JSON.stringify(process.env[key]), true);
    } else {
      runtimeDefineVars[`process.env.${key}`] = JSON.stringify(process.env[key]);
    }
  });
  // ImportMeta.env is ice defined env variables.
  runtimeDefineVars['import.meta.env'] = getImportMetaEnv(getExpandedEnvs);

  return {
    ...(define || {}),
    ...runtimeDefineVars,
    // Make sure ICE_CORE_SSR and ICE_CORE_SSG is always false in csr mode.
    'process.env.ICE_CORE_SSR': 'false',
    'process.env.ICE_CORE_SSG': 'false',
  };
}
