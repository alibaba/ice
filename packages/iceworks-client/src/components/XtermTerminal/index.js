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
  foreground: '#f0f0f0',
  background: 'transparent',
  selection: 'rgba(248,28,229,0.3)',
};

Terminal.applyAddon(fit);
Terminal.applyAddon(webLinks);

function initTerminal() {
  return new Terminal({
    cols: 100,
    rows: 30,
    theme: defaultTheme,
  });
}

function setTextContent(value, terminal, ln = true) {
  if (value && value.indexOf('\n') !== -1) {
    value.split('\n').forEach((v) => setTextContent(v, terminal));
    return;
  }
  if (typeof value === 'string') {
    if (ln) {
      terminal.writeln(value);
    } else {
      terminal.write(value);
    }
  } else {
    terminal.writeln('');
  }
}

const XtermTerminal = () => {
  const xtermRef = useRef(null);
  const project = stores.useStore('project');
  const terminal = initTerminal();

  useEffect(() => {
    logger.debug('xterm loaded.');

    terminal.open(xtermRef.current);
    terminal.fit();
    terminal.write(`\x1B[1;3;31m${project.dataSource.name}\x1B[0m $ `);
  }, []);

  useSocket('project.index.dev.data', (data) => {
    setTextContent(data, terminal);
  });

  return <div ref={xtermRef} className={styles.xtermContainer} />;
};

XtermTerminal.defaultProps = {};

XtermTerminal.propTypes = {};

export default XtermTerminal;
