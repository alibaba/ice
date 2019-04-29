import React, { useRef, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Terminal } from 'xterm';
import { ICEWORKS_TASK_DEV_DATA } from 'iceworks-events';
import { useSocket } from '@hooks/useSocket';
import * as fit from 'xterm/dist/addons/fit/fit';
import * as webLinks from 'xterm/dist/addons/webLinks/webLinks';
import 'xterm/dist/xterm.css';
import styles from './index.module.scss';

Terminal.applyAddon(fit);
Terminal.applyAddon(webLinks);

const XtermTerminal = () => {
  const xtermRef = useRef(null);

  const term = new Terminal({
    cols: 100,
    rows: 30,
  });

  useEffect(() => {
    term.open(xtermRef.current);
    term.fit();
    term.write('\x1B[1;3;31mIceworks CLI\x1B[0m $ ');
  }, []);

  useSocket(ICEWORKS_TASK_DEV_DATA, (data) => {
    term.write(data);
  });

  return <div ref={xtermRef} className={styles.xtermContainer} />;
};

XtermTerminal.defaultProps = {};

XtermTerminal.propTypes = {};

export default XtermTerminal;
