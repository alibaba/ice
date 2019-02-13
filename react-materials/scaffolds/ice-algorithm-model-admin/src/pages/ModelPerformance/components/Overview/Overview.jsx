import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import FoundationSymbol from '@icedesign/foundation-symbol';

const { Row, Col } = Grid;

const mockData = [
  {
    symbolBgColor: '#ee706d',
    symbol: 'shezhi',
    count: '861',
    desc: '模型总数',
  },
  {
    symbolBgColor: '#f7da47',
    symbol: 'chart',
    count: '8495',
    desc: '近30天总调用量',
  },
  {
    symbolBgColor: '#58ca9a',
    symbol: 'cascades',
    count: '3065',
    desc: '近30天日均调用量',
  },
  {
    symbolBgColor: '#447eff',
    symbol: 'yonghu',
    count: '4451',
    desc: '用户总数',
  },
];

export default class Overview extends Component {
  render() {
    return (
      <Row gutter={20}>
        {mockData.map((item, index) => {
          return (
            <Col l="6" key={index}>
              <div style={styles.box}>
                <div
                  style={{
                    ...styles.symbol,
                    background: `${item.symbolBgColor}`,
                  }}
                >
                  <FoundationSymbol size="xl" type={item.symbol} />
                </div>
                <div style={styles.value}>
                  <div style={styles.count}>{item.count}</div>
                  <div style={styles.desc}>{item.desc}</div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    );
  }
}

const styles = {
  box: {
    display: 'flex',
    height: '100px',
    background: '#fff',
    borderRadius: '4px',
    marginBottom: '20px',
  },
  symbol: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    color: '#fff',
  },
  value: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    color: '#c6cad6',
  },
  count: {
    fontSize: '36px',
    marginBottom: '2px',
  },
  desc: {
    fontSize: '13px',
  },
};
