const path = require('path');
const fs = require('fs');

const dtsBundleFile = 'ice.d.ts';
const iceTempDir = path.join(process.cwd(), '.ice');
const libDir = path.join(__dirname, '..', 'lib');

fs.mkdirSync(iceTempDir);

fs.copyFileSync(
  path.join(libDir, dtsBundleFile),
  path.join(iceTempDir, dtsBundleFile)
);
