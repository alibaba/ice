import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import PieChart from './PieChart';

const { Row, Col } = Grid;

export default class OverviewInfo extends Component {
  static displayName = 'OverviewInfo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row wrap gutter={20}>
        <Col l="12">
          <IceContainer style={styles.container}>
            <h4 style={styles.title}>应用版本详细信息</h4>
            <ul style={styles.summary}>
              <li style={styles.item}>
                <span style={styles.label}>应用名称：</span>
                <span style={styles.value}>
                  手机淘宝 iOS 客户端 0.0.1 版本监控
                </span>
              </li>
              <li style={styles.item}>
                <span style={styles.label}>当前版本：</span>
                <span style={styles.value}>0.0.2</span>
              </li>
              <li style={styles.item}>
                <span style={styles.label}>对比版本：</span>
                <span style={styles.value}>0.0.1</span>
              </li>
              <li style={styles.item}>
                <span style={styles.label}>App ID：</span>
                <span style={styles.value}>000001</span>
              </li>
              <li style={styles.item}>
                <span style={styles.label}>创建者：</span>
                <span style={styles.value}>淘小宝</span>
              </li>
              <li style={styles.item}>
                <span style={styles.label}>创建时间：</span>
                <span style={styles.value}>2018-08-29 11:28:23</span>
              </li>
            </ul>
          </IceContainer>
        </Col>
        <Col l="12">
          <IceContainer style={styles.container}>
            <h4 style={styles.title}>埋点统计</h4>
            <PieChart />
          </IceContainer>
        </Col>
      </Row>
    );
  }
}

const styles = {
  container: {
    margin: '0',
    padding: '0',
  },
  title: {
    margin: '0',
    padding: '15px 20px',
    fonSize: '16px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: 'rgba(0,0,0,.85)',
    fontWeight: '500',
    borderBottom: '1px solid #eee',
  },
  summary: {
    padding: '20px',
  },
  item: {
    height: '32px',
    lineHeight: '32px',
  },
  label: {
    display: 'inline-block',
    fontWeight: '500',
    minWidth: '74px',
  },
};
