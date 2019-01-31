import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

export default class Logo extends PureComponent {
  render() {
    return (
      <Link to="/" className={styles.logo}>
        <span className={styles.brand}>LOGO</span>
        <span className={styles.text}>互联网金融销售实时监控</span>
      </Link>
    );
  }
}
