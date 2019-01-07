import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import { DataSet } from '@antv/data-set';

export default class AreaChart extends Component {
  render() {
    const data = [
      { month: '2018-01', Maths: 0, English: 0 },
      { month: '2018-02', Maths: 90, English: 60 },
      { month: '2018-03', Maths: 10, English: 80 },
      { month: '2018-04', Maths: 90, English: 20 },
      { month: '2018-05', Maths: 20, English: 70 },
      { month: '2018-06', Maths: 80, English: 59 },
      { month: '2018-07', Maths: 0, English: 0 },
    ];
    const dv = new DataSet.View().source(data);
    dv.transform({
      type: 'fold',
      fields: ['Maths', 'English'],
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
      month: {
        range: [0, 1],
      },
    };

    return (
      <Chart
        height={400}
        data={dv}
        padding={[40, 30, 40, 50]}
        scale={scale}
        forceFit
      >
        <Tooltip crosshairs />
        <Axis />
        <Legend />
        <Geom type="area" position="month*value" color="type" shape="smooth" />
        <Geom
          type="line"
          position="month*value"
          color="type"
          shape="smooth"
          size={2}
        />
      </Chart>
    );
  }
}
