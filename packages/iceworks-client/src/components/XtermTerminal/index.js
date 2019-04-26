import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Terminal } from 'xterm';
import socket from '@utils/socket';
import * as fit from 'xterm/dist/addons/fit/fit';
import * as webLinks from 'xterm/dist/addons/webLinks/webLinks';
import 'xterm/dist/xterm.css';
import styles from './index.module.scss';

Terminal.applyAddon(fit);
Terminal.applyAddon(webLinks);

const XtermTerminal = () => {
  const xtermRef = useRef(null);

  useEffect(() => {
    const term = new Terminal({
      cols: 100,
      rows: 30,
    });

    term.open(xtermRef.current);
    term.write('\x1B[1;3;31mIceworks CLI\x1B[0m $ ');
    socket.on('output', (data) => {
      term.write(data);
    });
  }, []);

  return <div ref={xtermRef} className={styles.xtermContainer} />;
};

XtermTerminal.defaultProps = {};

XtermTerminal.propTypes = {};

export default XtermTerminal;
