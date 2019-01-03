import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ style }) => {
  return (
    <Link to="/" style={{ ...styles.logo, ...style }}>
      资产管理系统
    </Link>
  );
};

const styles = {
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#fff',
  },
};

export default Logo;
