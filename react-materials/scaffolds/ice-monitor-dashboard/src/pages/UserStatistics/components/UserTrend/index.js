import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import ContainerTitle from '../../../../components/ContainerTitle';

export default class UserTrend extends Component {
  render() {
    const data = [
      {
        country: 'Asia',
        year: '1750',
        value: 502,
      },
      {
        country: 'Asia',
        year: '1800',
        value: 635,
      },
      {
        country: 'Asia',
        year: '1850',
        value: 809,
      },
      {
        country: 'Asia',
        year: '1900',
        value: 3268,
      },
      {
        country: 'Asia',
        year: '1950',
        value: 4400,
      },
      {
        country: 'Asia',
        year: '1999',
        value: 3634,
      },
      {
        country: 'Asia',
        year: '2050',
        value: 947,
      },
      {
        country: 'Africa',
        year: '1750',
        value: 106,
      },
      {
        country: 'Africa',
        year: '1800',
        value: 107,
      },
      {
        country: 'Africa',
        year: '1850',
        value: 111,
      },
      {
        country: 'Africa',
        year: '1900',
        value: 1766,
      },
      {
        country: 'Africa',
        year: '1950',
        value: 221,
      },
      {
        country: 'Africa',
        year: '1999',
        value: 767,
      },
      {
        country: 'Africa',
        year: '2050',
        value: 133,
      },
      {
        country: 'Europe',
        year: '1750',
        value: 163,
      },
      {
        country: 'Europe',
        year: '1800',
        value: 203,
      },
      {
        country: 'Europe',
        year: '1850',
        value: 276,
      },
      {
        country: 'Europe',
        year: '1900',
        value: 628,
      },
      {
        country: 'Europe',
        year: '1950',
        value: 547,
      },
      {
        country: 'Europe',
        year: '1999',
        value: 729,
      },
      {
        country: 'Europe',
        year: '2050',
        value: 408,
      },
      {
        country: 'Oceania',
        year: '1750',
        value: 200,
      },
      {
        country: 'Oceania',
        year: '1800',
        value: 200,
      },
      {
        country: 'Oceania',
        year: '1850',
        value: 200,
      },
      {
        country: 'Oceania',
        year: '1900',
        value: 460,
      },
      {
        country: 'Oceania',
        year: '1950',
        value: 230,
      },
      {
        country: 'Oceania',
        year: '1999',
        value: 300,
      },
      {
        country: 'Oceania',
        year: '2050',
        value: 300,
      },
    ];
    const cols = {
      year: {
        type: 'linear',
        tickInterval: 50,
      },
    };
    return (
      <IceContainer>
        <ContainerTitle title="新老用户趋势" />
        <Chart height={400} data={data} scale={cols} forceFit padding={[40]}>
          <Axis name="year" />
          <Axis name="value" />
          <Legend />
          <Tooltip
            crosshairs={{
              type: 'line',
            }}
          />
          <Geom
            type="areaStack"
            position="year*value"
            color={['country', ['#5e83fb', '#f7da47', '#58ca9a', '#ee706d']]}
          />
          <Geom
            type="lineStack"
            position="year*value"
            size={2}
            color={['country', ['#5e83fb', '#f7da47', '#58ca9a', '#ee706d']]}
          />
        </Chart>
      </IceContainer>
    );
  }
}
