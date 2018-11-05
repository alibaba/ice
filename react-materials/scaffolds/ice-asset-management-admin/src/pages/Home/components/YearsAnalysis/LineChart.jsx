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
    // MOCK 数据，实际业务按需进行替换
    const data = [
      { month: '01/01', memory: 7000, calculate: 3900, cost: '8000' },
      { month: '02/01', memory: 6900, calculate: 4200, cost: '9000' },
      { month: '03/01', memory: 9500, calculate: 5700, cost: '9500' },
      { month: '04/01', memory: 14500, calculate: 8500, cost: '11000' },
      { month: '05/01', memory: 18400, calculate: 11900, cost: '12000' },
      { month: '06/01', memory: 21500, calculate: 15200, cost: '15000' },
      { month: '07/01', memory: 25200, calculate: 17000, cost: '16000' },
      { month: '08/01', memory: 26500, calculate: 16600, cost: '16000' },
      { month: '09/01', memory: 23300, calculate: 14200, cost: '15000' },
      { month: '10/01', memory: 18300, calculate: 10300, cost: '14000' },
      { month: '11/01', memory: 13900, calculate: 6600, cost: '13000' },
      { month: '12/01', memory: 9600, calculate: 4800, cost: '12000' },
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['memory', 'calculate', 'cost'], // 展开字段集
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
        <Axis name="temperature" label={{ formatter: (val) => `${val}` }} />
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
