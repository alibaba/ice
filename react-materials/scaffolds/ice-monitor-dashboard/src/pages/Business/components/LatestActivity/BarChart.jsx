import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

class Basiccolumn extends React.Component {
  render() {
    const data = [
      {
        week: '周一',
        count: 38,
      },
      {
        week: '周二',
        count: 52,
      },
      {
        week: '周三',
        count: 61,
      },
      {
        week: '周四',
        count: 145,
      },
      {
        week: '周五',
        count: 48,
      },
      {
        week: '周六',
        count: 38,
      },
      {
        week: '周日',
        count: 38,
      },
    ];
    const cols = {
      count: {
        tickInterval: 20,
      },
    };
    return (
      <div>
        <Chart
          height={400}
          data={data}
          scale={cols}
          forceFit
          padding={[80, 40, 40, 40]}
        >
          <Axis name="week" />
          <Axis name="count" />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type="interval" position="week*count" />
        </Chart>
      </div>
    );
  }
}

export default Basiccolumn;
