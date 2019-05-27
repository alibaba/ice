/* eslint object-curly-newline:0 */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@components/Icon';
import term from './term';
import styles from './index.module.scss';

const XtermTerminal = ({ id, name, eventHandle }) => {
  const xtermRef = useRef(id);

  useEffect(() => {
    // new terminal
    term.new(id, name, xtermRef.current);
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

  // Listen start event function
  eventHandle(writeContent);

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
  name: PropTypes.string.isRequired,
  eventHandle: PropTypes.func.isRequired,
};

export default XtermTerminal;
