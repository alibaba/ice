import { remote } from 'electron';
import * as fit from 'xterm/lib/addons/fit/fit';
// import * as webLinks from 'xterm/lib/addons/webLinks/webLinks';
import defaultShell from 'default-shell';
import pathExists from 'path-exists';

import services from '../services';

const { pty } = services;
const { env, isWin } = remote.require('./shared');

window.Terminal.applyAddon(fit);
// Terminal.applyAddon(webLinks);

const termDefaultOptions = {
  cols: 108,
  rows: 21,
  fontFamily:
    'Menlo, "DejaVu Sans Mono", Consolas, "Lucida Console", monospace',
  allowTransparency: 'transparent',
  fontSize: 12,
  lineHeight: 1.5,
  theme: {
    foreground: '#f0f0f0',
    background: 'transparent',
    selection: 'rgba(248,28,229,0.3)',
  },
};

const terms = {};

// windows 下 terminal 的高度有偏差
function rowsOffset(rows) {
  if (isWin) {
    return rows - 2;
  }
  return rows;
}

class Terms {
  constructor() {}

  new(cwd, container) {
    if (typeof terms[cwd] == 'undefined') {
      const term = new window.Terminal(termDefaultOptions);
      // 判断 cwd 必须存在
      if (pathExists.sync(cwd)) {
        this.newPty(term, cwd);
      }
      terms[cwd] = term;
      term.open(container);
      term.fit();

      setTimeout(() => {
        const { width, height } = container.getBoundingClientRect();
        const charMeasure = term.charMeasure;
        const cols = Math.floor(width / (charMeasure.width || 9.015625));
        const rows = Math.floor(height / 21);
        term.resize(cols, rowsOffset(rows));
      }, 1000 / 60);

      term.attachCustomKeyEventHandler((e) => {
        if (e.ctrlKey && e.key == 'd') {
          return false;
        }
      });
    } else {
      terms[cwd].open(container);
      terms[cwd].fit();

      if (typeof terms[cwd].ptyProcess == 'undefined') {
        this.new(terms[cwd], cwd);
      }

      setTimeout(() => {
        const { width, height } = container.getBoundingClientRect();
        const charMeasure = terms[cwd].charMeasure;
        const cols = Math.floor(width / (charMeasure.width || 9.015625));
        const rows = Math.floor(height / 21);
        terms[cwd].resize(cols, rowsOffset(rows));
      }, 1000 / 60);
    }
  }

  newPty = (term, cwd) => {
    const ptyProcess = pty.spawn(defaultShell, [], {
      name: 'xterm-color',
      cols: 108,
      rows: 21,
      cwd,
      env: env.getEnv(),
    });
    ptyProcess.on('data', function(data) {
      term.write(data);
    });
    // todo 禁用命令行输入
    term.on('data', (data) => {
      ptyProcess.write(data);
    });

    term.ptyProcess = ptyProcess;
  };

  newline(cwd) {
    if (terms[cwd] && terms[cwd].ptyProcess) {
      terms[cwd].ptyProcess.write('\r');
    }
  }

  write(cwd, data) {
    if (terms[cwd]) {
      terms[cwd].write(data);
    }
  }

  writeln(cwd, data) {
    if (terms[cwd]) {
      terms[cwd].writeln(data);
    }
  }

  clear(cwd) {
    if (terms[cwd]) {
      terms[cwd].clear();
    }
  }

  resize(cwd, cols, rows) {
    terms[cwd].resize(cols, rowsOffset(rows));
    if (terms[cwd].ptyProcess) {
      terms[cwd].ptyProcess.resize(cols, rowsOffset(rows));
    }
  }

  getTerm(cwd) {
    return terms[cwd];
  }
}

export default new Terms();
