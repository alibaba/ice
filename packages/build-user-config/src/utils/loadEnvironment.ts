import * as path from 'path';
import * as fse from 'fs-extra';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

function lookupFile(dir: string, file: string, pathOnly = false): string | undefined {
  const fullPath = path.join(dir, file);

  if (fse.existsSync(fullPath) && fse.statSync(fullPath).isFile()) {
    return pathOnly ? fullPath : fse.readFileSync(fullPath, 'utf-8');
  }
}

function loadEnvironment(envDir: string, mode: string) {
  const env: Record<string, string> = {};
  const envFiles = [
    `.env.${mode}.local`,
    `.env.${mode}`,
    '.env.local',
    '.env',
  ];
  // search for target files
  // eslint-disable-next-line no-restricted-syntax
  for (const file of envFiles) {
    const envContent = lookupFile(envDir, file);
    if (envContent) {
      const parsed = dotenv.parse(envContent);
      dotenvExpand.expand({
        parsed,
        // prevent process.env mutation
        ignoreProcessEnv: true,
      });
      
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(parsed)) {
        if (env[key] === undefined) {
          env[key] = value;
        }
        if (key === 'NODE_ENV') {
          // support NODE_ENV override in .env file, in case of need a custom build mode for develop
          process.env.NODE_ENV = value;
        }
      }
    }
  }
  return env;
}

export default loadEnvironment;