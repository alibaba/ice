import type { NormalModule } from 'webpack';

interface RuntimeEnvironment {
  [x: string]: (args: {module: NormalModule; key: string; version?: string}) => string;
}

const RUNTIME_PREFIX = /^ICE_RUNTIME_/i;
const isBooleanString = (str: string) => ['true', 'false'].includes(str);
export const getRuntimeEnvironment = (customEnv?: Record<string, string>): RuntimeEnvironment => {
  // Grab ICE_RUNTIME_* environment variables and prepare them to be
  // injected into the application via DefinePlugin in webpack configuration.
  const raw = Object.keys({ ...process.env, ...(customEnv || {}) }).filter(key => RUNTIME_PREFIX.test(key))
    .reduce((env, key) => {
      env[key.startsWith('process.env.') ? key : `process.env.${key}`] = () => {
        const envValue = process.env[key] ?? customEnv[key];
        return isBooleanString(envValue) ? envValue : JSON.stringify(envValue);
      };
      return env;
    }, {});
  return raw;
};
