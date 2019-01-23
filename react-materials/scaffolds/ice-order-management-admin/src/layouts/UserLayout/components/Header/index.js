import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default () => {
  return (
    <div style={styles.container}>
      <Link to="/" style={styles.logoLink}>
        LOGO
      </Link>
    </div>
  );
};

const styles = {
  container: {
    height: '60px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
    display: 'flex',
    justifyContent: 'space-between',
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    paddingLeft: '20px',
    color: '#fff',
  },
};
