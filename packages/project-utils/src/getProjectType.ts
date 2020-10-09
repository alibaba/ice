import * as globby from 'globby';

function getProjectType(appDir: string = process.cwd()): 'ts' | 'js' {
  const typescriptFiles = globby.sync(
    ['**/*.(ts|tsx)', '!**/node_modules', '!**/*.d.ts'],
    { cwd: appDir }
  );
  if (typescriptFiles.length > 0) {
    return 'ts';
  }
  return 'js';
}

export default getProjectType;