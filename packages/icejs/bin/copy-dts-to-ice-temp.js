// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';

// const __dirname = fileURLToPath(import.meta.url);

const path = require('path');
const fs = require('fs');

(function () {
  const projectRootDir = process.env.INIT_CWD; // the original working directory that npm was executed from
  if (!projectRootDir) {
    // process.env.INIT_CWD may be undefined in low version npm or cnpm
    return;
  }

  const iceTempDir = path.join(projectRootDir, '.ice');
  const iceTempDtsBundlePath = path.join(iceTempDir, 'index.d.ts');
  const dtsBundlePath = path.join(__dirname, '..', 'lib', 'ice.d.ts');

  if (fs.existsSync(dtsBundlePath)) {
    if (!fs.existsSync(iceTempDir)) {
      fs.mkdirSync(iceTempDir);
    }

    fs.copyFileSync(
      dtsBundlePath,
      iceTempDtsBundlePath,
    );
  }
})();