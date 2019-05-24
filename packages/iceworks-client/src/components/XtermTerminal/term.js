/* eslint no-underscore-dangle:0 */
import { Terminal } from 'xterm';
import * as fit from 'xterm/dist/addons/fit/fit';
import * as webLinks from 'xterm/dist/addons/webLinks/webLinks';
import 'xterm/dist/xterm.css';

// default theme
// api: https://xtermjs.org/docs/api/terminal/interfaces/itheme/
const defaultTheme = {
  foreground: '#666',
  background: '#EEF3F9',
  cursor: 'rgba(0, 0, 0, 0.5)',
  selection: 'rgba(0, 0, 0, 0.5)',
  brightGreen: '#42b983',
  brightYellow: '#ea6e00',
};

// default options
const defaultOptions = {
  cols: 100,
  rows: 30,
  theme: defaultTheme,
};

// initialize addon
Terminal.applyAddon(fit);
Terminal.applyAddon(webLinks);

// cache terminal instance
const terms = {};

const term = {
  /**
   * create new terminal
   */
  new: (cwd, container) => {
    if (!terms[cwd]) {
      terms[cwd] = new Terminal(defaultOptions);
      terms[cwd].write(`\x1B[1;3;31m${cwd}\x1B[0m $ `);
    } else {
      terms[cwd]._core.options.theme = defaultTheme;
    }

    // initialize the web links addon, registering the link matcher
    webLinks.webLinksInit(terms[cwd], term.openLink);

    // opens the terminal within an element.
    terms[cwd].open(container);

    // make the terminal's size and geometry fit the size of #terminal-container
    terms[cwd].fit();
  },

  /**
   * writes text to the terminal.
   */
  write: (cwd, data) => {
    if (terms[cwd]) {
      terms[cwd].write(data);
    }
  },

  /**
   * writes text to the terminal, followed by a break line character (\n).
   */
  writeln: (cwd, data) => {
    if (terms[cwd]) {
      terms[cwd].writeln(data);
    }
  },

  /**
   * clear the entire buffer, making the prompt line the new first line.
   */
  clear: (cwd) => {
    if (terms[cwd]) {
      terms[cwd].clear();
    }
  },

  /**
   * get current terminal instance
   */
  get: (cwd) => {
    return terms[cwd];
  },

  /**
   * open web links
   * api: https://github.com/xtermjs/xterm.js/blob/master/src/addons/webLinks/webLinks.ts
   * @param {*} uri
   */
  openLink: (event, uri) => {
    window.open(uri, 'blank');
  },
};

export default term;
