const path = require('path');
const fs = require('fs');

const projectRootDir = process.env.INIT_CWD; // the original working directory that npm was executed from
const dtsBundleFile = 'ice.d.ts';

const iceTempDir = path.join(projectRootDir, '.ice');
const iceTempDtsBundlePath = path.join(iceTempDir, dtsBundleFile);
const dtsBundlePath = path.join(__dirname, '..', 'lib', dtsBundleFile);

if (fs.existsSync(dtsBundlePath)) {
  if (!fs.existsSync(iceTempDir)) {
    fs.mkdirSync(iceTempDir);
  }

  fs.copyFileSync(
    dtsBundlePath,
    iceTempDtsBundlePath
  );
}
