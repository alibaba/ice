import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

class Gradient extends React.Component {
  render() {
    const data = [
      {
        month: '2018-01-01',
        acc: 8400,
      },
      {
        month: '2018-02-01',
        acc: 1400,
      },
      {
        month: '2018-03-01',
        acc: 1700,
      },
      {
        month: '2018-04-01',
        acc: 2000,
      },
      {
        month: '2018-05-01',
        acc: 5500,
      },
      {
        month: '2018-06-01',
        acc: 5600,
      },
      {
        month: '2018-07-01',
        acc: 3000,
      },
      {
        month: '2018-08-01',
        acc: 6300,
      },
      {
        month: '2018-09-01',
        acc: 2400,
      },
      {
        month: '2018-10-01',
        acc: 1400,
      },
      {
        month: '2018-11-01',
        acc: 940,
      },
      {
        month: '2018-12-01',
        acc: 620,
      },
    ];
    const cols = {
      month: {
        alias: '月份',
      },
      acc: {
        alias: '新增用户',
      },
    };
    return (
      <div>
        <Chart
          height={400}
          data={data}
          scale={cols}
          forceFit
          padding={[80, 50, 50, 50]}
        >
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
