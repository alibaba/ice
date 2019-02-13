import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

export default class GeneralWidget extends Component {
  static displayName = 'GeneralWidget';

  render() {
    return (
      <IceContainer title="常用功能">
        <Row wrap>
          <Col l="8" xxs="12" style={styles.widgetItem}>
            <a style={styles.widgetLink}>
              <img
                src={require('./images/TB1rDFsopuWBuNjSspnXXX1NVXa-200-200.png')}
                alt=""
                style={styles.widgetImg}
              />
              <span style={styles.widgetName}>发布门店商品</span>
            </a>
          </Col>
          <Col l="8" xxs="12" style={styles.widgetItem}>
            <a style={styles.widgetLink}>
              <img
                src={require('./images/TB1rDFsopuWBuNjSspnXXX1NVXa-200-200.png')}
                alt=""
                style={styles.widgetImg}
              />
              <span style={styles.widgetName}>发布网店商品</span>
            </a>
          </Col>
          <Col l="8" xxs="12" style={styles.widgetItem}>
            <a style={styles.widgetLink}>
              <img
                src={require('./images/TB1rDFsopuWBuNjSspnXXX1NVXa-200-200.png')}
                alt=""
                style={styles.widgetImg}
              />
              <span style={styles.widgetName}>客服系统</span>
            </a>
          </Col>
          <Col l="8" xxs="12" style={styles.widgetItem}>
            <a style={styles.widgetLink}>
              <img
                src={require('./images/TB1rDFsopuWBuNjSspnXXX1NVXa-200-200.png')}
                alt=""
                style={styles.widgetImg}
              />
              <span style={styles.widgetName}>分销管理</span>
            </a>
          </Col>
          <Col l="8" xxs="12" style={styles.widgetItem}>
            <a style={styles.widgetLink}>
              <img
                src={require('./images/TB1rDFsopuWBuNjSspnXXX1NVXa-200-200.png')}
                alt=""
                style={styles.widgetImg}
              />
              <span style={styles.widgetName}>收入/提现</span>
            </a>
          </Col>
          <Col l="8" xxs="12" style={styles.widgetItem}>
            <a style={styles.widgetLink}>
              <img
                src={require('./images/TB1rDFsopuWBuNjSspnXXX1NVXa-200-200.png')}
                alt=""
                style={styles.widgetImg}
              />
              <span style={styles.widgetName}>帮助中心</span>
            </a>
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  widgetItem: {
    margin: '12px 0',
  },
  widgetLink: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#666',
    marginLeft: '20px',
  },
  widgetImg: {
    width: '30px',
    height: '30px',
  },
  widgetName: {
    marginLeft: '10px',
  },
};
