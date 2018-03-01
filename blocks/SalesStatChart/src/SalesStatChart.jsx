import React, { Component } from 'react';

import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import { Grid } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import './SalesStatChart.scss';

const { Row, Col } = Grid;

export default class SalesStatChart extends Component {
  static displayName = 'SalesStatChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="sales-stat-chart">
        <Row>
          <Col span="15">
            <IceContainer title="销售额">
              <Chart height={350} data={data} forceFit>
                <Axis name="month" />
                <Axis name="value" />
                <Legend />
                <Tooltip crosshairs={{ type: 'line' }} />
                <Geom type="area" position="month*value" color="saler" />
                <Geom
                  type="line"
                  position="month*value"
                  size={2}
                  color="saler"
                />
              </Chart>
            </IceContainer>
          </Col>
          <Col span="9">
            <Row>
              <Col span="24">
                <IceContainer style={styles.smallContainer} title="新用户">
                  <Chart
                    height={76}
                    data={userData}
                    forceFit
                    padding={[0, 0, 0, 0]}
                  >
                    <Axis name="count" />
                    <Tooltip crosshairs={{ type: 'y' }} />
                    <Geom type="interval" position="month*count" />
                  </Chart>
                </IceContainer>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <IceContainer style={styles.smallContainer} title="下单量">
                  <Chart
                    height={76}
                    data={downloadData}
                    forceFit
                    padding={[0, 0, 0, 0]}
                  >
                    <Axis name="pv" />
                    <Tooltip crosshairs={{ type: 'y' }} />
                    <Geom type="interval" position="month*count" />
                  </Chart>
                </IceContainer>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <IceContainer style={styles.smallContainer} title="访问量">
                  <Chart
                    height={76}
                    data={pvData}
                    forceFit
                    padding={[0, 0, 0, 0]}
                  >
                    <Axis name="pv" />
                    <Tooltip crosshairs={{ type: 'y' }} />
                    <Geom type="interval" position="month*pv" />
                  </Chart>
                </IceContainer>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const styles = {
  smallContainer: {
    marginBottom: 10,
    padding: 10,
  },
};

const data = [
  { saler: 'Bob', month: '5', value: 502 },
  { saler: 'Bob', month: '6', value: 635 },
  { saler: 'Bob', month: '7', value: 809 },
  { saler: 'Bob', month: '8', value: 5268 },
  { saler: 'Bob', month: '9', value: 4400 },
  { saler: 'Bob', month: '10', value: 3634 },
  { saler: 'Bob', month: '11', value: 947 },
  { saler: 'Anna', month: '5', value: 106 },
  { saler: 'Anna', month: '6', value: 107 },
  { saler: 'Anna', month: '7', value: 111 },
  { saler: 'Anna', month: '8', value: 1766 },
  { saler: 'Anna', month: '9', value: 221 },
  { saler: 'Anna', month: '10', value: 767 },
  { saler: 'Anna', month: '11', value: 133 },
  { saler: 'Tim', month: '5', value: 163 },
  { saler: 'Tim', month: '6', value: 203 },
  { saler: 'Tim', month: '7', value: 276 },
  { saler: 'Tim', month: '8', value: 628 },
  { saler: 'Tim', month: '9', value: 547 },
  { saler: 'Tim', month: '10', value: 729 },
  { saler: 'Tim', month: '11', value: 408 },
  { saler: 'Xiaoming', month: '5', value: 200 },
  { saler: 'Xiaoming', month: '6', value: 200 },
  { saler: 'Xiaoming', month: '7', value: 200 },
  { saler: 'Xiaoming', month: '8', value: 460 },
  { saler: 'Xiaoming', month: '9', value: 230 },
  { saler: 'Xiaoming', month: '10', value: 300 },
  { saler: 'Xiaoming', month: '11', value: 300 },
];

const pvData = [
  {
    month: '5',
    pv: 100,
  },
  {
    month: '6',
    pv: 200,
  },
  {
    month: '7',
    pv: 400,
  },
  {
    month: '8',
    pv: 120,
  },
  {
    month: '9',
    pv: 10,
  },
  {
    month: '10',
    pv: 1030,
  },
  {
    month: '11',
    pv: 100,
  },
];

const userData = [
  {
    month: '5',
    count: 100,
  },
  {
    month: '6',
    count: 300,
  },
  {
    month: '7',
    count: 110,
  },
  {
    month: '8',
    count: 320,
  },
  {
    month: '9',
    count: 102,
  },
  {
    month: '10',
    count: 100,
  },
  {
    month: '11',
    count: 420,
  },
];
const downloadData = [
  {
    month: '5',
    count: 10,
  },
  {
    month: '6',
    count: 220,
  },
  {
    month: '7',
    count: 200,
  },
  {
    month: '8',
    count: 530,
  },
  {
    month: '9',
    count: 140,
  },
  {
    month: '10',
    count: 1030,
  },
  {
    month: '11',
    count: 130,
  },
];
