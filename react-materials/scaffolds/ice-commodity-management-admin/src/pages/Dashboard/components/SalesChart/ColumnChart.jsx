import React, { Component } from 'react';
import { Chart, Geom } from 'bizcharts';

export default class ColumnChart extends Component {
  render() {
    const { color } = this.props;
    const data = [
      { month: '1', sales: 38 },
      { month: '2', sales: 52 },
      { month: '3', sales: 61 },
      { month: '4', sales: 80 },
      { month: '5', sales: 65 },
      { month: '6', sales: 60 },
      { month: '7', sales: 60 },
      { month: '8', sales: 58 },
      { month: '9', sales: 48 },
      { month: '10', sales: 50 },
      { month: '11', sales: 40 },
      { month: '12', sales: 40 },
    ];
    const cols = {
      sales: { tickInterval: 20 },
    };
    return (
      <Chart
        height={60}
        forceFit
        padding={[10, 2, 10, 2]}
        data={data}
        scale={cols}
      >
        <Geom
          type="area"
          position="month*sales"
          color={color || '#3fa1ff'}
          shape="smooth"
        />
        <Geom
          type="line"
          position="month*sales"
          color={color || '#3fa1ff'}
          size={2}
          shape="smooth"
        />
      </Chart>
    );
  }
}
