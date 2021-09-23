/* eslint-disable no-await-in-loop */
import { copyFileSync, readdirSync, existsSync } from 'fs-extra';
import { join } from 'path';
import { cwd } from 'process';

const NATIVE_PACKAGES_DIR = join(process.cwd(), 'packages/swc/npm');

function copy() {
  const platforms = (readdirSync(NATIVE_PACKAGES_DIR)).filter(
    (name) => name !== '.gitignore'
  );
  // eslint-disable-next-line no-restricted-syntax
  for (const platform of platforms) {
    const binaryName = `builder-swc.${platform}.node`;
    const binaryPath = join(cwd(), 'packages/swc/native', binaryName);
    if (existsSync(binaryPath)) {
      console.log(`Copying ${binaryPath}`);
      copyFileSync(
        binaryPath,
        join(NATIVE_PACKAGES_DIR, platform, binaryName)
      );
    }
  }
}

copy();
