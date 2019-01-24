import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';

import SplineChart from '../SplineChart';

const { Row, Col } = Grid;

export default class BuilderState extends Component {
  static displayName = 'BuilderState';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const totalData = [
      {
        label: '构建量',
        value: '55464',
        background: '#5e83fb',
      },
      {
        label: '仓库',
        value: '24717',
        background: '#f7da47',
      },
      {
        label: '用户',
        value: '4274',
        background: '#ee6f6d',
      },
      {
        label: '构建器',
        value: '689',
        background: '#57ca9a',
      },
    ];

    const todayData = [
      {
        label: '构建量',
        value: '7995',
        img: require('./images/count.png'),
      },
      {
        label: '活跃仓库',
        value: '1002',
        img: require('./images/repo.png'),
      },
      {
        label: '活跃用户',
        value: '735',
        img: require('./images/user.png'),
      },
      {
        label: '活跃构建器',
        value: '55',
        img: require('./images/builder.png'),
      },
    ];
    return (
      <Row gutter="20">
        <Col l="12">
          <IceContainer>
            <h4 style={styles.cardTitle}>实时构建数</h4>
            <SplineChart />
          </IceContainer>
        </Col>
        <Col l="12">
          <IceContainer>
            <h4 style={styles.cardTitle}>所有数据</h4>
            <Row wrap gutter="10">
              {totalData.map((item, index) => {
                return (
                  <Col key={index}>
                    <div
                      style={{
                        ...styles.totalCard,
                        background: item.background,
                      }}
                    >
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
                  <Col key={index}>
                    <div style={styles.todayCard}>
                      <img src={item.img} alt="" style={styles.todayCardIcon} />
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
    color: '#fff',
  },
  todayCard: {
    display: 'flex',
    alignItems: 'center',
  },
  todayCardIcon: {
    width: '36px',
    height: '36px',
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
