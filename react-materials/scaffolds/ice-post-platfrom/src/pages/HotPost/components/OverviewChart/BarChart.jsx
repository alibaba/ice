import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';

export default class BarChart extends Component {
  static displayName = 'BarChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = [
      { year: '2015 年', sales: 82 },
      { year: '2016 年', sales: 61 },
      { year: '2017 年', sales: 55 },
      { year: '2018 年', sales: 48 },
    ];
    const cols = {
      sales: { tickInterval: 20 },
    };
    return (
      <Chart
        height={200}
        data={data}
        scale={cols}
        forceFit
        padding={[10, 15, 30, 10]}
      >
        <Axis name="year" />
        <Axis name="value" />
        <Tooltip crosshairs={{ type: 'y' }} />
        <Geom type="interval" position="year*sales" />
      </Chart>
    );
  }
}
