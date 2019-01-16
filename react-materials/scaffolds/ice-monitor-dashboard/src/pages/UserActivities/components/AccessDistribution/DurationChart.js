import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import ContainerTitle from '../../../../components/ContainerTitle';

export default class DurationChart extends Component {
  render() {
    const data = [
      {
        year: '10 分',
        时长: 90,
      },
      {
        year: '20 分',
        时长: 20,
      },
      {
        year: '30 分',
        时长: 10,
      },
      {
        year: '40 分',
        时长: 15,
      },
      {
        year: '50 分',
        时长: 18,
      },
      {
        year: '60 分',
        时长: 35,
      },
      {
        year: '70 分',
        时长: 40,
      },
      {
        year: '80 分',
        时长: 40,
      },
      {
        year: '90 分',
        时长: 50,
      },
      {
        year: '100 分',
        时长: 60,
      },
    ];
    const cols = {
      时长: {
        tickInterval: 20,
      },
    };
    return (
      <IceContainer>
        <ContainerTitle title="访问时长分布" />
        <Chart height={400} data={data} scale={cols} forceFit padding={[40]}>
          <Axis name="year" />
          <Axis name="时长" />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type="interval" position="year*时长" />
        </Chart>
      </IceContainer>
    );
  }
}
