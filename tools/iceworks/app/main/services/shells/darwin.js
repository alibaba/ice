const { spawn } = require('child_process');
const appPath = require('app-path');
const { Shell } = require('./shared');

const Default = Shell.Terminal;
exports.Default = Default;

exports.parse = function parse(label) {
  if (label === Shell.Terminal) {
    return Shell.Terminal;
  }

  if (label === Shell.iTerm2) {
    return Shell.iTerm2;
  }

  return Default;
};

function getBundleID(shell) {
  switch (shell) {
    case Shell.Terminal:
      return 'com.apple.Terminal';
    case Shell.iTerm2:
      return 'com.googlecode.iterm2';
    default:
      throw new Error(`Unknown shell: ${shell}`);
  }
}

async function getShellPath(shell) {
  const bundleId = getBundleID(shell);
  try {
    return await appPath(bundleId);
  } catch (e) {
    // `appPath` will raise an error if it cannot find the program.
    return null;
  }
}

exports.getAvailableShells = async function getAvailableShells() {
  const [terminalPath, iTermPath] = await Promise.all([
    getShellPath(Shell.Terminal),
    getShellPath(Shell.iTerm2),
  ]);

  const shells = [];
  if (terminalPath) {
    shells.push({ shell: Shell.Terminal, path: terminalPath });
  }

  if (iTermPath) {
    shells.push({ shell: Shell.iTerm2, path: iTermPath });
  }

  return shells;
};

exports.launch = async function launch(foundShell, path) {
  const bundleID = getBundleID(foundShell.shell);
  const commandArgs = ['-b', bundleID, path];
  await spawn('open', commandArgs);
};
