import React, { Component } from 'react';
import { Button, Grid } from '@icedesign/base';
import { enquireScreen } from 'enquire-js';

const { Row, Col } = Grid;

export default class FeatureList extends Component {
  static displayName = 'FeatureList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 750px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  render() {
    const { isMobile } = this.state;

    return (
      <div
        style={{
          ...styles.wrapper,
          ...(isMobile ? styles.wrapperMobile : {}),
        }}
      >
        <div style={styles.contentWrapper}>
          <div
            style={{
              ...styles.titleWrapper,
              ...(isMobile ? styles.titleWrapperMobile : {}),
            }}
          >
            <h3 style={styles.title}>设计语言</h3>
            <div style={styles.titleLine}>
              <div style={styles.titleHighlightLine} />
            </div>
          </div>
          <p style={styles.desc}>
            突破传统平台产品设计风格束缚，新的探索尝试，启发传统设计认知结合设计趋势，衍生全新平台产品设计语言
          </p>

          <Row wrap style={styles.featureListWrapper}>
            <Col xs="8" xxs="24">
              <div style={styles.featureItem}>
                <img
                  src="https://img.alicdn.com/tfs/TB1b7O4if5TBuNjSspmXXaDRVXa-172-170.png"
                  alt=""
                  style={{ width: 86, height: 85 }}
                />
                <h4 style={styles.featureTitle}>凸显内容</h4>
                <p style={styles.featureDesc}>体现层次 弱化分割</p>
              </div>
            </Col>
            <Col xs="8" xxs="24">
              <div style={styles.featureItem}>
                <img
                  src="https://img.alicdn.com/tfs/TB1PnOuik9WBuNjSspeXXaz5VXa-180-146.png"
                  alt=""
                  style={{ width: 90, height: 73, marginBottom: 12 }}
                />
                <h4 style={styles.featureTitle}>视觉趋势</h4>
                <p style={styles.featureDesc}>突出色彩 图像辅助</p>
              </div>
            </Col>
            <Col xs="8" xxs="24">
              <div style={styles.featureItem}>
                <img
                  src="https://img.alicdn.com/tfs/TB1GUF9ibSYBuNjSspiXXXNzpXa-160-136.png"
                  alt=""
                  style={{ width: 80, height: 68, marginBottom: 17 }}
                />
                <h4 style={styles.featureTitle}>模块兼容</h4>
                <p style={styles.featureDesc}>模块结构 设计兼容</p>
              </div>
            </Col>
          </Row>
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
        <div
          style={{
            ...styles.clipBackground,
            ...(isMobile ? styles.clipBackgroundMobile : {}),
          }}
        />
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
  wrapperMobile: {
    marginTop: 0,
    height: 'auto',
    padding: '0 0 30px 0',
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
  titleWrapperMobile: {
    marginTop: 20,
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
    maxWidth: 525,
    width: '90%',
    textAlign: 'center',
  },
  featureListWrapper: {
    marginTop: 60,
    maxWidth: 960,
    width: '100%',
  },
  featureItem: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
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
    marginTop: 30,
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
  clipBackgroundMobile: {
    clipPath: 'none',
  },
};
