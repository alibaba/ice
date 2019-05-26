/* eslint object-curly-newline:0 */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import useSocket from '@hooks/useSocket';
import Icon from '@components/Icon';
import term from './term';
import styles from './index.module.scss';

const XtermTerminal = ({ id, projectName, startEventName, stopEventName }) => {
  const xtermRef = useRef(id);

  useEffect(() => {
    // new terminal
    term.new(id, projectName, xtermRef.current);
  }, []);

  // format and write the text content of the terminal
  const writeContent = (data, ln = true) => {
    if (data && data.indexOf('\n') !== -1) {
      data.split('\n').forEach((v) => writeContent(v));
      return;
    }
    if (typeof data === 'string') {
      if (ln) {
        term.writeln(id, ` ${data}`);
      } else {
        term.write(id, ` ${data}`);
      }
    } else {
      term.writeln(id, '');
    }
  };

  // receive start data
  useSocket(startEventName, (data) => {
    writeContent(data);
  });

  // receive stop data
  useSocket(stopEventName, (data) => {
    writeContent(data);
    term.write(id, `\n\x1B[1;3;31m${projectName}\x1B[0m $ `);
  });

  return (
    <div className={styles.xtermContainer}>
      <Icon
        type="clear"
        className={styles.clearIcon}
        onClick={() => term.clear(id)}
      />
      <div ref={xtermRef} />
    </div>
  );
};

XtermTerminal.defaultProps = {};

XtermTerminal.propTypes = {
  id: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  startEventName: PropTypes.string.isRequired,
  stopEventName: PropTypes.string.isRequired,
};

export default XtermTerminal;
