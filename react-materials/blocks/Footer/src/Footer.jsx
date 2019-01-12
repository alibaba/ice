import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

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
          <Row wrap style={styles.content}>
            <Col xxs={24} m={6}>
              <h2 style={styles.logo}>LOGO</h2>
            </Col>
            <Col xxs={24} m={12}>
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
            </Col>

            <Col xxs={24} m={6} style={styles.share}>
              <img
                style={styles.shareIcon}
                src={require('./images/TB1JkgmjnnI8KJjy0FfXXcdoVXa-60-48.png')}
                alt=""
              />
              <img
                style={{ ...styles.shareIcon, ...styles.weChart }}
                src={require('./images/TB1hEz2jf6H8KJjy0FjXXaXepXa-60-48.png')}
                alt=""
              />
            </Col>
            <p style={styles.copyRight}> © 2017 Taobao FED</p>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: '1080px',
    margin: '0 auto',
  },
  logo: {
    color: '#3080FE',
    fontWeight: 'bold',
    fontSize: '28px',
    margin: '12px 0',
  },
  nav: {
    width: '400px',
    margin: '0 auto',
    display: 'flex',
  },
  navItem: {
    width: '25%',
    lineHeight: '54px',
    listStyle: 'none',
    textAlign: 'center',
  },
  navLink: {
    color: '#666',
    display: 'block',
  },
  share: {
    lineHeight: '54px',
    textAlign: 'center',
  },
  shareIcon: {
    width: '22px',
    height: '16px',
  },
  weChart: {
    marginLeft: '20px',
  },
  copyRight: {
    display: 'flex',
    width: '100%',
    marginTop: '40px',
    justifyContent: 'center',
    fontSize: '12px',
  },
};
