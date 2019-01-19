import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

export default class SimpleFooter extends Component {
  static displayName = 'SimpleFooter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="simple-footer">
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
            <Col l="20" xxs="24">
              <div style={styles.nav}>
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
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  content: {
    alignItems: 'center',
  },
  logo: {
    width: '86px',
  },
  nav: {
    textAlign: 'right',
  },
  navLink: {
    marginRight: '20px',
    color: 'rgba(0, 0, 0, 0.87)',
  },
};
