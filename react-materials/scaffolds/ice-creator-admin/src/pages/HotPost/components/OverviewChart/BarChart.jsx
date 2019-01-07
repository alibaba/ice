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
      { year: '2015 年', exposure: 82 },
      { year: '2016 年', exposure: 61 },
      { year: '2017 年', exposure: 55 },
      { year: '2018 年', exposure: 48 },
    ];
    const cols = {
      exposure: { tickInterval: 20 },
    };
    return (
      <Chart
        height={200}
        data={data}
        scale={cols}
        forceFit
        padding={[10, 10, 10, 30]}
      >
        <Axis name="year" />
        <Axis name="value" />
        <Tooltip crosshairs={{ type: 'y' }} />
        <Geom type="interval" position="year*exposure" />
      </Chart>
    );
  }
}
