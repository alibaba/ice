const path = require('path');
const fse = require('fs-extra');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const Config = require('webpack-chain');

module.exports = async (chainConfig, dll, { userConfig, rootDir, pkg, webpack }) => {
  if (!dll) return;

  const dllPath = path.join(rootDir, 'dll');
  
  let entry = {};
  const { dllEntry } = userConfig;
  if (Object.keys(dllEntry).length !== 0) {
    entry = dllEntry;
  } else {
    entry = {
      vendor: Object.keys(pkg.dependencies)
    };
  }

  const rebuildNeeded = rebuildCheck(entry, dllPath);

  if (rebuildNeeded) {
    await buildDll(dllPath, entry, webpack, rootDir);
  };

  withDll(chainConfig, dllPath, entry, webpack);
};

function rebuildCheck (curEntry, prevEntryPath) {
  const pkgPath = path.join(prevEntryPath, 'dll-pkg.json');
  if (!fse.pathExistsSync(pkgPath)) {
    fse.ensureDirSync(prevEntryPath);
    fse.emptyDirSync(prevEntryPath);
    fse.writeFileSync(pkgPath, JSON.stringify(curEntry));
    return true;
  } else {
    const prevEntryString = fse.readFileSync(pkgPath, 'utf-8');
    if (prevEntryString === JSON.stringify(curEntry)) {
      return false;
    }
    fse.emptyDirSync(prevEntryPath);
    fse.writeFileSync(pkgPath, JSON.stringify(curEntry));
    return true;
  }
}

async function buildDll (dllPath, entry, webpack, rootDir) {
  const chainConfig = new Config();
  chainConfig.entryPoints.clear();
  const entryKeys = Object.keys(entry);
  entryKeys.forEach(entryKey => {
    const entryValues = entry[entryKey];
    entryValues.forEach(entryVal => {
      chainConfig.entry(entryKey).add(entryVal);
    });
  });

  chainConfig.output.path(dllPath);
  chainConfig.output.library('_dll_[name]');
  chainConfig.output.filename('[name].dll.js');

  chainConfig
  .plugin('dllPlugin').use(webpack.DllPlugin, [{
    name: '_dll_[name]',
    path: path.join(dllPath, '[name].manifest.json')
  }]);

  chainConfig.name('dll');

  chainConfig.resolve.modules.add('node_modules');
  chainConfig.resolve.modules.add(path.resolve(rootDir, 'node_modules'));

  console.log(chainConfig.toConfig());

  return new Promise((resolve, reject) => {
    webpack(chainConfig.toConfig(), err => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log('dll success');
        resolve();
      }
    });
  });
}

function withDll (chainConfig, dllPath, entry, webpack) {
  const entryKeys = Object.keys(entry);
  entryKeys.forEach(entryKey => {
    chainConfig.plugin(`DllReferencePlugin_${entryKey}`).use(webpack.DllReferencePlugin, [{
      manifest: path.resolve(dllPath, `${entryKey}.manifest.json`)
    }]);
  });

  chainConfig.plugin('AddAssetHtmlPlugin').use(AddAssetHtmlPlugin, [{
    filepath: path.resolve(dllPath, '*.dll.js')
  }]).after('HtmlWebpackPlugin');
}
