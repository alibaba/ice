import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import semver from 'semver';

const require = createRequire(import.meta.url);
// Only change this when you release a version which break the usage of runtime generation.
// TODO modify valid version to 3.2.0 after version is updated, otherwise it will cause build error.
const ICE_VALID_VERSION = '>=3.1.6';
try {
  const packagePath = require.resolve('@ice/app', { paths: [process.cwd()] });
  const packageJsonPath = path.join(path.dirname(packagePath),'../package.json');
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const version = semver.valid(semver.coerce(pkg.version));
  if (!semver.satisfies(version, ICE_VALID_VERSION)) {
    console.log(`Detect @ice/app version is ${pkg.version}, Please update @ice/app to ${ICE_VALID_VERSION}`);
    // Break the process while @ice/app version is not valid.
    process.exit(1);
  }
} catch (e) {
  // Ignore errors while @ice/app is not installed.
}
