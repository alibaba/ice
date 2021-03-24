const path = require('path');
const fs = require('fs-extra');
const ncc = require('@vercel/ncc');
const dependencies = require('./dependencies');

const DEPS_FOLDER = 'deps';
const additionalExternals = {
  'ts-loader': {
    typescript: 'typescript',
  },
  'fork-ts-checker-webpack-plugin': {
    typescript: 'typescript',
    eslint: 'eslint',
  },
  'eslint-reporting-webpack-plugin': {
    eslint: 'eslint',
  },
  'less-loader': {
    less: 'less',
  },
  'sass-loader': {
    sass: 'sass',
  },
};

async function bundlePackage(packageName, opts = {}) {
  const packagePath = require.resolve(packageName);
  const { code } = await ncc(packagePath ,{
    ...opts,
  });
  const packageFolder = path.join(__dirname, '..' , DEPS_FOLDER, packageName);
  fs.ensureDirSync(packageFolder);
  fs.writeFileSync(path.join(packageFolder, 'index.js'), code, 'utf-8');
}

// clear folder before bundle package
const depsFolder = path.join(__dirname, '..' , DEPS_FOLDER);
if (fs.existsSync(depsFolder)) {
  fs.emptyDirSync(depsFolder);
} else {
  fs.ensureDirSync(depsFolder);
}

(async () => {
  // eslint-disable-next-line
  for (const packageName of dependencies) {
    console.log('[start build]', packageName);
    // parse external map
    const externals = {
      // default externals
      fsevents: 'fsevents',
    };
    const folderDepth = packageName.split('/').length;
    const pathArray = Array.from(new Array(folderDepth)).map(() => '..');
    dependencies.forEach((name) => {
      externals[name] = `${pathArray.join('/')}/${name}`;
    });
    const opts = {
      externals,
    };
    if (additionalExternals[packageName]) {
      opts.externals = {
        ...opts.externals,
        ...additionalExternals[packageName],
      };
    }
    // eslint-disable-next-line
    await bundlePackage(packageName, opts);
  }
})();
