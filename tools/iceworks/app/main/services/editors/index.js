const { exec } = require('child_process');

const { findEditorOrDefault } = require('./lookup');
const { launchExternalEditor } = require('./launch');
const exception = require('../../exception');
const settings = require('../settings');
const shared = require('./shared');
const interaction = require('../interaction');

const { ExternalEditorError, CUSTOM_EDITOR } = shared;

module.exports = {
  shared,
  /**
   * 在编辑器中打开
   *
   * @param {String} path 打开的文件或者文件夹路径
   */
  open: async (path) => {
    const selectedExternalEditor = settings.get('editor') || null;
    if (selectedExternalEditor) {
      interaction.notify({
        title: '正在启动编辑器',
        body: selectedExternalEditor,
      });
    }
    // 自定义编辑器打开
    if (selectedExternalEditor === CUSTOM_EDITOR) {
      let editorShell = settings.get('editorShell') || '';
      editorShell = editorShell.trim();
      if (!editorShell) {
        exception.catch(new ExternalEditorError('启动脚本为空'));
      } else {
        editorShell = editorShell.replace('${cwd}', path);

        exec(editorShell, (error) => {
          if (error) {
            exception.catch(error);
          }
        });
      }
    } else {
      try {
        const match = await findEditorOrDefault(selectedExternalEditor);
        await launchExternalEditor(path, match);
      } catch (error) {
        exception.catch(error);
      }
    }
  },
};
