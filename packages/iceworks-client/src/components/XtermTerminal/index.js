import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Terminal } from 'xterm';
import 'xterm/dist/xterm.css';
import styles from './index.module.scss';

const XtermTerminal = () => {
  const xtermRef = useRef(null);

  const term = new Terminal();

  useEffect(() => {
    term.open(xtermRef.current);
    term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
  }, []);

  return <div ref={xtermRef} className={styles.xtermContainer} />;
};

XtermTerminal.defaultProps = {};

XtermTerminal.propTypes = {};

export default XtermTerminal;
