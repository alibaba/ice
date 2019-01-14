import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

export default class IntroStepInfo extends Component {
  static displayName = 'IntroStepInfo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="intro-step-info">
        <IceContainer>
          <div style={styles.customVideoCard}>
            <h3 style={styles.customVideoTitle}>
              官方优选短视频制作有什么不同？
            </h3>
            <Row style={styles.customVideoIntro}>
              <Col span="6">
                <div style={styles.introItem}>
                  <img
                    src={require('./images/TB1JngwmXmWBuNjSspdXXbugXXa-120-112.png')}
                    style={{ width: '60px', height: '57px' }}
                    alt=""
                  />
                  <h5 style={styles.introItemTitle}>作品更优质</h5>
                  <p style={styles.introItemDesc}>
                    累计服务3000+商家<br />服务评分超4.8
                  </p>
                </div>
              </Col>
              <Col span="6">
                <div style={styles.introItem}>
                  <img
                    src={require('./images/TB1Bp8mmuOSBuNjy0FdXXbDnVXa-102-102.png')}
                    style={{ width: '52px', height: '52px' }}
                    alt=""
                  />
                  <h5 style={styles.introItemTitle}>响应更及时</h5>
                  <p style={styles.introItemDesc}>
                    工作日保证一小时内<br />有专人联系
                  </p>
                </div>
              </Col>

              <Col span="6">
                <div style={styles.introItem}>
                  <img
                    src={require('./images/TB1KDgwmXmWBuNjSspdXXbugXXa-156-156.png')}
                    style={{ width: '52px', height: '52px' }}
                    alt=""
                  />
                  <h5 style={styles.introItemTitle}>合作更放心</h5>
                  <p style={styles.introItemDesc}>
                    所有服务机构<br />均与官方签约
                  </p>
                </div>
              </Col>
              <Col span="6">
                <div style={styles.introItem}>
                  <img
                    src={require('./images/TB1dqlRmqmWBuNjy1XaXXXCbXXa-112-116.png')}
                    style={{ width: '56px', height: '59px' }}
                    alt=""
                  />
                  <h5 style={styles.introItemTitle}>操作更便捷</h5>
                  <p style={styles.introItemDesc}>
                    无需繁琐的挑选<br />系统智能派单给专业机构
                  </p>
                </div>
              </Col>
            </Row>

            <div style={styles.customVideoSteps}>
              <h3 style={styles.customStepsTitle}>如何三步完成短视频制作？</h3>
              <img
                src={require('./images/TB1JUuGmCtYBeNjSspaXXaOOFXa-1064-88.png')}
                style={{ width: '532px' }}
                alt=""
              />
            </div>

            <a style={styles.customBtn}>立即定制短视频</a>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  customVideoCard: {
    background: '#fff',
    padding: '20px 30px',
    textAlign: 'center',
  },
  customVideoIntro: {
    paddingBottom: '26px',
    borderBottom: '1px solid #E8E8E8',
  },
  customVideoTitle: {
    padding: '0 0 20px',
    margin: '0 0 20px',
    fontSize: '22px',
  },
  introItem: {},
  introItemTitle: {
    margin: '12px 0 0',
    lineHeight: '40px',
    fontSize: '18px',
  },
  introItemDesc: {
    lineHeight: '20px',
    color: '#999',
    fontSize: '14px',
  },
  customVideoSteps: {
    margin: '20px 0 0',
    padding: '0 0 20px',
  },
  customStepsTitle: {
    padding: '10px 0 20px',
    margin: '0 0 10px',
    fontSize: '22px',
  },
  customBtn: {
    display: 'inline-block',
    background: '#FF5D38',
    borderRadius: '2px',
    width: '168px',
    height: '40px',
    lineHeight: '40px',
    textAlign: 'center',
    color: '#fff',
    cursor: 'pointer',
  },
};
