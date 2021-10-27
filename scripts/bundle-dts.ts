import * as dts from 'dts-bundle';
import { spawnSync } from 'child_process';
import { join } from 'path';

(async function () {
  const dtsBundleName = 'ice';
  const exampleDir = join(__dirname, '..', 'examples', 'basic-spa');
  const iceTempCompileDir = join(exampleDir, 'dist', '.ice');
  const iceMainDtsFile = join(iceTempCompileDir, 'index.d.ts');
  const iceBundleDtsFile = join(iceTempCompileDir, `${dtsBundleName}.d.ts`);

  // 1. build example to get the .ice dir
  spawnSync('npm', ['run', 'build'], {
    stdio: 'inherit',
    cwd: exampleDir,
  });

  // 2. compile ts files which are under the .ice dir
  spawnSync('npx',
    [
      'tsc',
      '-p', './tsconfig.json',
    ],
    {
      stdio: 'inherit',
      cwd: exampleDir,
    }
  );

  // 3. bundle .ice d.ts
  dts.bundle({
    name: dtsBundleName,
    main: iceMainDtsFile,
  });

  console.log('Successfully bundle icejs dts: ', iceBundleDtsFile);
})();
