import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

export default class Logo extends PureComponent {
  render() {
    return (
      <Link to="/" className={styles.logoStyle} style={this.props.style}>
        应用管理系统
      </Link>
    );
  }
}

