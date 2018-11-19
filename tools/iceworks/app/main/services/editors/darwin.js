const { ExternalEditor } = require('./shared');
const appPath = require('app-path');
const Path = require('path');
const pathExists = require('path-exists');
const log = require('../../logger');

exports.parse = function parse(label) {
  if (label === ExternalEditor.VisualStudioCode) {
    return ExternalEditor.VisualStudioCode;
  }

  if (label === ExternalEditor.SublimeText) {
    return ExternalEditor.SublimeText;
  }

  if (label === ExternalEditor.Atom) {
    return ExternalEditor.Atom;
  }

  if (label === ExternalEditor.WebStorm) {
    return ExternalEditor.WebStorm;
  }

  return null;
};

function getExecutableShim(editor, installPath) {
  switch (editor) {
    case ExternalEditor.Atom:
      return Path.join(installPath, 'Contents', 'Resources', 'app', 'atom.sh');
    case ExternalEditor.WebStorm:
      return Path.join(installPath, 'Contents', 'MacOS', 'webstorm');
    case ExternalEditor.VisualStudioCode:
      return Path.join(
        installPath,
        'Contents',
        'Resources',
        'app',
        'bin',
        'code'
      );
    case ExternalEditor.SublimeText:
      return Path.join(installPath, 'Contents', 'SharedSupport', 'bin', 'subl');
    default:
      return new Error(`Unknown external editor: ${editor}`);
  }
}

function getBundleIdentifiers(editor) {
  switch (editor) {
    case ExternalEditor.Atom:
      return ['com.github.atom'];
    case ExternalEditor.WebStorm:
      return ['com.jetbrains.WebStorm'];
    case ExternalEditor.VisualStudioCode:
      return ['com.microsoft.VSCode', 'com.microsoft.VSCodeInsiders'];
    case ExternalEditor.SublimeText:
      return ['com.sublimetext.3'];
    default:
      return new Error(`Unknown external editor: ${editor}`);
  }
}

const findApplication = async function findApplication(editor) {
  const identifiers = getBundleIdentifiers(editor);
  for (const identifier of identifiers) {
    try {
      const installPath = await appPath(identifier);
      const path = getExecutableShim(editor, installPath);
      const exists = await pathExists(path);
      if (exists) {
        return path;
      }

      log.info(`Command line interface for ${editor} not found at '${path}'`);
    } catch (error) {
      log.error(`Unable to locate ${editor} installation`, error);
    }
  }

  return null;
};

exports.getAvailableEditors = async function getAvailableEditors() {
  const results = [];
  // eslint-disable-next-line
  const [atomPath, codePath, sublimePath, webstromPath] = await Promise.all([
    findApplication(ExternalEditor.Atom),
    findApplication(ExternalEditor.VisualStudioCode),
    findApplication(ExternalEditor.SublimeText),
    findApplication(ExternalEditor.WebStorm),
  ]);

  if (atomPath) {
    results.push({
      name: 'Atom',
      editor: ExternalEditor.Atom,
      path: atomPath,
    });
  }

  if (codePath) {
    results.push({
      name: 'VisualStudioCode',
      editor: ExternalEditor.VisualStudioCode,
      path: codePath,
    });
  }

  if (sublimePath) {
    results.push({
      name: 'SublimeText',
      editor: ExternalEditor.SublimeText,
      path: sublimePath,
    });
  }

  if (webstromPath) {
    results.push({
      name: 'WebStorm',
      editor: ExternalEditor.WebStorm,
      path: webstromPath,
    });
  }

  return results;
};
