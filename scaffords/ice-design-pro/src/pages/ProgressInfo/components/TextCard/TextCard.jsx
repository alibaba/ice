import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import './TextCard.scss';

export default class TextCard extends Component {
  static displayName = 'TextCard';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="text-card" style={styles.textCard}>
        <IceContainer className="text-card-list" style={styles.textCardList}>
          <div className="text-card-item" style={styles.textCardItem}>
            <div className="text-card-subtitle" style={styles.textCardSubtitle}>
              我的待办
            </div>
            <div className="text-card-title" style={styles.textCardTitle}>
              <span className="text-card-number" style={styles.textCardNumber}>
                8
              </span>个任务
            </div>
          </div>

          <div className="text-card-item" style={styles.textCardItem}>
            <div className="text-card-subtitle" style={styles.textCardSubtitle}>
              本周任务平均处理时间
            </div>
            <div className="text-card-title" style={styles.textCardTitle}>
              <span className="text-card-number" style={styles.textCardNumber}>
                32
              </span>分钟
            </div>
          </div>

          <div className="text-card-item" style={styles.textCardItem}>
            <div className="text-card-subtitle" style={styles.textCardSubtitle}>
              本周完成任务数
            </div>
            <div className="text-card-title" style={styles.textCardTitle}>
              <span className="text-card-number" style={styles.textCardNumber}>
                23
              </span>个任务
            </div>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  textCard: {
    color: '#333',
  },
  textCardList: {
    display: 'flex',
    flexDirection: 'row',
  },
  textCardItem: {
    flex: '1',
    borderRight: '1px solid #F0F0F0',
    height: '90px',
    width: '33%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCardSubtitle: {
    fontSize: '12px',
    marginBottom: '10px',
  },
  textCardTitle: {
    fontSize: '16px',
  },
  textCardNumber: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
};
