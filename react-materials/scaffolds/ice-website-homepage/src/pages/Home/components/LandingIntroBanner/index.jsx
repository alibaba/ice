import React, { Component } from 'react';
import { Button } from '@alifd/next';
import styles from './index.module.scss';
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
            <h2 className={styles.title}>赋能中后台建设</h2>
            <p className={styles.subTitle}>
              海量可复用物料，通过 GUI 工具极速构建中后台应用
            </p>
            <div
              className="landing-intro-banner-buttons"
              style={{ textAlign: 'center', marginTop: 70 }}
            >
              <a href="//alibaba.github.io/ice/block" target="_blank" rel="noopener noreferrer" className={styles.leftButton}>
                <Button
                  style={{
                    height: 50,
                    padding: '0 58px',
                    fontSize: 16,
                    marginBottom: '20px',
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
