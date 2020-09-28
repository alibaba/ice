const path = require('path');
const fse = require('fs-extra');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const Config = require('webpack-chain');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

module.exports = async(chainConfig, dll, { userConfig, rootDir, pkg, webpack }) => {
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

function rebuildCheck(curEntry, prevEntryPath) {
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

async function buildDll(dllPath, entry, webpack, rootDir) {
  const chainConfig = new Config();
  chainConfig.entryPoints.clear();
  const entryKeys = Object.keys(entry);
  entryKeys.forEach(entryKey => {
    const entryValues = entry[entryKey];
    const escapedEntryKey = escapeStr(entryKey);
    entryValues.forEach(entryVal => {
      chainConfig.entry(escapedEntryKey).add(entryVal);
    });
  });

  chainConfig.output
    .path(dllPath)
    .library('_dll_[name]')
    .filename('[name].dll.js');

  chainConfig.plugin('dllPlugin').use(webpack.DllPlugin, [{
    name: '_dll_[name]',
    path: path.join(dllPath, '[name].manifest.json')
  }]);

  chainConfig.name('dll');

  chainConfig.resolve.modules
    .add('node_modules')
    .add(path.resolve(rootDir, 'node_modules'));

  return new Promise((resolve, reject) => {
    webpack(chainConfig.toConfig(), (err, stats) => {
      if (err) {
        reject(err);
      }

      const info = stats.toJson({
        all: false,
        errors: true,
        warnings: true,
        timings: true,
      });

      const messages = formatWebpackMessages(info);

      if (messages.errors.length) {
        fse.ensureDirSync(dllPath);
        fse.emptyDirSync(dllPath);
        reject(messages.errors.join(''));
      }

      resolve();
    });
  });
}

function withDll(chainConfig, dllPath, entry, webpack) {
  const entryKeys = Object.keys(entry);
  entryKeys.forEach(entryKey => {
    const escapedEntryKey = escapeStr(entryKey);
    chainConfig.plugin(`DllReferencePlugin_${entryKey}`).use(webpack.DllReferencePlugin, [{
      manifest: path.resolve(dllPath, `${escapedEntryKey}.manifest.json`)
    }]);
  });

  chainConfig.plugin('AddAssetHtmlPlugin').use(AddAssetHtmlPlugin, [{
    filepath: path.resolve(dllPath, '*.dll.js')
  }]).after('HtmlWebpackPlugin');
}

function escapeStr(str) {
  return Buffer.from(str, 'utf8').toString('hex');
}
