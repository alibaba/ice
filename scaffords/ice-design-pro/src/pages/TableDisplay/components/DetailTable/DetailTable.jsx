import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import './DetailTable.scss';

export default class DetailTable extends Component {
  static displayName = 'DetailTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="detail-table">
        <IceContainer title="任务详情">
          <ul style={styles.detailTable}>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>任务标题：</div>
              <div style={styles.detailBody}>集盒家居旗舰店双十一活动</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>单个任务金额：</div>
              <div style={styles.detailBody}>¥ 1000.00</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>接单时间：</div>
              <div style={styles.detailBody}>2017-10-18 12:20:07</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>商家联系方式：</div>
              <div style={styles.detailBody}>15112111213</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>任务状态：</div>
              <div style={styles.detailBody}>
                <span style={styles.statusProcessing}>进行中</span>
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>收货地址：</div>
              <div style={styles.detailBody}>
                浙江省杭州市余杭区文一西路969号淘宝城
              </div>
            </li>
          </ul>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  detailItem: {
    padding: '15px 0px',
    display: 'flex',
    borderTop: '1px solid #EEEFF3',
  },
  detailTitle: {
    marginRight: '30px',
    textAlign: 'right',
    width: '120px',
    color: '#999999',
  },
  detailBody: { flex: 1 },
  statusProcessing: { color: '#64D874' },
};
