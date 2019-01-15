import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import PieChart from './PieChart';
import Card from './Card';

const { Row, Col } = Grid;

export default class MultiplePieChart extends Component {
  static displayName = 'MultiplePieChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const options = [
      {
        value: 'day',
        label: '今日',
      },
      {
        value: 'yesterday',
        label: '昨日',
      },
      {
        value: 'week',
        label: '7 天',
      },
      {
        value: 'year',
        label: '12 个月',
      },
    ];
    const pieChartData1 = [
      {
        name: 'Webpack',
        y: 41.41,
        sliced: true,
        selected: true,
        color: '#f29b70',
      },
      {
        name: 'Rollup',
        y: 11.84,
      },
      {
        name: 'Parcel',
        y: 10.26,
      },
      {
        name: 'Gulp',
        y: 10.85,
      },
      {
        name: 'Browserify',
        y: 14.67,
      },
      {
        name: 'Grunt',
        y: 10.97,
      },
    ];

    const pieChartData2 = [
      {
        name: 'Webpack',
        y: 61.41,
        sliced: true,
        selected: true,
      },
      {
        name: 'Rollup',
        y: 11.84,
      },
      {
        name: 'Parcel',
        y: 10.26,
      },
    ];

    return (
      <Row wrap gutter="20">
        <Col l="12">
          <Card title="Client 构建分布" options={options}>
            <PieChart dataLabels data={pieChartData1} />
          </Card>
        </Col>
        <Col l="12">
          <Card title="活跃构建器分布" options={options}>
            <PieChart showInLegend data={pieChartData2} />
          </Card>
        </Col>
      </Row>
    );
  }
}
