import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

export default class Notifications extends Component {
  static displayName = 'Notifications';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer title="重要提醒">
        <Row wrap>
          <Col l="12" xxs="24">
            <div style={styles.noticeItem}>
              <div style={styles.noticeItemTitle}>订单相关</div>
              <div style={styles.noticeItemBody}>
                <div style={styles.bodyItem}>
                  待发货订单：<a href="#">100</a>
                </div>
                <div style={styles.bodyItem}>
                  待处理退款：<a href="#">0</a>
                </div>
              </div>
            </div>
          </Col>

          <Col l="12" xxs="24">
            <div style={styles.noticeItem}>
              <div style={styles.noticeItemTitle}>物流信息</div>
              <div style={styles.noticeItemBody}>
                <div style={styles.bodyItem}>
                  已完成：<a href="#">100</a>
                </div>
                <div style={styles.bodyItem}>
                  派送中：<a href="#">0</a>
                </div>
                <div style={styles.bodyItem}>
                  退货中：<a href="#">0</a>
                </div>
              </div>
            </div>
          </Col>

          <Col l="12" xxs="24">
            <div style={styles.noticeItem}>
              <div style={styles.noticeItemTitle}>商品相关</div>
              <div style={styles.noticeItemBody}>
                <div style={styles.bodyItem}>
                  门店在售：<a href="#">100</a>
                </div>
                <div style={styles.bodyItem}>
                  门店售罄：<a href="#">0</a>
                </div>
                <div style={styles.bodyItem}>
                  库存预警：<a href="#">0</a>
                </div>
                <div style={styles.bodyItem}>
                  网店在售：<a href="#">0</a>
                </div>
                <div style={styles.bodyItem}>
                  网店售罄：<a href="#">0</a>
                </div>
              </div>
            </div>
          </Col>

          <Col l="12" xxs="24">
            <div style={styles.noticeItem}>
              <div style={styles.noticeItemTitle}>通知消息</div>
              <div style={styles.noticeItemBody}>
                <div style={styles.bodyItem}>
                  未读客户消息：<a href="#">100</a>
                </div>
                <div style={styles.bodyItem}>
                  未读通知：<a href="#">0</a>
                </div>
                <div style={styles.bodyItem}>
                  系统通知：<a href="#">0</a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  noticeItem: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '50%',
    padding: '20px',
  },
  noticeItemTitle: {
    marginBottom: '10px',
    fontSize: '14px',
    color: '#333',
  },
  noticeItemBody: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  bodyItem: {
    display: 'flex',
    flexBasis: '33%',
    color: '#999',
    fontSize: '13px',
    marginBottom: '10px',
  },
};
