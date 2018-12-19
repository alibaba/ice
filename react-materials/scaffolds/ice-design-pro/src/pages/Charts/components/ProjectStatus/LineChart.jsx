import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';

export default class AreaStackChart extends Component {
  static displayName = 'AreaStackChart';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = [
      { week: 'Mon', task: 38 },
      { week: 'Tue', task: 52 },
      { week: 'Wed', task: 61 },
      { week: 'Thu', task: 145 },
      { week: 'Fri', task: 48 },
      { week: 'Sat', task: 38 },
      { week: 'Sun', task: 38 },
    ];
    const cols = {
      task: { tickInterval: 20 },
    };

    return (
      <Chart height={300} data={data} scale={cols} forceFit padding={[30]}>
        <Axis name="week" />
        <Axis name="task" />
        <Tooltip crosshairs={{ type: 'y' }} />
        <Geom type="interval" position="week*task" />
      </Chart>
    );
  }
}
