import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class Logo extends PureComponent {
  render() {
    return (
      <Link to="/" style={{ ...styles.logo, ...this.props.style }}>
        LOGO
      </Link>
    );
  }
}

const styles = {
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#447eff',
  },
};
