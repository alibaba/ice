import React, { useRef, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Terminal } from 'xterm';
import useSocket from '@hooks/useSocket';
import * as fit from 'xterm/dist/addons/fit/fit';
import * as webLinks from 'xterm/dist/addons/webLinks/webLinks';
import stores from '@stores';
import 'xterm/dist/xterm.css';
import log from '@utils/logger';
import styles from './index.module.scss';

const logger = log.getLogger('xterm');

// default theme
const defaultTheme = {
  foreground: '#666',
  background: '#EEF3F9',
  cursor: 'rgba(0, 0, 0, 0.5)',
  selection: 'rgba(0, 0, 0, 0.5)',
  brightGreen: '#42b983',
  brightYellow: '#ea6e00',
};

// initialize addon
Terminal.applyAddon(fit);
Terminal.applyAddon(webLinks);

/**
 * initialize Terminal
 */
function initTerminal() {
  return new Terminal({
    cols: 100,
    rows: 30,
    theme: defaultTheme,
  });
}

/**
 * format the text content of the terminal
 * @param {*} value current data stream
 * @param {*} terminal terminal instance
 * @param {*} ln
 */
function setTextContent(value, terminal, ln = true) {
  if (value && value.indexOf('\n') !== -1) {
    value.split('\n').forEach((v) => setTextContent(v, terminal));
    return;
  }
  if (typeof value === 'string') {
    if (ln) {
      terminal.writeln(` ${value}`);
    } else {
      terminal.write(` ${value}`);
    }
  } else {
    terminal.writeln('');
  }
}

/**
 * open web links
 * https://github.com/xtermjs/xterm.js/blob/master/src/addons/webLinks/webLinks.ts
 * @param {*} event
 * @param {*} uri
 */
function handleLink(event, uri) {
  window.open(uri, '_blank');
}

const XtermTerminal = () => {
  const xtermRef = useRef(null);
  const project = stores.useStore('project');
  const terminal = initTerminal();

  useEffect(() => {
    logger.debug('xterm loaded.');

    // initialize the web links addon, registering the link matcher
    webLinks.webLinksInit(terminal, handleLink);
    terminal.open(xtermRef.current);
    terminal.fit();
    terminal.write(`\x1B[1;3;31m${project.dataSource.name}\x1B[0m $ `);
  }, []);

  // receive start data
  useSocket('project.index.start.data', (data) => {
    setTextContent(data, terminal);
  });

  // receive stop data
  useSocket('project.index.stop.data', (data) => {
    setTextContent(data, terminal);
    terminal.write('\n');
    terminal.write(`\x1B[1;3;31m${project.dataSource.name}\x1B[0m $ `);
  });

  return <div ref={xtermRef} className={styles.xtermContainer} />;
};

XtermTerminal.defaultProps = {};

XtermTerminal.propTypes = {};

export default XtermTerminal;
