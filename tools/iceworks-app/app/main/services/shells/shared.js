const { isWin } = require('../../shared');

let Shell = {
  Terminal: 'Terminal',
  iTerm2: 'iTerm2',
};

if (isWin) {
  Shell = {
    Cmd: 'Command Prompt',
    PowerShell: 'PowerShell',
    GitBash: 'Git Bash',
  };
}

module.exports = {
  Shell,
  ExternalShellError: class ExternalShellError extends Error {
    constructor(message, metadata = {}) {
      super(message);

      this.metadata = metadata;
    }
  },
};
