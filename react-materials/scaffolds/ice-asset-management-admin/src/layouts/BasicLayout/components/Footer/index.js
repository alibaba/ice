import React, { PureComponent } from 'react';

import styles from './index.module.scss';

export default class Footer extends PureComponent {
  render() {
    return (
      <div className={styles.footerContainer}>
        <div className={styles.logo}>
          资产管理系统
        </div>
        <div className={styles.copyright}>
          © 2018 Theme designed by{' '}
          <a
            href="https://github.com/alibaba/ice"
            target="_blank"
            className={styles.copyrightLink}
            rel="noopener noreferrer"
          >
            ICE
          </a>
        </div>
      </div>
    );
  }
}
