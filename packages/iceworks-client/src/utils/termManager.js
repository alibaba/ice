/* eslint no-underscore-dangle:0 */
import { Terminal } from 'xterm';
import dateTime from 'date-time';
import * as fit from 'xterm/dist/addons/fit/fit';
import * as webLinks from 'xterm/dist/addons/webLinks/webLinks';

// default theme
// api: https://xtermjs.org/docs/api/terminal/interfaces/itheme/
const defaultTheme = {
  foreground: '#fff',
  background: '#333646',
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

// format and write the text content of the terminal
const writeChunkFn = (term) => {
  const writeChunk = (data, ln = true) => {
    if (data && data.indexOf('\n') !== -1) {
      data.split('\n').forEach((value) => writeChunk(value));
      return;
    }
    if (typeof data === 'string') {
      if (ln) {
        term.writeln(` ${data}`);
      } else {
        term.write(` ${data}`);
      }
    } else {
      term.writeln('');
    }
  };
  return writeChunk;
};


const writeLog = (term) => (data) => term.writeln(` ${dateTime()} ${data}`);

class TermManager {
  constructor() {
    this.terms = {};
  }

  /**
   * create new terminal
   * @param {string} id
   * @param {string} container
   * @param {object} container
   */
  create(id, container, options = {}) {
    const opts = Object.assign({}, defaultOptions, options);
    if (!this.terms[id]) {
      this.terms[id] = new Terminal(opts);
      this.terms[id].writeChunk = writeChunkFn(this.terms[id]);
      this.terms[id].writeLog = writeLog(this.terms[id]);
    } else {
      this.terms[id]._core.options.theme = opts.theme;
    }

    // initialize the web links addon, registering the link matcher
    webLinks.webLinksInit(this.terms[id], (event, uri) => {
      window.open(uri, 'blank');
    });

    // opens the terminal within an element.
    this.terms[id].open(container);

    // Note: need to initialize the fit plugin when the component is re-rendered
    // make the terminal's size and geometry fit the size of #terminal-container
    this.terms[id].fit();

    return this.terms[id];
  }

  /**
   * get current terminal
   * @param {string} id
   */
  find(id) {
    return this.terms[id];
  }
}

export default new TermManager();
