import React, { Component } from 'react';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

export default class FooterInfo extends Component {
  static displayName = 'FooterInfo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="footer-info" style={styles.container}>
        <div style={styles.items}>
          <Row wrap gutter="20">
            <Col xxs="24" s="8" l="8">
              <div style={styles.item}>
                <h2 style={styles.itemTitle}>产品介绍</h2>
                <ul style={styles.nav}>
                  <li style={styles.navItem}>
                    <a style={styles.navLink} href="/">
                      组件
                    </a>
                  </li>
                  <li style={styles.navItem}>
                    <a style={styles.navLink} href="/">
                      模块
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xxs="24" s="8" l="8">
              <div style={styles.item}>
                <h2 style={styles.itemTitle}>合作伙伴</h2>
                <ul style={styles.nav}>
                  <li style={styles.navItem}>
                    <a style={styles.navLink} href="/">
                      淘宝
                    </a>
                  </li>
                  <li style={styles.navItem}>
                    <a style={styles.navLink} href="/">
                      天猫
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xxs="24" s="8" l="8">
              <div style={styles.item}>
                <h2 style={styles.itemTitle}>关注我们</h2>
                <ul style={styles.nav}>
                  <li style={styles.navItem}>
                    <a style={styles.navLink} href="/">
                      新浪微博
                    </a>
                  </li>
                  <li style={styles.navItem}>
                    <a style={styles.navLink} href="/">
                      微信公众号
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
        <p style={styles.copyRight}>© 2017 Taobao FED</p>
      </div>
    );
  }
}

const styles = {
  container: {
    background: '#1861D5',
    padding: '80px 0',
    width: '100%',
  },
  items: {
    maxWidth: '1080px',
    margin: '0 auto',
  },
  item: {
    padding: '20px 30px',
    textAlign: 'center',
  },
  navItem: {
    listStyle: 'none',
  },
  itemTitle: {
    margin: '0 0 10px',
    color: '#fff',
    fontSize: '24px',
  },
  navLink: {
    display: 'block',
    height: '32px',
    lineHeight: '32px',
    color: '#E1EEFF',
  },
  copyRight: {
    color: '#fff',
    textAlign: 'center',
  },
};
