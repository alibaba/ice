import React, { Component } from 'react';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

export default class NoticeSummary extends Component {
  static displayName = 'NoticeSummary';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row style={styles.noticeContainer}>
        <Col span="24">
          <div style={styles.noticeText}>
            该报价为官方活动的关联报价，请查看详情后下单购买
          </div>
          <div style={styles.noticeBody}>
            <img
              src={require('./images/banner.png')}
              alt=""
              style={styles.noticeImg}
            />
            <div style={styles.noticeContent}>
              <h3 style={styles.noticeTitle}>
                标题摘要
                <a href="#" style={styles.link}>
                  查看详情{' '}
                  <img
                    src={require('./images/arrow.png')}
                    style={styles.arrowIcon}
                    alt=""
                  />
                </a>
              </h3>
              <div style={styles.noticeItems}>
                <div style={styles.noticeItem}>
                  <span style={styles.label}>截止日期：</span>
                  <span style={styles.value}>2018-07-05</span>
                </div>
                <div style={styles.noticeItem}>
                  <span style={styles.label}>发起人：</span>
                  <span style={styles.value}>淘小宝</span>
                </div>
                <div style={styles.noticeItem}>
                  <span style={styles.label}>内容类型：</span>
                  <span style={styles.value}>视频</span>
                </div>
                <div style={styles.noticeItem}>
                  <span style={styles.label}>
                    参与创作者 <strong style={styles.count}>10</strong>
                    个，参与商家 <strong style={styles.count}>8</strong>个
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

const styles = {
  noticeContainer: {
    marginBottom: '20px',
  },
  noticeText: {
    padding: '20px',
    fontSize: '14px',
    background: '#FFFAEC',
    color: '#F0A400',
  },
  noticeBody: {
    display: 'flex',
    padding: '10px',
    background: '#fff',
  },
  noticeContent: {
    marginLeft: '15px',
  },
  noticeItems: {
    display: 'flex',
  },
  noticeItem: {
    marginRight: '25px',
  },
  noticeImg: {
    width: '106px',
    height: '60px',
  },
  noticeTitle: {
    margin: '8px 0',
  },
  label: {
    color: '#999',
    fontSize: '12px',
  },
  value: {
    color: '#333',
    fontSize: '12px',
  },
  count: {
    margin: '0 2px',
    color: '#FF5D38',
    fontSize: '13px',
  },
  link: {
    position: 'absolute',
    right: '20px',
    color: '#FF5D38',
    fontSize: '14px',
  },
  arrowIcon: {
    width: '14px',
    height: '14px',
    marginRight: '10px',
  },
};
