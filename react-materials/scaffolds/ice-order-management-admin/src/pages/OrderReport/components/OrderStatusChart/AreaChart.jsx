import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import { DataSet } from '@antv/data-set';

export default class AreaChart extends Component {
  render() {
    const data = [
      { year: '2012', A: 1500 },
      { year: '2013', A: 1500 },
      { year: '2014', A: 1500 },
      { year: '2015', A: 1500 },
      { year: '2016', A: 1500 },
      { year: '2017', A: 1500 },
      { year: '2018', A: 1500 },
    ];
    const dv = new DataSet.View().source(data);
    dv.transform({
      type: 'fold',
      fields: ['A'],
      key: 'type',
      value: 'value',
    });

    const scale = {
      value: {
        alias: 'The Share Price in Dollars',
        formatter: (val) => {
          return `${val}`;
        },
      },
      year: {
        range: [0, 1],
      },
    };

    return (
      <Chart
        height={400}
        data={dv}
        padding={[40, 20, 40, 50]}
        scale={scale}
        forceFit
      >
        <Tooltip crosshairs />
        <Axis />
        <Legend />
        <Geom
          type="line"
          position="year*value"
          color="type"
          shape="smooth"
          size={2}
        />
      </Chart>
    );
  }
}
