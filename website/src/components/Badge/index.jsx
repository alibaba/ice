import React from 'react';
import styles from './badge.module.css';

function Badge({ type = 'error', text }) {
  return (
    <div className={`${styles.badge} ${styles[type]}`}>
      {text}
    </div>
  );
}

export default Badge;
