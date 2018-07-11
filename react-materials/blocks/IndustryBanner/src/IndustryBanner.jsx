import React, { Component } from 'react';

export default class IndustryBanner extends Component {
  static displayName = 'IndustryBanner';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.industryBannerContainer}>
        <img
          src={require('./images/TB1_fTFs1OSBuNjy0FdXXbDnVXa-1894-198.png')}
          style={styles.industryBannerImg}
          alt=""
        />
        <div style={styles.industryNotice}>
          <h3 style={styles.industryTitle}>行业公共</h3>
          <ul style={styles.industryNoticeList}>
            <li style={styles.hotNews}>
              <a style={styles.hotNewsLink} href="#">
                天猫汽车 5.5 日正常启动
              </a>
              <span style={styles.hotTag}>HOT</span>
            </li>
            <li style={styles.hotNews}>
              <a style={styles.hotNewsLink} href="#">
                有好货招稿平台即将下线
              </a>
            </li>
            <li style={styles.hotNews}>
              <a style={styles.hotNewsLink} href="#">
                天猫汽车5.5日正式启动
              </a>
            </li>
            <li style={styles.hotNews}>
              <a style={styles.hotNewsLink} href="#">
                有好货招稿平台即将下线
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const styles = {
  industryBannerContainer: {
    position: 'relative',
    minWidth: '1280px',
    height: '240px',
  },
  industryBannerImg: {
    width: '100%',
    height: '150px',
  },
  industryNotice: {
    position: 'absolute',
    bottom: '40px',
    left: '50%',
    marginLeft: '-590px',
    padding: '18px 30px',
    width: '1120px',
    background: '#fff',
    borderRadius: '4px',
    boxShadow: '0 2px 14px rgba(0, 0, 0, 0.05)',
  },
  industryTitle: {
    margin: '0 0 10px',
  },
  industryNoticeList: {
    display: 'flex',
    flexDirection: 'row',
  },
  hotTag: {
    width: '36px',
    height: '18px',
    lineHeight: '18px',
    marginLeft: '10px',
    background: '#ff5c5c',
    borderRadius: '9px',
    color: '#fff',
    display: 'inline-block',
    textAlign: 'center',
  },
  hotNews: {
    display: 'block',
    width: '280px',
  },
  hotNewsLink: {
    color: '#666',
  },
};
