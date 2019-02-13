import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import ContainerTitle from '../../../../components/ContainerTitle';

export default class FrequencyChart extends Component {
  render() {
    const data = [
      {
        year: '1 次',
        频率: 88,
      },
      {
        year: '2 次',
        频率: 50,
      },
      {
        year: '3 次',
        频率: 0,
      },
      {
        year: '4 次',
        频率: 0,
      },
      {
        year: '5 次',
        频率: 0,
      },
      {
        year: '6 次',
        频率: 0,
      },
      {
        year: '7 次',
        频率: 0,
      },
      {
        year: '8 次',
        频率: 0,
      },
      {
        year: '9 次',
        频率: 0,
      },
      {
        year: '10+ 次',
        频率: 0,
      },
    ];
    const cols = {
      频率: {
        tickInterval: 20,
      },
    };
    return (
      <IceContainer>
        <ContainerTitle title="访问频次分布" />
        <Chart height={400} data={data} scale={cols} forceFit padding={[40]}>
          <Axis name="year" />
          <Axis name="频率" />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type="interval" position="year*频率" />
        </Chart>
      </IceContainer>
    );
  }
}
