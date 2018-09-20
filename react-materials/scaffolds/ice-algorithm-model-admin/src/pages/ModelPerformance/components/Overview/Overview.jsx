import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@icedesign/base';
import FoundationSymbol from 'foundation-symbol';

const { Row, Col } = Grid;

const mockData = [
  {
    symbolBgColor: '#6ccac9',
    symbol: 'shezhi',
    count: '861',
    desc: '模型总数',
  },
  {
    symbolBgColor: '#ed6c5c',
    symbol: 'chart',
    count: '83,495,050',
    desc: '近30天总调用量',
  },
  {
    symbolBgColor: '#f4d32f',
    symbol: 'cascades',
    count: '348,065',
    desc: '近30天日均调用量',
  },
  {
    symbolBgColor: '#6ac8f3',
    symbol: 'yonghu',
    count: '334,451',
    desc: '用户总数',
  },
];

export default class Overview extends Component {
  static displayName = 'Overview';

  static propTypes = {
    value: PropTypes.string,
  };

  static defaultProps = {
    value: 'string data',
  };

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
