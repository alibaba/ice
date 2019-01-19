import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  static displayName = 'Header';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.header}>
        <div style={styles.logo}>
          <Link to="/" style={styles.logoLink}>
            LOGO
          </Link>
        </div>
        <ul style={styles.nav}>
          <li style={styles.navItem}>
            <Link to="/" style={{ ...styles.navItemLink, ...styles.active }}>
              首页
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

const styles = {
  header: {
    width: '1200px',
    margin: '0 auto',
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  logoLink: {
    color: '#66c7f5',
    fontSize: '30px',
    fontWeight: '500',
    textDecoration: 'none',
  },
  nav: {
    display: 'flex',
  },
  navItem: {
    height: '40px',
    lineHeight: '40px',
    marginLeft: '20px',
  },
  navItemLink: {
    display: 'inline-block',
    padding: '0 20px',
    color: '#999',
    textDecoration: 'none',
  },
  active: {
    background: '#407ee3',
    color: '#fff',
    borderRadius: '4px',
  },
};
