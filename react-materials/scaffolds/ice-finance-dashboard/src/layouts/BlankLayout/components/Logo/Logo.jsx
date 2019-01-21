import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class Logo extends PureComponent {
  render() {
    return (
      <Link to="/" style={{ ...styles.logo }}>
        <span style={styles.brand}>LOGO</span>
        <span style={styles.text}>互联网金融销售实时监控</span>
      </Link>
    );
  }
}

const styles = {
  logo: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  brand: {
    padding: '0 15px',
    fontSize: '34px',
    color: '#f7da47',
    display: 'inline-block',
  },
  text: {
    fontSize: '30px',
    color: '#fff',
  },
};
