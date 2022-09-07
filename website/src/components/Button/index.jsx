import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { join } from '../../utils/path';
import styles from './button.module.css';

function Button({ primary = true, url, children }) {
  const context = useDocusaurusContext();
  const source = join(context.siteConfig.baseUrl, url);
  return (
    <a href={source} className={clsx(styles.button, primary && styles.primary)}>
      {children}
    </a>
  );
}

export default Button;
