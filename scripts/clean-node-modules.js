const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function removeNodeModules(target) {
  fs.rmSync(target, {
    recursive: true,
    force: true,
  });
}

removeNodeModules(path.join(rootDir, 'node_modules'));

const packagesDir = path.join(rootDir, 'packages');

if (fs.existsSync(packagesDir)) {
  for (const packageName of fs.readdirSync(packagesDir)) {
    const packageNodeModules = path.join(packagesDir, packageName, 'node_modules');
    removeNodeModules(packageNodeModules);
  }
}
