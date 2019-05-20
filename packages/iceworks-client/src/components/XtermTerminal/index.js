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

Terminal.applyAddon(fit);
Terminal.applyAddon(webLinks);

const XtermTerminal = () => {
  const xtermRef = useRef(null);
  const project = stores.useStore('project');

  const term = new Terminal({
    cols: 100,
    rows: 30,
  });

  useEffect(() => {
    logger.debug('xterm loaded.');

    term.open(xtermRef.current);
    term.fit();
    term.write(`\x1B[1;3;31m${project.dataSource.name}\x1B[0m $ `);
  }, []);

  useSocket('project.index.dev.data', (data) => {
    term.write(data);
  });

  return <div ref={xtermRef} className={styles.xtermContainer} />;
};

XtermTerminal.defaultProps = {};

XtermTerminal.propTypes = {};

export default XtermTerminal;
