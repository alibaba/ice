import React from 'react';
import clsx from 'clsx';
import styles from './button.module.css'

function Button({ primary = true, url, children }) {
  return (
    <a href={url} className={clsx(styles.button, primary && styles.primary)}>
      {children}
    </a>
  );
}

export default Button;
