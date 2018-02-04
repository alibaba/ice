import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Progress } from '@icedesign/base';
import './ProgressDataList.scss';

export default class ProgressDataList extends Component {
  static displayName = 'ProgressDataList';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="progress-data-list">
        <IceContainer style={{ padding: 0 }}>
          <div style={styles.dataList}>
            <div style={styles.dataItem}>
              <div style={styles.dataTitle}>总收入</div>
              <div style={styles.dataIntro}>所有项目收入</div>
              <div style={styles.dataValue}>￥10M</div>
              <div style={styles.dataProgress}>
                <Progress percent={30} showInfo={false} />
              </div>
              <div style={styles.dataExtra}>
                <div>
                  <a style={styles.settingsLink} href="#">
                    设置
                  </a>
                </div>
                <div>30%</div>
              </div>
              <div style={styles.verticalLine} />
            </div>
            <div style={styles.dataItem}>
              <div style={styles.dataTitle}>今年新用户</div>
              <div style={styles.dataIntro}>今年新注册用户</div>
              <div style={styles.dataValue}>2000</div>
              <div style={styles.dataProgress}>
                <Progress percent={80} showInfo={false} />
              </div>
              <div style={styles.dataExtra}>
                <div>
                  <a style={styles.settingsLink} href="#">
                    设置
                  </a>
                </div>
                <div>80%</div>
              </div>
              <div style={styles.verticalLine} />
            </div>
            <div style={styles.dataItem}>
              <div style={styles.dataTitle}>本月新订单</div>
              <div style={styles.dataIntro}>本月新增订单数</div>
              <div style={styles.dataValue}>579</div>
              <div style={styles.dataProgress}>
                <Progress percent={60} showInfo={false} />
              </div>
              <div style={styles.dataExtra}>
                <div>
                  <a style={styles.settingsLink} href="#">
                    设置
                  </a>
                </div>
                <div>60%</div>
              </div>
              <div style={styles.verticalLine} />
            </div>
            <div style={styles.dataItem}>
              <div style={styles.dataTitle}>用户反馈待处理</div>
              <div style={styles.dataIntro}>用户反馈待处理的数量</div>
              <div style={styles.dataValue}>10</div>
              <div style={styles.dataProgress}>
                <Progress percent={10} showInfo={false} />
              </div>
              <div style={styles.dataExtra}>
                <div>
                  <a style={styles.settingsLink} href="#">
                    设置
                  </a>
                </div>
                <div>10%</div>
              </div>
            </div>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  dataList: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dataItem: {
    width: 240,
    padding: '30px 30px',
    position: 'relative',
  },
  dataTitle: {
    fontWeight: 'bold',
  },
  dataIntro: {
    marginTop: 10,
    color: '#999',
  },
  dataValue: {
    fontSize: 22,
    fontWeight: 'bold',
    position: 'absolute',
    top: 35,
    right: 30,
    color: '#3080fe',
  },
  dataProgress: {
    marginTop: 30,
  },
  dataExtra: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'space-between',
    color: '#999',
  },
  settingsLink: {
    color: '#999',
  },
  verticalLine: {
    position: 'absolute',
    top: 20,
    bottom: 20,
    right: 0,
    width: 0,
    borderLeft: '1px solid #eee',
  },
};
