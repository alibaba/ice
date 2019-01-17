import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

const data = [
  {
    name: '累积会员数',
    value: 38,
  },
  {
    name: '新增会员数',
    value: 0,
  },
  {
    name: '成交会员数',
    value: 61,
  },
  {
    name: '会员注销数',
    value: 10,
  },
  {
    name: '总会员数',
    value: 89,
  },
];

const cols = {
  value: {
    tickInterval: 20,
  },
};

export default class BarChart extends Component {
  static displayName = 'BarChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer title="店铺会员">
        <Chart height={400} padding={[40]} data={data} scale={cols} forceFit>
          <Axis name="name" />
          <Axis name="value" />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type="interval" position="name*value" />
        </Chart>
      </IceContainer>
    );
  }
}
