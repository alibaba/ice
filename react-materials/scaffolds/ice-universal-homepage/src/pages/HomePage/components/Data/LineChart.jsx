import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

class Gradient extends React.Component {
  render() {
    const data = [
      {
        month: '10-01',
        acc: 1100,
      },
      {
        month: '10-02',
        acc: 1200,
      },
      {
        month: '10-03',
        acc: 1120,
      },
      {
        month: '10-04',
        acc: 1300,
      },
    ];
    const cols = {
      month: {
        alias: '日期',
      },
      acc: {
        alias: '用户',
      },
    };
    return (
      <div>
        <Chart height={400} data={data} scale={cols} forceFit>
          <Axis
            name="month"
            title={null}
            tickLine={null}
            line={{
              stroke: '#E6E6E6',
            }}
          />
          <Axis
            name="acc"
            line={false}
            tickLine={null}
            grid={null}
            title={null}
          />
          <Tooltip />
          <Geom
            type="line"
            position="month*acc"
            size={1}
            color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
            shape="smooth"
            style={{
              shadowColor: 'l (270) 0:rgba(21, 146, 255, 0)',
              shadowBlur: 60,
              shadowOffsetY: 6,
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Gradient;
