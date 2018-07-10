import React, { Component } from 'react';
import { Grid, Icon } from '@icedesign/base';
import ColumnChart from './ColumnChart';

const { Row, Col } = Grid;
const mockData = [
  {
    title: 'PAGE VIEWS',
    amount: '1,293',
    percent: '15%',
    increase: true,
    color: '#fff',
    borderColor: '#4FD4A4',
    background: '#1BC98E',
  },
  {
    title: 'DOWNLOADS',
    amount: '758',
    percent: '1.3%',
    increase: false,
    color: '#fff',
    borderColor: '#EB6C7A',
    background: '#E64758',
  },
  {
    title: 'SIGN-UPS',
    amount: '3,659',
    percent: '20%',
    increase: true,
    color: '#fff',
    borderColor: '#B29FFF',
    background: '#9F85FF',
  },
  {
    title: 'ACTIVE USERS',
    amount: '298',
    percent: '12%',
    increase: false,
    color: '#fff',
    borderColor: '#E9E063',
    background: '#E5D936',
  },
];

export default class OverviewSatesChart extends Component {
  static displayName = 'OverviewSatesChart';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.head}>
          <span style={styles.headText}>QUICK STATS</span>
        </div>
        <Row wrap gutter={20}>
          {mockData.map((item, index) => {
            return (
              <Col xxs="24" l="6" key={index}>
                <div style={{ ...styles.content, background: item.background }}>
                  <div style={styles.summary}>
                    <p style={styles.title}>{item.title}</p>
                    <div style={styles.data}>
                      <h2 style={styles.amount}>{item.amount}</h2>
                      <div style={styles.percent}>
                        {item.percent}{' '}
                        <Icon
                          type={`arrow-${
                            item.increase ? 'up' : 'down'
                          }-filling`}
                          size="xs"
                          style={styles.arrowIcon}
                        />
                      </div>
                    </div>
                  </div>
                  <ColumnChart color="#fff" />
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '60px 0',
  },
  head: {
    position: 'relative',
    color: '#fff',
    textAlign: 'center',
    marginBottom: '30px',
    borderBottom: '1px solid #434856',
  },
  headText: {
    position: 'absolute',
    top: '-8px',
    background: '#272931',
    padding: '0 10px',
    left: '50%',
    marginLeft: '-50px',
  },
  content: {
    color: '#fff',
    borderRadius: '3px',
  },
  summary: {
    padding: '20px',
  },
  title: {
    margin: '0 0 10px 0',
  },
  data: {
    display: 'flex',
    margin: '10px 0',
  },
  amount: {
    margin: '0 15px 0 0',
    fontSize: '28px',
  },
  percent: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: '4px',
    fontSize: '12px',
  },
  arrowIcon: {
    marginLeft: '8px',
  },
};
