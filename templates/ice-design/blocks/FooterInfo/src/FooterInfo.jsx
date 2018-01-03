import React, { Component } from 'react';

export default class FooterInfo extends Component {
  static displayName = 'FooterInfo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期
  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps, nextContext) {}

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUnmount() {}

  render() {
    return (
      <div
        className="footer-info"
        style={styles.container}
      >
        <div style={styles.items}>
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
          <div style={{ ...styles.item, marginRight: '0' }}>
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
        </div>
        <p style={styles.copyRight}>© 2017 Taobao FED</p>
      </div>
    );
  }
}

const styles = {
  container: { background: '#1861D5', padding: '80px 0' },
  items: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '1080px',
    margin: '0 auto'
  },
  item: {
    width: '30%',
    padding: '20px 30px 60px',
    marginRight: '5%',
    borderRadius: '6px',
    textAlign: 'center'
  },
  itemTitle: { margin: '20px 0', color: '#fff', fontSize: '24px' },
  navLink: {
    display: 'block',
    height: '32px',
    lineHeight: '32px',
    color: '#E1EEFF'
  },
  copyRight: { color: '#fff', textAlign: 'center' }
};
