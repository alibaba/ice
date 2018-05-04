import React, { Component } from 'react';
import { Menu, Button, Feedback } from '@icedesign/base';

const SplitButton = Button.Split;

const descriptor = {
  'darwin-x64-prod': {
    download: 'For MacOS',
    env: 'macOS 10.9 及以上',
  },
  'win-x64-prod': {
    download: 'For Windows X64',
    env: '64位，Win 7 及以上',
  },
};

export default class SoftwareDownload extends Component {
  static displayName = 'SoftwareDownload';

  constructor(props) {
    super(props);
    const ua = navigator.userAgent;
    let osType = 'darwin-x64-prod'; // mac for default
    if (/Mac/.test(ua)) {
      // this is macOS ha
    } else if (/Windows/.test(ua)) {
      osType = 'win-x64-prod';
    }
    this.state = {
      osType,
      loading: false,
      data: {
        'darwin-x64-prod': {
          name: 'iceworks',
          description: 'ICE Desktop Application.',
          install:
            'http://iceworks.oss-cn-hangzhou.aliyuncs.com/mac/Iceworks-1.6.2.dmg',
          version: '1.6.2',
          releaseDate: '2018-04-23',
        },
        'win-x64-prod': {
          name: 'iceworks',
          description: 'ICE Desktop Application.',
          install:
            'http://iceworks.oss-cn-hangzhou.aliyuncs.com/win/Iceworks-setup-1.6.2.exe',
          version: '1.6.2',
          releaseDate: '2018-04-23',
        },
      },
    };
  }

  componentWillMount() {}

  changeSelectMenu = (select) => {
    this.setState({ osType: select });
  };

  download = () => {
    const { data, loading, osType } = this.state;
    if (loading) {
      Feedback.toast.success('请稍等');
    } else {
      location.href = data[osType].install;
    }
    this.showBtnAnimate();
  };

  render() {
    const { data, loading, osType } = this.state;
    const menu = (
      <Menu>
        <Menu.Item
          onClick={this.changeSelectMenu.bind(this, 'darwin-x64-prod')}
          key="darwin-x64-prod"
        >
          For MacOS 版本
        </Menu.Item>
        <Menu.Item
          onClick={this.changeSelectMenu.bind(this, 'win-x64-prod')}
          key="win-x64-prod"
        >
          For Windows 版本(64位)
        </Menu.Item>
      </Menu>
    );
    const ver = loading ? '0' : data[osType].version;
    const subTitle = ver[0] === '0' ? 'Beta' : '';

    return (
      <div style={styles.wrapper}>
        <div style={styles.bgImage}>
          <div style={styles.bgImageMask} />
        </div>
        <div style={styles.bgImage2} />
        <div style={styles.software} />
        <div style={styles.softwareIntro}>
          <div style={styles.title}>
            Iceworks <span style={styles.subtitle}>{subTitle}</span>
          </div>
          <div style={styles.slogan}>让前端工程变的轻松便捷</div>
          <div style={{ paddingTop: 65 }}>
            <SplitButton
              menu={menu}
              onClick={this.download}
              size="large"
              style={styles.downloadBtn}
            >
              立即下载
              <span style={{ marginLeft: '5px', fontSize: '12px' }}>
                {descriptor[osType].download}
              </span>
            </SplitButton>
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
    color: '#3080FE',
    fontSize: 16,
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
      'url(//img.alicdn.com/tfs/TB1i8hfpQyWBuNjy0FpXXassXXa-1558-1266.png)',
    width: 779,
    height: 633,
    backgroundSize: '779px 633px',
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
  subtitle: {
    fontSize: '16px',
    fontWeight: 'normal',
  },
  bgImageMask: {
    width: 1314,
    height: 750,
    background:
      'linear-gradient(135deg, rgba(94,136,255,0.85) 0%,rgba(111,48,254,0.85) 100%)' /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */,
  },
};
