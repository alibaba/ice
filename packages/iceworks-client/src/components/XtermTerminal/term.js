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
  new: (id, name, container) => {
    if (!terms[id]) {
      terms[id] = new Terminal(defaultOptions);
      terms[id].write(`\x1B[1;3;31m${name}\x1B[0m $ `);
    } else {
      terms[id]._core.options.theme = defaultTheme;
    }

    // initialize the web links addon, registering the link matcher
    webLinks.webLinksInit(terms[id], term.openLink);

    // opens the terminal within an element.
    terms[id].open(container);

    // make the terminal's size and geometry fit the size of #terminal-container
    terms[id].fit();
  },

  /**
   * writes text to the terminal.
   */
  write: (id, data) => {
    if (terms[id]) {
      terms[id].write(data);
    }
  },

  /**
   * writes text to the terminal, followed by a break line character (\n).
   */
  writeln: (id, data) => {
    if (terms[id]) {
      terms[id].writeln(data);
    }
  },

  /**
   * clear the entire buffer, making the prompt line the new first line.
   */
  clear: (id) => {
    if (terms[id]) {
      terms[id].clear();
    }
  },

  /**
   * get current terminal instance
   */
  get: (id) => {
    return terms[id];
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
