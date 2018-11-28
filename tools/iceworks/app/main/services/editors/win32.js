const Path = require('path');
const pathExists = require('path-exists');
const { ExternalEditor } = require('./shared');
const log = require('../../logger');

const { readRegistryKeySafe } = require('../../registry');

exports.parse = function parse(label) {
  if (label === ExternalEditor.Atom) {
    return ExternalEditor.Atom;
  }
  if (label === ExternalEditor.VisualStudioCode) {
    return ExternalEditor.VisualStudioCode;
  }
  if (label === ExternalEditor.SublimeText) {
    return ExternalEditor.SublimeText;
  }

  if (label === ExternalEditor.WebStorm) {
    return ExternalEditor.WebStorm;
  }
  return null;
};

/**
 * Resolve a set of registry keys associated with the installed application.
 *
 * This is because some tools (like VSCode) may support a 64-bit or 32-bit
 * version of the tool - we should use whichever they have installed.
 *
 * @param editor The external editor that may be installed locally.
 */
function getRegistryKeys(editor) {
  switch (editor) {
    case ExternalEditor.Atom:
      return [
        'HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\atom',
      ];
    case ExternalEditor.VisualStudioCode:
      return [
        // 64-bit version of VSCode - not available from home page but just made available
        'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{EA457B21-F73E-494C-ACAB-524FDE069978}_is1',
        'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{1287CAD5-7C8D-410D-88B9-0D1EE4A83FF2}_is1',
        // user version
        'HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{771FD6B0-FA20-440A-A002-3B3BAC16DC50}_is1',
        // 32-bit version of VSCode - what most people will be using for the forseeable future
        'HKEY_LOCAL_MACHINE\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{F8A2A208-72B3-4D61-95FC-8A65D340689B}_is1',
        'HKEY_LOCAL_MACHINE\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{C26E74D1-022E-4238-8B9D-1E7564A36CC9}_is1',
        // user version
        'HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{D628A17A-9713-46BF-8D57-E671B46A741E}_is1',
      ];
    case ExternalEditor.SublimeText:
      return [
        'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Sublime Text 3_is1',
      ];

    case ExternalEditor.WebStorm:
      return [
        'HKEY_CLASSES_ROOT\\Applications\\webstorm.exe\\shell\\open\\command',
      ];

    default:
      return new Error(`Unknown external editor: ${editor}`);
  }
}

/**
 * Resolve the command-line interface for the editor.
 *
 * @param editor The external editor which is installed
 * @param installLocation The known install location of the editor
 */
function getExecutableShim(editor, installLocation) {
  switch (editor) {
    case ExternalEditor.Atom:
      return Path.join(installLocation, 'bin', 'atom.cmd');
    case ExternalEditor.VisualStudioCode:
      return Path.join(installLocation, 'bin', 'code.cmd');
    case ExternalEditor.SublimeText:
      return Path.join(installLocation, 'subl.exe');
    case ExternalEditor.WebStorm:
      return Path.join(installLocation, 'bin', 'webstorm64.exe');
    default:
      return new Error(`Unknown external editor: ${editor}`);
  }
}

/**
 * Confirm the found installation matches the expected identifier details
 *
 * @param editor The external editor
 * @param displayName The display name as listed in the registry
 * @param publisher The publisher who created the installer
 */
function isExpectedInstallation(editor, displayName, publisher) {
  switch (editor) {
    case ExternalEditor.Atom:
      return displayName === 'Atom' && publisher === 'GitHub Inc.';
    case ExternalEditor.VisualStudioCode:
      return (
        (displayName === 'Microsoft Visual Studio Code' ||
          displayName === 'Microsoft Visual Studio Code Insiders' ||
          displayName === 'Microsoft Visual Studio Code (User)') &&
        publisher === 'Microsoft Corporation'
      );
    case ExternalEditor.SublimeText:
      return (
        displayName === 'Sublime Text' && publisher === 'Sublime HQ Pty Ltd'
      );
    case ExternalEditor.WebStorm:
      return displayName === 'WebStorm' && publisher === 'JetBrains s.r.o.';
    default:
      return new Error(`Unknown external editor: ${editor}`);
  }
}

/**
 * Map the registry information to a list of known installer fields.
 *
 * @param editor The external editor being resolved
 * @param keys The collection of registry key-value pairs
 */
function extractApplicationInformation(editor, keys) {
  let displayName = '';
  let publisher = '';
  let installLocation = '';

  if (editor === ExternalEditor.Atom) {
    for (const item of keys) {
      if (item.name === 'DisplayName') {
        displayName = item.value;
      } else if (item.name === 'Publisher') {
        publisher = item.value;
      } else if (item.name === 'InstallLocation') {
        installLocation = item.value;
      }
    }

    return { displayName, publisher, installLocation };
  }

  if (editor === ExternalEditor.VisualStudioCode) {
    for (const item of keys) {
      if (item.name === 'DisplayName') {
        displayName = item.value;
      } else if (item.name === 'Publisher') {
        publisher = item.value;
      } else if (item.name === 'InstallLocation') {
        installLocation = item.value;
      }
    }

    return { displayName, publisher, installLocation };
  }

  if (editor === ExternalEditor.SublimeText) {
    for (const item of keys) {
      // NOTE:
      // Sublime Text appends the build number to the DisplayName value, so for
      // forward-compatibility let's do a simple check for the identifier
      if (
        item.name === 'DisplayName' &&
        item.value &&
        item.value.startsWith('Sublime Text')
      ) {
        displayName = 'Sublime Text';
      } else if (item.name === 'Publisher') {
        publisher = item.value;
      } else if (item.name === 'InstallLocation') {
        installLocation = item.value;
      }
    }

    return { displayName, publisher, installLocation };
  }

  if (editor === ExternalEditor.WebStorm) {
    for (const item of keys) {
      if (item.name === '(Default)') {
        displayName = 'WebStorm';
        publisher = 'JetBrains s.r.o.';
        const exePath = item.value.replace(' "%1"', '').replace(/\"/g, '');
        installLocation = Path.resolve(exePath, '../../');
      }
    }

    return { displayName, publisher, installLocation };
  }

  return new Error(`Unknown external editor: ${editor}`);
}

async function findApplication(editor) {
  const registryKeys = getRegistryKeys(editor);

  let keys = [];
  for (const key of registryKeys) {
    keys = await readRegistryKeySafe(key);
    if (keys.length > 0) {
      break;
    }
  }

  if (keys.length === 0) {
    return null;
  }

  const {
    displayName,
    publisher,
    installLocation,
  } = extractApplicationInformation(editor, keys);

  if (!isExpectedInstallation(editor, displayName, publisher)) {
    log.debug(
      `Registry entry for ${editor} did not match expected publisher settings`
    );
    return null;
  }

  const path = getExecutableShim(editor, installLocation);
  const exists = await pathExists(path);
  if (!exists) {
    log.debug(`Command line interface for ${editor} not found at '${path}'`);
    return null;
  }

  return path;
}

/**
 * Lookup known external editors using the Windows registry to find installed
 * applications and their location on disk for Desktop to launch.
 */
exports.getAvailableEditors = async function getAvailableEditors() {
  const results = [];
  // eslint-disable-next-line
  const [atomPath, codePath, sublimePath, webstormPath] = await Promise.all([
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

  if (webstormPath) {
    results.push({
      name: 'WebStorm',
      editor: ExternalEditor.WebStorm,
      path: webstormPath,
    });
  }

  return results;
};
