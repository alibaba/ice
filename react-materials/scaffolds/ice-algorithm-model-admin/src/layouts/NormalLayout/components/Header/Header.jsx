import React, { Component } from 'react';

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
          <a href="/" style={styles.logoLink}>
            算法模型服务平台
          </a>
        </div>
        <ul style={styles.nav}>
          <li style={styles.navItem}>
            <a href="/" style={{ ...styles.navItemLink, ...styles.active }}>
              首页
            </a>
          </li>
          <li style={styles.navItem}>
            <a href="/#/model/performance" style={styles.navItemLink}>
              模型服务
            </a>
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
    padding: '30px 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  logoLink: {
    color: '#66c7f5',
    fontSize: '30px',
    fontWeight: '200',
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
    background: '#6ac8f3',
    color: '#fff',
    borderRadius: '4px',
  },
};
