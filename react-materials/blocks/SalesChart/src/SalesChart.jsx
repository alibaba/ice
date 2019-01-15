import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import ColumnChart from './ColumnChart';
import Content from './Content';

const { Row, Col } = Grid;

const chartData = [
  { month: '1', sales: 38 },
  { month: '2', sales: 52 },
  { month: '3', sales: 61 },
  { month: '4', sales: 50 },
  { month: '5', sales: 65 },
  { month: '6', sales: 60 },
  { month: '7', sales: 60 },
  { month: '8', sales: 58 },
  { month: '9', sales: 48 },
  { month: '10', sales: 50 },
  { month: '11', sales: 40 },
  { month: '12', sales: 40 },
];

const salesData = [
  {
    label: '月销售量',
    amount: '720',
    rate: '+16%',
    flag: 'up',
  },
  {
    label: '周销售量',
    amount: '720',
    rate: '+16%',
    flag: 'down',
  },
  {
    label: '平均销售量',
    amount: '24.3',
    rate: '9%',
    flag: 'up',
  },
];

const earningsData = [
  {
    label: '月收入',
    amount: '￥ 6,540',
    rate: '+4%',
    flag: 'up',
  },
  {
    label: '周收入',
    amount: '￥ 1,525',
    rate: '-5%',
    flag: 'down',
  },
  {
    label: '总收入',
    amount: '￥ 9,325',
    rate: '35%',
    flag: 'up',
  },
];

export default class SalesChart extends Component {
  static displayName = 'SalesChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row wrap gutter={20}>
        <Col xxs="24" l="12">
          <IceContainer>
            <ColumnChart data={chartData} />
            <Content data={salesData} />
          </IceContainer>
        </Col>
        <Col xxs="24" l="12">
          <IceContainer>
            <ColumnChart data={chartData} type="area" />
            <Content data={earningsData} />
          </IceContainer>
        </Col>
      </Row>
    );
  }
}
