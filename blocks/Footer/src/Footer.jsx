import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

export default class Footer extends Component {
  static displayName = 'Footer';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="footer" style={styles.footer}>
        <IceContainer>
          <div style={styles.content}>
            <h2 style={styles.logo}>LOGO</h2>
            <ul style={styles.nav}>
              <li style={styles.navItem}>
                <a style={styles.navLink} href="/">
                  首页
                </a>
              </li>
              <li style={styles.navItem}>
                <a style={styles.navLink} href="/">
                  联系
                </a>
              </li>
              <li style={styles.navItem}>
                <a style={styles.navLink} href="/">
                  条款
                </a>
              </li>
              <li style={styles.navItem}>
                <a style={styles.navLink} href="/">
                  关于
                </a>
              </li>
            </ul>
            <div style={styles.share}>
              <img
                style={styles.shareIcon}
                src="https://img.alicdn.com/tfs/TB1JkgmjnnI8KJjy0FfXXcdoVXa-60-48.png"
                alt=""
              />
              <img
                style={{ ...styles.shareIcon, ...styles.weChart }}
                src="https://img.alicdn.com/tfs/TB1hEz2jf6H8KJjy0FjXXaXepXa-60-48.png"
                alt=""
              />
            </div>
            <p style={styles.copyRight}> © 2017 Taobao FED</p>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '1080px',
    margin: '0 auto',
  },
  logo: {
    color: '#3080FE',
    fontWeight: 'bold',
    fontSize: '28px',
    margin: '12px 0',
  },
  nav: { width: '400px', margin: '0 auto', display: 'flex' },
  navItem: { width: '25%', lineHeight: '54px', textAlign: 'center' },
  navLink: { color: '#666', display: 'block' },
  share: { lineHeight: '54px' },
  shareIcon: { width: '22px', height: '16px' },
  weChart: { marginLeft: '20px' },
  copyRight: {
    display: 'flex',
    width: '100%',
    marginTop: '40px',
    justifyContent: 'center',
    fontSize: '12px',
  },
};
