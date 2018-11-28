const is = require('electron-is');
const Darwin = require('./darwin');
const Win32 = require('./win32');
const { Shell } = require('./shared');
// import * as Linux from './linux';

let shellCache = null;

const Default = (() => {
  if (is.osx()) {
    return Darwin.Default;
  } else if (is.windows()) {
    return Win32.Default;
  } // else {
  //   return Linux.Default;
  // }
})();

const getAvailableShells = async () => {
  if (shellCache) {
    return shellCache;
  }

  if (is.osx()) {
    shellCache = await Darwin.getAvailableShells();
    return shellCache;
  } else if (is.windows()) {
    shellCache = await Win32.getAvailableShells();
    return shellCache;
  } // else if (is.linux()) {
  // shellCache = await Linux.getAvailableShells();
  // return shellCache;
  // }

  throw new Error(`${process.platform} 目前暂不支持启动已选终端`);
};

exports.findShellOrDefault = async (shell) => {
  const available = await getAvailableShells();
  const found = available.find((s) => {
    return s.shell === Shell[shell];
  });
  if (found) {
    return found;
  }
  return available.find((s) => {
    return s.shell === Default;
  });
};
