import React from 'react';
import clsx from 'clsx';
import styles from './area.module.css';

function AreaWrapper({ title, decs, contentStyle, containerStyle, children, isBlock, style }) {
  return (
    <div className={isBlock && styles.block}>
      <div className={clsx(styles.container, containerStyle)} style={style || {}}>
        <div className={styles.titleContent}>
          <h2>{title}</h2>
          <p>{decs}</p>
        </div>
        <div className={contentStyle}>{children}</div>
      </div>
    </div>
  );
}

export default AreaWrapper;
