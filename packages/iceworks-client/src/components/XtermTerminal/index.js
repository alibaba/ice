import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Terminal } from 'xterm';
import socket from '@utils/socket';
import * as fit from 'xterm/dist/addons/fit/fit';
import * as webLinks from 'xterm/dist/addons/webLinks/webLinks';
import 'xterm/dist/xterm.css';
import styles from './index.module.scss';

// Terminal.applyAddon(fit);
// Terminal.applyAddon(webLinks);

const XtermTerminal = () => {
  const xtermRef = useRef(null);

  const term = new Terminal();

  useEffect(() => {
    term.open(xtermRef.current);
    term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
    term.on('data', (data) => socket.emit('input', data));
    socket.on('output', (arrayBuffer) => {
      term.write(arrayBuffer);
    });
  }, []);

  return <div ref={xtermRef} className={styles.xtermContainer} />;
};

XtermTerminal.defaultProps = {};

XtermTerminal.propTypes = {};

export default XtermTerminal;

// const defaultTheme = {
//   foreground: '#2c3e50',
//   background: '#fff',
//   cursor: 'rgba(0, 0, 0, .4)',
//   selection: 'rgba(0, 0, 0, 0.3)',
//   black: '#000000',
//   red: '#e83030',
//   brightRed: '#e83030',
//   green: '#42b983',
//   brightGreen: '#42b983',
//   brightYellow: '#ea6e00',
//   yellow: '#ea6e00',
//   magenta: '#e83030',
//   brightMagenta: '#e83030',
//   cyan: '#03c2e6',
//   brightBlue: '#03c2e6',
//   brightCyan: '#03c2e6',
//   blue: '#03c2e6',
//   white: '#d0d0d0',
//   brightBlack: '#808080',
//   brightWhite: '#ffffff',
// };

// const darkTheme = {
//   ...defaultTheme,
//   foreground: '#fff',
//   background: '#1d2935',
//   cursor: 'rgba(255, 255, 255, .4)',
//   selection: 'rgba(255, 255, 255, 0.3)',
//   magenta: '#e83030',
//   brightMagenta: '#e83030',
// };
