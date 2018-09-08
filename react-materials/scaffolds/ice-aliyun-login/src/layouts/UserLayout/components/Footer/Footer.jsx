import React, { Component } from 'react';

const navs = [
  {
    link: '#',
    text: '关于我们',
  },
  {
    link: '#',
    text: '私权政策',
  },
  {
    link: '#',
    text: '法律条款',
  },
  {
    link: '#',
    text: '联系我们',
  },
  {
    link: '#',
    text: '加入我们',
  },
];

const links = [
  {
    link: '#',
    text: '阿里巴巴',
  },
  {
    link: '#',
    text: '淘宝网',
  },
  {
    link: '#',
    text: '天猫',
  },
  {
    link: '#',
    text: '聚划算',
  },
  {
    link: '#',
    text: '全球速卖通',
  },
  {
    link: '#',
    text: '飞猪',
  },
  {
    link: '#',
    text: '阿里云计算',
  },
  {
    link: '#',
    text: '阿里通信',
  },
  {
    link: '#',
    text: '高德',
  },
  {
    link: '#',
    text: 'UC',
  },
  {
    link: '#',
    text: '阿里星球',
  },
  {
    link: '#',
    text: '支付宝',
  },
  {
    link: '#',
    text: '钉钉',
  },
];

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
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.navs}>
            {navs.map((nav, index) => {
              return (
                <a href={nav.link} key={index} style={styles.navItem}>
                  {nav.text}
                </a>
              );
            })}
          </div>
          <div style={styles.links}>
            {links.map((item, index) => {
              return (
                <a href={item.link} key={index} style={styles.linkItem}>
                  {item.text}
                </a>
              );
            })}
          </div>
          <div style={styles.copyright}>
            © 2009-2018 Aliyun.com 版权所有 ICP证：浙B2-20080101
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    background: '#373d41',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 0',
  },
  navItem: {
    fontSize: '16px',
    color: '#9b9ea0',
    marginRight: '35px',
  },
  links: {
    marginTop: '30px',
  },
  linkItem: {
    display: 'inline-block',
    fontSize: '14px',
    color: '#73777a',
    marginRight: '10px',
  },
  copyright: {
    color: '#73777a',
    fontSize: '14px',
    marginTop: '10px',
  },
};
