import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

export default class NormalFooter extends Component {
  static displayName = 'NormalFooter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="normal-footer">
        <IceContainer>
          <Row wrap style={styles.content}>
            <Col l="4" xxs="24">
              <a href="#" style={styles.brand}>
                <img
                  src={require('./images/TB1saOBbYGYBuNjy0FoXXciBFXa-218-58.png')}
                  alt=""
                  style={styles.logo}
                />
              </a>
            </Col>
            <Col l="16" xxs="24">
              <div style={{ ...styles.nav, ...styles.pullCenter }}>
                <a href="#" style={styles.navLink}>
                  Home
                </a>
                <a href="#" style={styles.navLink}>
                  Shop
                </a>
                <a href="#" style={styles.navLink}>
                  Blog
                </a>
                <a href="#" style={styles.navLink}>
                  Service
                </a>
                <a href="#" style={styles.navLink}>
                  About
                </a>
                <a href="#" style={{ ...styles.navLink, marginRight: 0 }}>
                  Contact
                </a>
              </div>
            </Col>
            <Col l="4" xxs="24">
              <div style={styles.pullRight}>
                <a href="#">
                  <img
                    src={require('./images/TB1JkgmjnnI8KJjy0FfXXcdoVXa-60-48.png')}
                    alt=""
                    style={{ ...styles.socialImg, marginRight: '16px' }}
                  />
                </a>
                <a href="#">
                  <img
                    src={require('./images/TB1hEz2jf6H8KJjy0FjXXaXepXa-60-48.png')}
                    alt=""
                    style={styles.socialImg}
                  />
                </a>
              </div>
            </Col>
          </Row>
          <div style={styles.line} />
          <div style={{ ...styles.copyright, ...styles.pullCenter }}>
            © Copyright 2018. All rights reserved.
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  content: {
    alignItems: 'center',
    padding: '16px 0',
  },
  logo: {
    width: '86px',
  },
  pullCenter: {
    textAlign: 'center',
  },
  pullRight: {
    textAlign: 'right',
  },
  navLink: {
    marginRight: '20px',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  socialImg: {
    width: '22px',
    height: '16px',
  },
  line: {
    margin: '16px 0',
    borderBottom: '1px solid rgba(120,130,140,.13)',
  },
  copyright: {
    color: '#999',
    fontSize: '12px',
  },
};
