import React, { Component } from 'react';
import { Button } from '@icedesign/base';
import './index.scss';

export default class LandingIntroBanner extends Component {
  static displayName = 'LandingIntroBanner';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="landing-intro-banner" style={{ height: '100vh' }}>
        <div
          className="landing-intro-banner-background"
          style={{
            backgroundImage:
              `url(${require('./images/TB1cWGdnXGWBuNjy0FbXXb4sXXa-1900-898.png')})`,
            backgroundPosition: 'center',
          }}
        />
        <div className="landing-intro-banner-content-wrapper">
          <div className="landing-intro-banner-content">
            <h2 style={styles.title}>赋能中后台建设</h2>
            <p style={styles.subTitle}>
              海量可复用物料，通过 GUI 工具极速构建中后台应用
            </p>
            <div
              className="landing-intro-banner-buttons"
              style={{ textAlign: 'center', marginTop: 70 }}
            >
              <a href="//alibaba.github.io/ice/block" target="_blank" rel="noopener noreferrer" style={styles.leftButton}>
                <Button
                  style={{
                    height: 50,
                    padding: '0 58px',
                    fontSize: 16,
                    marginBottom: '20px',
                    color: '#3080FE',
                  }}
                  size="large"
                  type="normal"
                >
                  查看海量物料
                </Button>
              </a>
              <a href="//alibaba.github.io/ice/iceworks" target="_blank" rel="noopener noreferrer">
                <Button
                  style={{
                    height: 50,
                    padding: '0 58px',
                    fontSize: 16,
                    marginBottom: '20px',
                  }}
                  type="primary"
                  size="large"
                >
                  下载 GUI 工具
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  title: {
    textAlign: 'center',
    fontSize: '46px',
    letterSpacing: '4px',
    lineHeight: '60px',
    color: '#fff',
    marginBottom: '30px',
  },
  subTitle: {
    fontSize: '20px',
    margin: '0px',
    color: '#fff',
    textShadow: '#C8C8C8 1px 1px 2px',
    textAlign: 'center',
    lineHeight: '1.7em',
  },
  leftButton: {
    marginRight: '20px',
  },
  gitStar: {
    border: '0px',
    height: '32px',
    width: '145px',
    margin: '0 auto',
  },
  gitContainer: {
    marginTop: '30px',
    textAlign: 'center',
  },
  updateLogLinkWrap: {
    textAlign: 'center',
  },
  updateLogLink: {
    color: '#fff',
  },
};
