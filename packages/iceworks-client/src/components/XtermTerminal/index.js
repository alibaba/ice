import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@components/Icon';
import termManager from '@utils/termManager';
import useTermTheme from '@hooks/useTermTheme';
import 'xterm/dist/xterm.css';
import styles from './index.module.scss';

const XtermTerminal = ({ id, name, options }) => {
  const xtermRef = useRef(id);

  useEffect(() => {
    // current terminal instance
    const currentTerm = termManager.create(id, xtermRef.current, options);
    if (!currentTerm.inited) {
      currentTerm.inited = true;

      if (name) {
        currentTerm.writeChunk(`${name}\x1B[0m `);
      }
    }
  }, []);

  const { termTheme } = useTermTheme();
  const term = termManager.find(id);
  if (term) {
    term.setOption('theme', termTheme);
  }


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

XtermTerminal.defaultProps = {
  options: {},
};

XtermTerminal.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.object,
};

export default XtermTerminal;
