/* eslint no-underscore-dangle:0 */
import { Terminal } from 'xterm';
import * as fit from 'xterm/dist/addons/fit/fit';
import * as webLinks from 'xterm/dist/addons/webLinks/webLinks';

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

class TermManager {
  constructor() {
    this.terms = {};
  }

  /**
   * new terminal
   * @param {string} id
   * @param {string} container
   * @param {object} container
   */
  create(id, container, options = {}) {
    const opts = Object.assign({}, defaultOptions, options);
    if (!this.terms[id]) {
      this.terms[id] = new Terminal(opts);
    } else {
      this.terms[id]._core.options.theme = opts.theme;
    }

    // initialize the web links addon, registering the link matcher
    webLinks.webLinksInit(this.terms[id], (event, uri) => {
      window.open(uri, 'blank');
    });

    // opens the terminal within an element.
    this.terms[id].open(container);

    // make the terminal's size and geometry fit the size of #terminal-container
    this.terms[id].fit();
  }

  /**
   * get current terminal
   * @param {string} id
   */
  find(id) {
    return this.terms[id];
  }

  /**
   * format and write the text content of the terminal
   * @param {string} id
   * @param {string} data
   * @param {boolean} ln
   */
  formatWrite(id, data, ln = true) {
    if (data && data.indexOf('\n') !== -1) {
      data.split('\n').forEach((value) => this.formatWrite(id, value));
      return;
    }
    if (typeof data === 'string') {
      if (ln) {
        this.terms[id].writeln(` ${data}`);
      } else {
        this.terms[id].write(` ${data}`);
      }
    } else {
      this.terms[id].writeln('');
    }
  }
}

export default new TermManager();
