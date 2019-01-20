import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';
import { DataSet } from '@antv/data-set';

export default class LineChart extends Component {
  static displayName = 'LineChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = [
      { month: '01/01', A: 7000, B: 3900 },
      { month: '02/01', A: 6900, B: 4200 },
      { month: '03/01', A: 9500, B: 5700 },
      { month: '04/01', A: 14500, B: 8500 },
      { month: '05/01', A: 18400, B: 11900 },
      { month: '06/01', A: 21500, B: 15200 },
      { month: '07/01', A: 25200, B: 17000 },
      { month: '08/01', A: 26500, B: 16600 },
      { month: '09/01', A: 23300, B: 14200 },
      { month: '10/01', A: 18300, B: 10300 },
      { month: '11/01', A: 13900, B: 6600 },
      { month: '12/01', A: 9600, B: 4800 },
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['A', 'B'], // 展开字段集
      key: 'city', // key字段
      value: 'temperature', // value字段
    });
    console.log(dv);
    const cols = {
      month: {
        range: [0, 1],
      },
    };
    return (
      <Chart
        height={350}
        data={dv}
        scale={cols}
        forceFit
        padding={[30, 30, 30, 60]}
      >
        <Axis name="month" />
        <Axis name="temperature" label={{ formatter: val => `${val}` }} />
        <Tooltip crosshairs={{ type: 'y' }} />
        <Geom type="line" position="month*temperature" size={2} color="city" />
        <Geom
          type="point"
          position="month*temperature"
          size={4}
          shape="circle"
          color="city"
          style={{ stroke: '#fff', lineWidth: 1 }}
        />
      </Chart>
    );
  }
}
