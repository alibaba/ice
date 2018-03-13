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
      { month: '01/01', SiteA: 7000, SiteB: 3900 },
      { month: '02/01', SiteA: 6900, SiteB: 4200 },
      { month: '03/01', SiteA: 9500, SiteB: 5700 },
      { month: '04/01', SiteA: 14500, SiteB: 8500 },
      { month: '05/01', SiteA: 18400, SiteB: 11900 },
      { month: '06/01', SiteA: 21500, SiteB: 15200 },
      { month: '07/01', SiteA: 25200, SiteB: 17000 },
      { month: '08/01', SiteA: 26500, SiteB: 16600 },
      { month: '09/01', SiteA: 23300, SiteB: 14200 },
      { month: '10/01', SiteA: 18300, SiteB: 10300 },
      { month: '11/01', SiteA: 13900, SiteB: 6600 },
      { month: '12/01', SiteA: 9600, SiteB: 4800 },
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['SiteA', 'SiteB'], // 展开字段集
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
        <Geom
          type="line"
          position="month*temperature"
          size={2}
          color="city"
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
