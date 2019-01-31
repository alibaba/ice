import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import ContainerTitle from '../../../../components/ContainerTitle';

export default class OrderTrend extends Component {
  render() {
    const data = [
      {
        country: 'Europe',
        year: '2011',
        value: 163,
      },
      {
        country: 'Europe',
        year: '2012',
        value: 203,
      },
      {
        country: 'Europe',
        year: '2013',
        value: 276,
      },
      {
        country: 'Europe',
        year: '2014',
        value: 408,
      },
      {
        country: 'Europe',
        year: '2015',
        value: 547,
      },
      {
        country: 'Europe',
        year: '2016',
        value: 729,
      },
      {
        country: 'Europe',
        year: '2017',
        value: 628,
      },
      {
        country: 'Europe',
        year: '2018',
        value: 828,
      },
      {
        country: 'Asia',
        year: '2011',
        value: 502,
      },
      {
        country: 'Asia',
        year: '2012',
        value: 635,
      },
      {
        country: 'Asia',
        year: '2013',
        value: 809,
      },
      {
        country: 'Asia',
        year: '2014',
        value: 947,
      },
      {
        country: 'Asia',
        year: '2015',
        value: 1402,
      },
      {
        country: 'Asia',
        year: '2016',
        value: 3634,
      },
      {
        country: 'Asia',
        year: '2017',
        value: 5268,
      },
      {
        country: 'Asia',
        year: '2018',
        value: 7268,
      },
    ];
    const ds = new DataSet();
    const dv = ds
      .createView()
      .source(data)
      .transform({
        type: 'percent',
        field: 'value',
        dimension: 'country',
        groupBy: ['year'],
        as: 'percent',
      });
    const cols = {
      percent: {
        min: 0,

        formatter(val) {
          return `${(val * 100).toFixed(2)}%`;
        },
      },
    };

    return (
      <IceContainer style={{ padding: 0 }}>
        <ContainerTitle title="新增订单趋势" />
        <Chart
          height={300}
          data={dv}
          scale={cols}
          forceFit
          padding={[40, 40, 80, 80]}
        >
          <Legend />
          <Axis name="year" />
          <Axis name="percent" />
          <Tooltip />
          <Geom type="intervalStack" position="year*percent" color="country" />
        </Chart>
      </IceContainer>
    );
  }
}
