import React from 'react';
import { Icon } from '@icedesign/base';
import { Link } from 'react-router-dom';
import './index.scss';

export default () => {
  return (
    <div style={styles.container}>
      <Link to="/" style={styles.logoLink}>
        LOGO
      </Link>
      <ul style={styles.navs}>
        <li className="nav-menu" style={styles.navMenu}>
          <a href="#" style={{ ...styles.navLink, ...styles.NavIconLink }}>
            <img
              src="https://img.alicdn.com/tfs/TB1crknwzDpK1RjSZFrXXa78VXa-32-32.png"
              alt=""
              style={styles.internationalImg}
            />
            中国站
            <Icon type="arrow-up" size="xs" className="arrow-up-icon" />
            <Icon type="arrow-down" size="xs" className="arrow-down-icon" />
          </a>
          <ul className="sub-navs" style={styles.subNavs}>
            <li style={styles.subNavMenu}>
              <a href="#" style={styles.subNavLink}>
                International
              </a>
            </li>
            <li style={styles.subNavMenu}>
              <a href="#" style={styles.subNavLink}>
                日本サイト
              </a>
            </li>
          </ul>
        </li>
        <li style={styles.navMenu}>
          <a href="#" style={styles.navLink}>
            首页
          </a>
        </li>
      </ul>
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
  navs: {
    display: 'flex',
  },
  navMenu: {
    position: 'relative',
  },
  navLink: {
    display: 'block',
    height: '60px',
    lineHeight: '60px',
    padding: '0 20px',
    fontSize: '15px',
    color: '#fff',
    textDecoration: 'none',
  },
  NavIconLink: {
    padding: '0 30px',
  },
  subNavs: {
    position: 'absolute',
    left: '0',
    width: '140px',
    background: '#272B2F',
  },
  subNavMenu: {
    height: '38px',
    lineHeight: '38px',
  },
  subNavLink: {
    paddingLeft: '12px',
    display: 'block',
    color: '#fff',
    fontSize: '14px',
  },
  internationalImg: {
    width: '16px',
    height: '16px',
    position: 'absolute',
    left: '10px',
    top: '22px',
  },
};
