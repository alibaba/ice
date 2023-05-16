import { createRequire } from 'module';
import fs from 'fs';
import semver from 'semver';

const require = createRequire(import.meta.url);
// Only change this when you release a version which break the usage of runtime generation.
// TODO modify valid version to 1.2.0 after version is updated, otherwise it will cause build error.
const RUNTIME_VALID_VERSION = '>=1.1.0';
try {
  // @ice/runtime has defined package.json exports, so we can use require.resolve to get the package.json path.
  const packageJsonPath = require.resolve('@ice/runtime/package.json');
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const version = semver.valid(semver.coerce(pkg.version));
  if (!semver.satisfies(version, RUNTIME_VALID_VERSION)) {
    console.log(`Detect @ice/runtime version is ${pkg.version}, Please update @ice/runtime to ${RUNTIME_VALID_VERSION}`);
    // Break the process while @ice/runtime version is not valid.
    process.exit(1);
  }
} catch (e) {
  // Ignore errors while @ice/runtime is not installed.
}
