const ICE_PREFIX = /^ICE_/i;

function getClientEnvironment(customEnv: Record<string, string>) {
  // Grab NODE_ENV and ICE_* environment variables and prepare them to be
  // injected into the application via DefinePlugin in webpack configuration.
  const raw = Object.keys({ ...process.env, ...customEnv }).filter(key => ICE_PREFIX.test(key))
    .reduce((env, key) => {
      env[key] = process.env[key] || customEnv[key];
      return env;
    }, {});

  const stringified = Object.keys(raw).reduce((env, key) => {
    const stringifiedKey = key.startsWith('process.env.') ? key : `process.env.${key}`;
    env[stringifiedKey] = JSON.stringify(raw[key]);
    return env;
  }, {});

  return { raw, stringified };
}

export default getClientEnvironment;