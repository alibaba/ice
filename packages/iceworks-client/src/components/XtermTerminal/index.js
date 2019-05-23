import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import useSocket from '@hooks/useSocket';
import Icon from '@components/Icon';
import term from './term';
import styles from './index.module.scss';

let inited = false;

const XtermTerminal = ({ name, startEventName, stopEventName }) => {
  const xtermRef = useRef(null);

  useEffect(() => {
    // new terminal
    term.new(name, xtermRef.current);
    if (!inited) {
      term.write(name, `\x1B[1;3;31m${name}\x1B[0m $ `);
      inited = true;
    }
  }, []);

  // format and write the text content of the terminal
  const writeContent = (data, ln = true) => {
    if (data && data.indexOf('\n') !== -1) {
      data.split('\n').forEach((v) => writeContent(v));
      return;
    }
    if (typeof data === 'string') {
      if (ln) {
        term.writeln(name, ` ${data}`);
      } else {
        term.write(name, ` ${data}`);
      }
    } else {
      term.writeln(name, '');
    }
  };

  // receive start data
  useSocket(startEventName, (data) => {
    writeContent(data);
  });

  // receive stop data
  useSocket(stopEventName, (data) => {
    writeContent(data);
    term.write(name, `\n\x1B[1;3;31m${name}\x1B[0m $ `);
  });

  return (
    <div className={styles.xtermContainer}>
      <Icon
        type="clear"
        className={styles.clearIcon}
        onClick={() => term.clear(name)}
      />
      <div ref={xtermRef} />
    </div>
  );
};

XtermTerminal.defaultProps = {};

XtermTerminal.propTypes = {
  name: PropTypes.string.isRequired,
  startEventName: PropTypes.string.isRequired,
  stopEventName: PropTypes.string.isRequired,
};

export default XtermTerminal;
