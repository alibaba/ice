import React, { Component } from 'react';
import { Button } from '@alifd/next';

export default class FeatureList extends Component {
  static displayName = 'FeatureList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.contentWrapper}>
          <div style={styles.titleWrapper}>
            <h3 style={styles.title}>设计语言</h3>
            <div style={styles.titleLine}>
              <div style={styles.titleHighlightLine} />
            </div>
          </div>
          <p style={styles.desc}>
            突破传统平台产品设计风格束缚，新的探索尝试，启发传统设计认知结合设计趋势，衍生全新平台产品设计语言
          </p>
          <div style={styles.featureListWrapper}>
            <div style={styles.featureItem}>
              <img
                src={require('./images/TB1b7O4if5TBuNjSspmXXaDRVXa-172-170.png')}
                alt=""
                style={{ width: 86, height: 85 }}
              />
              <h4 style={styles.featureTitle}>凸显内容</h4>
              <p style={styles.featureDesc}>体现层次 弱化分割</p>
            </div>
            <div style={styles.featureItem}>
              <img
                src={require('./images/TB1PnOuik9WBuNjSspeXXaz5VXa-180-146.png')}
                alt=""
                style={{ width: 90, height: 73 }}
              />
              <h4 style={styles.featureTitle}>视觉趋势</h4>
              <p style={styles.featureDesc}>突出色彩 图像辅助</p>
            </div>
            <div style={styles.featureItem}>
              <img
                src={require('./images/TB1GUF9ibSYBuNjSspiXXXNzpXa-160-136.png')}
                alt=""
                style={{ width: 80, height: 68 }}
              />
              <h4 style={styles.featureTitle}>模块兼容</h4>
              <p style={styles.featureDesc}>模块结构 设计兼容</p>
            </div>
          </div>
          <div style={styles.extraInfo}>
            <Button
              component="a"
              href="#"
              target="_blank"
              style={styles.extraButton}
            >
              了解更多 &gt;
            </Button>
          </div>
        </div>
        <div style={styles.clipBackground} />
      </div>
    );
  }
}

const styles = {
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
    height: 690,
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleWrapper: {
    marginTop: 120,
  },
  titleLine: {
    width: 140,
    height: 2,
    marginTop: 17,
    background: '#EEEEEE',
    borderLeft: '2px solid ##5fb2f8',
  },
  titleHighlightLine: {
    background: '#3080FE',
    height: 2,
    width: 33,
  },
  title: {
    color: '#223C4E',
    fontSize: 36,
  },
  desc: {
    color: '#6D7A82',
    fontSize: 16,
    lineHeight: 1.5,
    marginTop: 24,
    width: 525,
    textAlign: 'center',
  },
  featureListWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 60,
    maxWidth: 960,
    width: '100%',
  },
  featureItem: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  featureTitle: {
    marginTop: 35,
    fontSize: 24,
    color: '#333333',
  },
  featureDesc: {
    fontSize: 14,
    color: '#999999',
    marginTop: 0,
    marginBottom: 0,
  },
  extraButton: {
    marginTop: 50,
    borderColor: '#3080FE',
    background: 'transparent',
    color: '#3080FE',
  },
  clipBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: '#fff',
    clipPath: 'polygon(0 15%, 100% 0, 100% 85%, 0% 100%)',
  },
};
