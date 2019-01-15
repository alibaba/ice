import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

// MOCK 数据，实际业务替换掉
const mockData = [
  {
    title: '计算',
    cost: '2.34亿元',
    rank: '78/100',
    accumulative: '567.89亿元',
    score: {
      name: '该日计算健康分',
      value: '98.62',
      desc: '状况不错，保持住哦!',
    },
    consume: {
      name: '该日计算消耗',
      value: '33.65',
      ratio: '16.63%',
    },
  },
  {
    title: '存储',
    cost: '1.23亿元',
    rank: '98/100',
    accumulative: '765.89亿元',
    score: {
      name: '该日存储健康分',
      value: '88.23',
      desc: '刚及格，请继续改进!',
    },
    consume: {
      name: '该日存储消耗',
      value: '58.39',
      ratio: '6.21%',
    },
  },
];

export default class ScoreOverview extends Component {
  static displayName = 'ScoreOverview';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row wrap gutter={20}>
        {mockData.map((item, index) => {
          const scoreColor =
            item.score.value > 90 ? styles.green : styles.yellow;
          const consumeColor =
            item.consume.value > 90 ? styles.green : styles.yellow;
          return (
            <Col l="12" key={index}>
              <IceContainer style={styles.container}>
                <div style={styles.cardTitle}>{item.title}</div>
                <div style={styles.body}>
                  <div style={styles.cell}>
                    <div style={styles.cellName}>{item.score.name}</div>
                    <div style={{ ...styles.cellValue, ...scoreColor }}>
                      {item.score.value}
                    </div>
                    <div style={{ ...styles.cellDesc, ...consumeColor }}>
                      {item.score.desc}
                    </div>
                  </div>
                  <div style={styles.cell}>
                    <div style={styles.cellName}>{item.consume.name}</div>
                    <div style={{ ...styles.cellValue, ...styles.black }}>
                      {item.consume.value}
                    </div>
                    <div style={{ ...styles.cellDesc, ...styles.grey }}>
                      <span style={styles.ratioLabel}>环比</span>
                      <span style={styles.ratioValue}>
                        {item.consume.ratio}
                      </span>
                    </div>
                  </div>
                </div>
                <div style={styles.footer}>
                  <div style={styles.item}>
                    <div style={styles.itemLabel}>当日计算费用： </div>
                    <div style={styles.itemValue}>{item.cost}</div>
                  </div>
                  <div style={styles.item}>
                    <div style={styles.itemLabel}>当日公司排名： </div>
                    <div style={styles.itemValue}>{item.rank}</div>
                  </div>
                  <div style={styles.item}>
                    <div style={styles.itemLabel}>财年累计费用： </div>
                    <div style={styles.itemValue}>{item.accumulative}</div>
                  </div>
                </div>
              </IceContainer>
            </Col>
          );
        })}
      </Row>
    );
  }
}

const styles = {
  container: {
    padding: '0',
  },
  cardTitle: {
    padding: '20px',
    opacity: '0.8',
    fontSize: '16px',
    color: '#000',
    lineHeight: '16px',
  },
  body: {
    display: 'flex',
    marginBottom: '20px',
    padding: '20px',
  },
  cell: {
    width: '50%',
  },
  cellName: {
    color: '#666',
    fontSize: '14px',
    lineHeight: '14px',
  },
  cellValue: {
    fontSize: '40px',
    fontWeight: '500',
    height: '40px',
    lineHeight: '40px',
    margin: '15px 0',
  },
  ratioLabel: {
    marginRight: '20px',
  },
  yellow: {
    color: '#ff9600',
  },
  green: {
    color: '#0da32e',
  },
  black: {
    color: '#000',
  },
  grey: {
    color: '#808080',
  },
  footer: {
    padding: '10px 20px',
    background: '#f1f7fe',
    display: 'flex',
    justifyContent: 'space-between',
  },
  item: {
    display: 'flex',
    lineHeight: '30px',
    fontSize: '12px',
  },
  itemLabel: {
    color: 'rgba(0,0,0,.4)',
  },
  itemValue: {
    color: 'rgba(0,0,0,.8)',
  },
};
