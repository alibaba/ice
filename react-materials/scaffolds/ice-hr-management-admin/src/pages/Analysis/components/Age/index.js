import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

export default class Age extends Component {
  render() {
    const data = [
      {
        age: '20-25',
        value: 90,
      },
      {
        age: '25-30',
        value: 20,
      },
      {
        age: '30-35',
        value: 10,
      },
      {
        age: '35-40',
        value: 15,
      },
      {
        age: '40-45',
        value: 18,
      },
      {
        age: '45-50',
        value: 35,
      },
      {
        age: '50-55',
        value: 40,
      },
      {
        age: '55-60',
        value: 40,
      },
    ];
    const cols = {
      value: {
        tickInterval: 20,
        alias: '年龄',
      },
    };
    return (
      <IceContainer title="年龄分布">
        <Chart height={400} data={data} scale={cols} forceFit padding={[40]}>
          <Axis name="age" />
          <Axis name="value" />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type="interval" position="age*value" />
        </Chart>
      </IceContainer>
    );
  }
}
