import * as path from 'path';
import loadEnvironment from '../src/utils/loadEnvironment';

describe('load environment', () => {
  const envDir = path.join(__dirname, './fixtures/');
  const currentNodeEnv = process.env.NODE_ENV;
  it('load environment development', () => {
    const env = loadEnvironment(envDir, 'development');
    expect(env).toStrictEqual({
      "DB": "db",
      "ICE_LOCAL_STR": "str",
      "ICE_ROOT": "/ice/development",
      "NODE_ENV": "development",
    });
    // prevent process.env mutation
    expect(process.env.DB).toBe(undefined);
    expect(process.env.NODE_ENV).toBe('development');
    // reset NODE_ENV
    process.env.NODE_ENV = currentNodeEnv;
  });

  it('load environment production', () => {
    const env = loadEnvironment(envDir, 'production');
    expect(env).toStrictEqual({
      "DB": "db",
      "ICE_LOCAL_STR": "str",
      "ICE_ROOT": "/ice/production",
      "NODE_ENV": "production",
    });
    expect(process.env.NODE_ENV).toBe('production');
    // reset NODE_ENV
    process.env.NODE_ENV = currentNodeEnv;
  });
  
});