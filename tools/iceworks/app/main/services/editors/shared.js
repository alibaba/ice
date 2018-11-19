module.exports = {
  CUSTOM_EDITOR: 'CustomShell',
  ExternalEditor: {
    VisualStudioCode: 'Visual Studio Code',
    SublimeText: 'Sublime Text 3',
    Atom: 'Atom',
    WebStorm: 'WebStorm',
    CustomShell: '自定义编辑器启动脚本',
  },
  ExternalEditorError: class ExternalEditorError extends Error {
    constructor(message, metadata = {}) {
      super(message);

      this.metadata = metadata;
    }
  },
};
