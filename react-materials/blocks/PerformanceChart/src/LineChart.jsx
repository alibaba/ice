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
      { month: '01/01', online: 7000, offline: 3900 },
      { month: '02/01', online: 6900, offline: 4200 },
      { month: '03/01', online: 9500, offline: 5700 },
      { month: '04/01', online: 14500, offline: 8500 },
      { month: '05/01', online: 18400, offline: 11900 },
      { month: '06/01', online: 21500, offline: 15200 },
      { month: '07/01', online: 25200, offline: 17000 },
      { month: '08/01', online: 26500, offline: 16600 },
      { month: '09/01', online: 23300, offline: 14200 },
      { month: '10/01', online: 18300, offline: 10300 },
      { month: '11/01', online: 13900, offline: 6600 },
      { month: '12/01', online: 9600, offline: 4800 },
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['online', 'offline'], // 展开字段集
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
          type="polygon"
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
