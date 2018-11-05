import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

class Basiccolumn extends React.Component {
  render() {
    const data = [
      {
        month: '09-01',
        count: 20,
      },
      {
        month: '09-02',
        count: 52,
      },
      {
        month: '09-03',
        count: 61,
      },
      {
        month: '09-04',
        count: 25,
      },
    ];
    const cols = {
      count: {
        tickInterval: 20,
        alias: '使用次数',
      },
    };
    return (
      <Chart height={400} data={data} scale={cols} forceFit>
        <Axis name="month" />
        <Axis name="count" />
        <Tooltip
          crosshairs={{
            type: 'y',
          }}
        />
        <Geom type="interval" position="month*count" />
      </Chart>
    );
  }
}

export default Basiccolumn;
