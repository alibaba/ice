import * as dts from 'dts-bundle';
import * as fse from 'fs-extra';
import { spawnSync } from 'child_process';
import { join, basename } from 'path';

async function bundleDts() {
  const dtsBundleName = 'ice';
  const exampleDir = join(__dirname, '..', 'examples', 'dts-generation');
  const iceTempCompileDir = join(exampleDir, 'dist', '.ice');
  const iceMainDtsFilePath = join(iceTempCompileDir, 'index.d.ts');
  const iceDtsBundleFilePath = join(iceTempCompileDir, `${dtsBundleName}.d.ts`);

  // 1. build example to get the .ice dir
  spawnSync('npm', ['run', 'build'], {
    stdio: 'inherit',
    cwd: exampleDir,
  });

  // 2. compile ts files which are under the .ice dir to get the *.d.ts files
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

  // 3. bundle all *.d.ts files which are under the .ice dir into one ice.d.ts file
  dts.bundle({
    name: dtsBundleName,
    main: iceMainDtsFilePath,
  });

  console.log('Successfully bundle icejs dts: ', iceDtsBundleFilePath);

  return iceDtsBundleFilePath;
}

async function copyDtsBundleToIceJsLib(dtsBundleFilePath: string) {
  const dtsBundleFile = basename(dtsBundleFilePath);
  const iceJsLibDir = join(__dirname, '..', 'packages', 'icejs', 'lib', dtsBundleFile);
  await fse.copyFile(dtsBundleFilePath, iceJsLibDir);
  console.log('Successfully copy icejs dts to: ', iceJsLibDir);

}

(async function() {
  const dtsBundleFilePath = await bundleDts();
  await copyDtsBundleToIceJsLib(dtsBundleFilePath);
})();
