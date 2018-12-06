import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

const data = [
  {
    name: '周一',
    value: 1,
  },
  {
    name: '周二',
    value: 3,
  },
  {
    name: '周三',
    value: 5,
  },
  {
    name: '周四',
    value: 10,
  },
  {
    name: '周五',
    value: 3,
  },
  {
    name: '周六',
    value: 1,
  },
  {
    name: '周天',
    value: 0,
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
      <IceContainer title="本周发布情况">
        <Chart height={260} padding={[40]} data={data} scale={cols} forceFit>
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
