import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Logo extends Component {
  render() {
    return (
      <div style={styles.container}>
        <img
          src={require('./images/logo.png')}
          style={styles.logoImg}
          alt="logo"
        />
        <Link to="/" style={styles.logoText}>
          数据监控系统
        </Link>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '20px',
  },
  logoImg: {
    width: '40px',
  },
  logoText: {
    display: 'block',
    maxWidth: '180px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginLeft: '10px',
    fontSize: '22px',
    color: '#fff',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
};
