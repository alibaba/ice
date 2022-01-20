const ICE_PREFIX = /^ICE_/i;

function getClientEnvironment(publicPath: string) {
  // Grab NODE_ENV and ICE_* environment variables and prepare them to be
  // injected into the application via DefinePlugin in webpack configuration.
  const raw = Object.keys(process.env).filter(key => ICE_PREFIX.test(key))
    .reduce((env, key) => {
      env[key] = process.env[key];
      return env;
    }, {
      NODE_ENV: process.env.NODE_ENV || 'development',
      PUBLIC_PATH: publicPath
    });

  return {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };
}

export default getClientEnvironment;