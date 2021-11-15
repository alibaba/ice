const path = require('path');
const fs = require('fs');

const dtsBundleFile = 'ice.d.ts';
const iceTempDir = path.join(process.cwd(), '.ice');
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
