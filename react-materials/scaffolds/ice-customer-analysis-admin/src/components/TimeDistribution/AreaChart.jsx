import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

export default class AreaChart extends React.Component {
  render() {
    const data = [
      {
        month: '2018-10-01',
        value: 25468,
      },
      {
        month: '2018-10-02',
        value: 26100,
      },
      {
        month: '2018-10-03',
        value: 25900,
      },
      {
        month: '2018-10-04',
        value: 27409,
      },
      {
        month: '2018-10-05',
        value: 27000,
      },
      {
        month: '2018-10-06',
        value: 31056,
      },
      {
        month: '2018-10-07',
        value: 31982,
      },
      {
        month: '2018-10-08',
        value: 32040,
      },
      {
        month: '2018-10-09',
        value: 33233,
      },
    ];
    const cols = {
      value: {
        min: 10000,
      },
      month: {
        range: [0, 1],
      },
    };
    return (
      <div>
        <Chart height={500} data={data} scale={cols} forceFit padding={[40]}>
          <Axis name="month" />
          <Axis
            name="value"
            label={{
              formatter: (val) => {
                return `${(val / 10000).toFixed(1)}k`;
              },
            }}
          />
          <Tooltip
            crosshairs={{
              type: 'line',
            }}
          />
          <Geom type="area" position="month*value" shape="smooth" />
          <Geom type="line" position="month*value" shape="smooth" size={2} />
        </Chart>
      </div>
    );
  }
}
