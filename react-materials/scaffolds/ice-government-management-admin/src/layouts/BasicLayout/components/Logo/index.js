import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styleNames from './index.module.scss';

export default class Logo extends PureComponent {
  render() {
    return (
      <Link to="/" className={styleNames.logoStyle} style={{
        ...styles.logoStyle,
        ...this.props.style
      }}>
        政府管理系统
      </Link>
    );
  }
}
const styles = {
  logoStyle: {
    display: 'block',
    maxWidth: '180px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: '#fff',
    textDecoration: 'none',
  },
}
