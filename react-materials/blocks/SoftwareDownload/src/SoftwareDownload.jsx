import React, { Component } from 'react';

export default class SoftwareDownload extends Component {
  static displayName = 'SoftwareDownload';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.bgImage}>
          <div style={styles.bgImageMask} />
        </div>
        <div style={styles.bgImage2} />
        <div style={styles.software} />
        <div style={styles.softwareIntro}>
          <div style={styles.title}>Iceworks</div>
          <div style={styles.slogan}>让前端工程变的轻松便捷</div>
          <div style={{ paddingTop: 65 }}>
            <div style={styles.downloadBtn}>立即下载 Iceworks for MacOS</div>
          </div>
          <div style={styles.softwareDetail}>
            <div style={styles.version}>
              <span style={{ display: 'block' }}>v1.5.0</span>
              <span style={{ display: 'block' }}>当前版本</span>
            </div>
            <div style={styles.separator} />
            <div style={styles.history}>
              <span style={{ display: 'block' }}>2018-05-04</span>
              <span style={{ display: 'block' }}>查看日志</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    height: 750,
    backgroundSize: 'cover',
    position: 'relative',
    overflowX: 'hidden',
  },
  softwareIntro: {
    position: 'absolute',
    left: '10%',
    paddingTop: '230px',
  },
  title: {
    fontSize: 46,
    color: '#fff',
    fontWeight: 500,
    lineHeight: '66px',
    textShadow: '0 0 3px rgba(0,0,0,0.3)',
    marginBottom: 16,
  },
  slogan: {
    fontSize: 24,
    color: '#fff',
    lineHeight: '34px',
    textShadow: '0 0 3px rgba(0,0,0,0.3)',
  },
  downloadBtn: {
    height: 48,
    color: '#3080FE',
    fontSize: 16,
    lineHeight: '48px',
    backgroundColor: '#fff',
    borderRadius: '48px',
    textAlign: 'center',
  },
  softwareDetail: {
    paddingTop: 24,
    display: 'flex',
    flexDirection: 'row',
    color: '#fff',
    fontSize: 16,
    fontWeight: 300,
    width: 200,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  software: {
    backgroundImage:
      'url(//img.alicdn.com/tfs/TB1YPWIpTtYBeNjy1XdXXXXyVXa-779-633.png)',
    width: 779,
    height: 633,
    position: 'absolute',
    top: 100,
    left: '38%',
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: '#fff',
  },
  version: {
    width: 80,
    lineHeight: '20px',
    textAlign: 'center',
  },
  history: {
    width: 80,
    lineHeight: '20px',
    textAlign: 'center',
  },
  bgImage2: {
    backgroundImage:
      'url(//img.alicdn.com/tfs/TB1tuCIpTtYBeNjy1XdXXXXyVXa-1192-853.png)',
    position: 'absolute',
    left: '30%',
    width: 1192,
    height: 853,
  },
  bgImage: {
    position: 'absolute',
    right: '45%',
    width: 1314,
    height: 750,
    backgroundImage:
      'url(//img.alicdn.com/tfs/TB1HvqHpTtYBeNjy1XdXXXXyVXa-1314-750.jpg)',
  },
  bgImageMask: {
    width: 1314,
    height: 750,
    background:
      'linear-gradient(135deg, rgba(94,136,255,0.85) 0%,rgba(111,48,254,0.85) 100%)' /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */,
  },
};
