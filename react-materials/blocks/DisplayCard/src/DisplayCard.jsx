/* eslint react/jsx-no-target-blank: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Balloon, Grid } from '@alifd/next';
import './DisplayCard.scss';

const { Row, Col } = Grid;

export default class extends Component {
  static displayName = '';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const down = (
      <img
        src={require('./images/TB1ReMsh3vD8KJjy0FlXXagBFXa-12-18.png')}
        style={styles.down}
        alt=""
      />
    );
    const up = (
      <img
        src={require('./images/TB1Q1Msh3vD8KJjy0FlXXagBFXa-12-18.png')}
        style={styles.up}
        alt=""
      />
    );

    return (
      <IceContainer className="display-card-container" style={styles.container}>
        <Row wrap>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title} className="title">
              昨日内容浏览次数
              <span style={styles.extraIcon}>
                <Balloon
                  trigger={
                    <img
                      src={require('./images/TB1mfqwXFuWBuNjSszbXXcS7FXa-36-36.png')}
                      alt=""
                      width="12"
                      height="12"
                    />
                  }
                  triggerType="hover"
                  closable={false}
                >
                  这里是数据说明
                </Balloon>
              </span>
            </div>
            <div className="count" style={styles.count}>
              46,657
            </div>
            <div style={styles.desc} className="desc">
              <span>较前日 {down} -200</span>
              <span style={{ marginLeft: 5 }}>近7天 {up} +100</span>
            </div>
          </Col>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title} className="title">
              昨日账号主页浏览人数
              <span style={styles.extraIcon}>
                <Balloon
                  trigger={
                    <img
                      src={require('./images/TB1mfqwXFuWBuNjSszbXXcS7FXa-36-36.png')}
                      alt=""
                      width="12"
                      height="12"
                    />
                  }
                  triggerType="hover"
                  closable={false}
                >
                  这里是数据说明
                </Balloon>
              </span>
            </div>
            <div style={styles.count} className="count">
              533
            </div>
            <div style={styles.desc} className="desc">
              <span>较前日 {down} -200</span>
              <span style={{ marginLeft: 5 }}>近7天 {up} +100</span>
            </div>
          </Col>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title} className="title">
              昨日活跃粉丝数
              <span style={styles.extraIcon}>
                <Balloon
                  trigger={
                    <img
                      src={require('./images/TB1mfqwXFuWBuNjSszbXXcS7FXa-36-36.png')}
                      alt=""
                      width="12"
                      height="12"
                    />
                  }
                  triggerType="hover"
                  closable={false}
                >
                  这里是数据说明
                </Balloon>
              </span>
            </div>
            <div style={styles.count} className="count">
              2233
            </div>
            <div style={styles.desc} className="desc">
              <span>较前日 {down} -200</span>
              <span style={{ marginLeft: 5 }}>近7天 {up} +100</span>
            </div>
          </Col>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title} className="title">
              昨日粉丝数
              <span style={styles.extraIcon}>
                <Balloon
                  trigger={
                    <img
                      src={require('./images/TB1mfqwXFuWBuNjSszbXXcS7FXa-36-36.png')}
                      alt=""
                      width="12"
                      height="12"
                    />
                  }
                  triggerType="hover"
                  closable={false}
                >
                  这里是数据说明
                </Balloon>
              </span>
            </div>
            <div style={styles.count} className="count">
              23,333
            </div>
            <div style={styles.desc} className="desc">
              <span>较前日 {down} -200</span>
              <span style={{ marginLeft: 5 }}>近7天 {up} +100</span>
            </div>
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '10px 0',
  },
  title: {
    fontSize: '12px',
    marginBottom: '5px',
  },
  count: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '3px',
  },
  desc: {
    fontSize: '12px',
  },
  down: {
    width: '6px',
    height: '9px',
  },
  up: {
    width: '6px',
    height: '9px',
  },
  extraIcon: {
    marginLeft: '5px',
    position: 'relative',
    top: '1px',
  },
};
