import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Icon } from '@icedesign/base';

const { Row, Col } = Grid;

const totalData = [
  {
    label: '发布数',
    value: '35',
  },
  {
    label: '错误数',
    value: '24717',
  },
  {
    label: '可用率',
    value: '99.9%',
  },
  {
    label: '访问量',
    value: '42740',
  }
];

const todayData = [
  {
    label: '发布数',
    value: '5',
    icon: 'operation'
  },
  {
    label: '错误数',
    value: '1002',
    icon: 'lights'
  },
  {
    label: '可用率',
    value: '99.8%',
    icon: 'process'
  },
  {
    label: '访问量',
    value: '1559',
    icon: 'service'
  },
];

export default class RealTimeData extends Component {
  static displayName = 'RealTimeData';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row>
        <Col l="24">
          <IceContainer>
            <h4 style={styles.cardTitle}>所有数据</h4>
            <Row wrap gutter="10">
              {totalData.map((item, index) => {
                return (
                  <Col key={index} style={{ background: 'red' }}>
                    <div style={styles.totalCard}>
                      <div style={styles.label}>{item.label}</div>
                      <div style={styles.value}>{item.value}</div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </IceContainer>
          <IceContainer>
            <h4 style={styles.cardTitle}>今日数据</h4>
            <Row wrap gutter="10">
              {todayData.map((item, index) => {
                return (
                  <Col key={index} style={{ background: 'red' }}>
                    <div style={styles.todayCard}>
                      <Icon type={item.icon} size='xl' style={styles.todayCardIcon}  />
                      <div>
                        <div style={styles.label}>{item.label}</div>
                        <div style={styles.value}>{item.value}</div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </IceContainer>
        </Col>
      </Row>
    );
  }
}

const styles = {
  cardTitle: {
    margin: '0 0 20px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
  },
  totalCard: {
    maxWidth: '160px',
    padding: '10px',
    borderRadius: '4px',
    background: '#09f',
    color: '#fff',
  },
  todayCard: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '20px',
  },
  todayCardIcon: {
    color: '#09f',
    marginRight: '8px',
  },
  label: {
    height: '14px',
    lineHeight: '14px',
    marginBottom: '8px',
  },
  value: {
    height: '28px',
    lineHeight: '28px',
    fontSize: '28px',
    fontWeight: '500',
  },
};
