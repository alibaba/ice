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
      { month: '01', total: 7.0, profit: 3.9 },
      { month: '02', total: 6.9, profit: 4.2 },
      { month: '03', total: 9.5, profit: 5.7 },
      { month: '04', total: 14.5, profit: 8.5 },
      { month: '05', total: 18.4, profit: 11.9 },
      { month: '06', total: 21.5, profit: 15.2 },
      { month: '07', total: 25.2, profit: 17.0 },
      { month: '08', total: 26.5, profit: 16.6 },
      { month: '09', total: 23.3, profit: 14.2 },
      { month: '10', total: 18.3, profit: 10.3 },
      { month: '11', total: 13.9, profit: 6.6 },
      { month: '12', total: 9.6, profit: 4.8 },
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['total', 'profit'], // 展开字段集
      key: 'city', // key字段
      value: 'temperature', // value字段
    });
    const cols = {
      month: {
        range: [0, 1],
      },
    };
    return (
      <Chart
        height={200}
        data={dv}
        scale={cols}
        forceFit
        padding={[10, 20, 30, 10]}
      >
        <Axis name="month" />
        <Axis name="temperature" label={{ formatter: (val) => `${val}` }} />
        <Tooltip crosshairs={{ type: 'y' }} />
        <Geom
          type="line"
          position="month*temperature"
          size={2}
          color="city"
          shape="smooth"
        />
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
