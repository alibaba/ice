import React, { PureComponent } from 'react';
import styles from './index.module.scss';

export default class Footer extends PureComponent {
  render() {
    return (
      <div className={styles.footerContainer}>
        <h2 className={styles.title}>
          合同管理系统
        </h2>
        <div className={styles.copyright}>
          © 2018 Theme designed by{' '}
          <a
            href="https://github.com/alibaba/ice"
            target="_blank"
            className="copyright-link"
            rel="noopener noreferrer"
          >
            ICE
          </a>
        </div>
      </div>
    );
  }
}
