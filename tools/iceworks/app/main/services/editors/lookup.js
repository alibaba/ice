const { ExternalEditorError } = require('./shared');
const { getAvailableEditors: getAvailableEditorsDarwin } = require('./darwin');
const { getAvailableEditors: getAvailableEditorsWindows } = require('./win32');
const is = require('electron-is');
const log = require('../../logger');

// import { getAvailableEditors as getAvailableEditorsLinux } from './linux';

let editorCache = null;

/**
 * Resolve a list of installed editors on the user's machine, using the known
 * install identifiers that each OS supports.
 */
const getAvailableEditors = async function getAvailableEditors() {
  if (editorCache && editorCache.length > 0) {
    return editorCache;
  }

  if (is.osx()) {
    editorCache = await getAvailableEditorsDarwin();
    return editorCache;
  }

  // @TODO support windows

  if (is.windows()) {
    editorCache = await getAvailableEditorsWindows();
    return editorCache;
  }

  log.warn(
    `Platform not currently supported for resolving editors: ${
      process.platform
    }`
  );

  return [];
};

/**
 * Find an editor installed on the machine using the friendly name, or the
 * first valid editor if `null` is provided.
 *
 * Will throw an error if no editors are found, or if the editor name cannot
 * be found (i.e. it has been removed).
 */
exports.findEditorOrDefault = async function findEditorOrDefault(name) {
  const editors = await getAvailableEditors();
  if (editors.length === 0) {
    throw new ExternalEditorError(
      '没有合适的编辑器供 iceworks 启动，推荐安装 Visual Studio Code 重启后尝试。'
    );
  }

  if (name) {
    const match = editors.find((p) => p.name === name) || null;
    if (!match) {
      throw new ExternalEditorError(
        `无法查找到 '${name}, 打开设置面板选择可用的编辑器。`
      );
    }

    return match;
  }

  return editors[0];
};
