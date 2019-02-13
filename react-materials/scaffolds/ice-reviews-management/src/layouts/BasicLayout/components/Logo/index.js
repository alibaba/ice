import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class Logo extends PureComponent {
  render() {
    return (
      <Link to="/" style={{ ...styles.logoStyle, ...this.props.style }}>
        LOGO
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
    fontSize: '28px',
    color: '#fff',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
};
