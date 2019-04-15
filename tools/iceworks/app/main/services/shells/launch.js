const pathExists = require('path-exists');
const is = require('electron-is');
const Darwin = require('./darwin');
const Win32 = require('./win32');
const { ExternalShellError } = require('./shared');

exports.launchShell = async (shell, path) => {
  // We have to manually cast the wider `Shell` type into the platform-specific
  // type. This is less than ideal, but maybe the best we can do without
  // platform-specific build targets.
  const exists = await pathExists(shell.path);
  if (!exists) {
    throw new ExternalShellError(
      `无法查找到可用的 '${shell.shell}' 终端，请打开设置面板选择可用的终端。`
    );
  }

  if (is.osx()) {
    return Darwin.launch(shell, path);
  } else if (is.windows()) {
    return Win32.launch(shell, path);
  }
  // else if (__LINUX__) {
  //   return Linux.launch(shell, path);
  // }

  throw new ExternalShellError(`${process.platform} 目前不支持启动终端`);
};
