import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@components/Icon';
import termManager from '@utils/termManager';
import 'xterm/dist/xterm.css';
import styles from './index.module.scss';

const XtermTerminal = ({ id, name, options }) => {
  const xtermRef = useRef(id);

  // current terminal instance
  let currentTerm;

  useEffect(() => {
    termManager.create(id, xtermRef.current, options);
    currentTerm = termManager.find(id);
    currentTerm.write(`\x1B[1;3;31m${name}\x1B[0m $ `);
  }, []);

  return (
    <div className={styles.xtermContainer}>
      <Icon
        type="clear"
        className={styles.clearIcon}
        onClick={() => currentTerm.clear(id)}
      />
      <div ref={xtermRef} />
    </div>
  );
};

XtermTerminal.defaultProps = {
  options: {},
};

XtermTerminal.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.object,
};

export default XtermTerminal;
