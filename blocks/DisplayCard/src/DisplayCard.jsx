/* eslint react/jsx-no-target-blank: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Balloon } from '@icedesign/base';

export default class DisplayCard extends Component {
  static displayName = 'DisplayCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderItem = (data, idx) => {
    return <div key={idx}>111</div>;
  };

  render() {
    const down = (
      <img
        src="https://gw.alicdn.com/tfs/TB1ReMsh3vD8KJjy0FlXXagBFXa-12-18.png"
        style={styles.down}
        alt=""
      />
    );
    const up = (
      <img
        src="https://gw.alicdn.com/tfs/TB1Q1Msh3vD8KJjy0FlXXagBFXa-12-18.png"
        style={styles.up}
        alt=""
      />
    );
    return (
      <div className="display-card">
        <IceContainer
          className="display-card-container"
          style={styles.displayCardContainer}
        >
          <div style={styles.displayCardItem}>
            <div style={styles.displayCardText}>
              昨日内容浏览次数
              <span style={styles.extraIcon}>
                <Balloon
                  trigger={
                    <img
                      src="https://img.alicdn.com/tfs/TB1mfqwXFuWBuNjSszbXXcS7FXa-36-36.png"
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
            <div style={styles.displayCardNumber}>46,657</div>
            <div style={styles.displayCardDesc}>
              <span>
                较前日
                {down}
                -200
              </span>
              <span style={{ marginLeft: 5 }}>
                近7天
                {up}
                +100
              </span>
            </div>
          </div>
          <div style={styles.displayCardItem}>
            <div style={styles.displayCardText}>
              昨日账号主页浏览人数
              <span style={styles.extraIcon}>
                <Balloon
                  trigger={
                    <img
                      src="https://img.alicdn.com/tfs/TB1mfqwXFuWBuNjSszbXXcS7FXa-36-36.png"
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
            <div style={styles.displayCardNumber}>533</div>
            <div style={styles.displayCardDesc}>
              <span>
                较前日
                {down}
                -200
              </span>
              <span style={{ marginLeft: 5 }}>
                近7天
                {up}
                +100
              </span>
            </div>
          </div>
          <div style={styles.displayCardItem}>
            <div style={styles.displayCardText}>
              昨日活跃粉丝数
              <span style={styles.extraIcon}>
                <Balloon
                  trigger={
                    <img
                      src="https://img.alicdn.com/tfs/TB1mfqwXFuWBuNjSszbXXcS7FXa-36-36.png"
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
            <div style={styles.displayCardNumber}>2233</div>
            <div style={styles.displayCardDesc}>
              <span>
                较前日
                {down}
                -200
              </span>
              <span style={{ marginLeft: 5 }}>
                近7天
                {up}
                +100
              </span>
            </div>
          </div>
          <div style={styles.displayCardItem}>
            <div style={styles.displayCardText}>
              昨日粉丝数
              <span style={styles.extraIcon}>
                <Balloon
                  trigger={
                    <img
                      src="https://img.alicdn.com/tfs/TB1mfqwXFuWBuNjSszbXXcS7FXa-36-36.png"
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
            <div style={styles.displayCardNumber}>23,333</div>
            <div style={styles.displayCardDesc}>
              <span>
                较前日
                {down}
                -200
              </span>
              <span style={{ marginLeft: 5 }}>
                近7天
                {up}
                +100
              </span>
            </div>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  displayCardContainer: {
    padding: '0 60px',
    backgroundImage:
      'url(https://gw.alicdn.com/tfs/TB1yjIrh3vD8KJjy0FlXXagBFXa-2112-340.png)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  displayCardItem: {
    display: 'flex',
    height: '150px',
    width: '169',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  displayCardText: { color: '#BEBEBE', fontSize: '12px', marginBottom: '5px' },
  displayCardNumber: {
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '3px',
  },
  displayCardDesc: { color: '#BEBEBE', fontSize: '12px' },
  down: { width: '6px', height: '9px' },
  up: { width: '6px', height: '9px' },
  extraIcon: {
    marginLeft: '5px',
    position: 'relative',
    top: '1px',
  },
};
