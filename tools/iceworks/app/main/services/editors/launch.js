const { spawn } = require('child_process');
const pathExists = require('path-exists');

const logger = require('../../logger');
const { ExternalEditorError } = require('./shared');

/**
 * Open a given folder in the desired external editor.
 *
 * @param path The folder to pass as an argument when launching the editor.
 * @param editor The external editor to launch.
 */

exports.launchExternalEditor = async function launchExternalEditor(
  path,
  editor
) {
  const editorPath = editor.path;
  logger.debug(editor, editorPath);
  const exists = await pathExists(editorPath);
  if (!exists) {
    throw new ExternalEditorError(
      `无法查到到可用的 '${
        editor.editor
      }' 编辑器，请打开设置面板选择可用的编辑器。`,
      { openPreferences: true }
    );
  }

  spawn(editorPath, [path]);
};
