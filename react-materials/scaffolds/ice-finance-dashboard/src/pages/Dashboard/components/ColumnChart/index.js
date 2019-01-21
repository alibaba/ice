import React, { Component } from 'react';
import { Chart, Geom, Tooltip } from 'bizcharts';

export default class ColumnChart extends Component {
  render() {
    const { color, height = 60 } = this.props;
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
      sales: { tickInterval: 20, alias: '转化率' },
    };
    return (
      <Chart height={height} forceFit padding={[2]} data={data} scale={cols}>
        <Geom
          type="area"
          position="month*sales"
          color={color || '#447eff'}
          shape="smooth"
        />
        <Tooltip />
        <Geom
          type="line"
          position="month*sales"
          color={color || '#447eff'}
          size={2}
          shape="smooth"
        />
      </Chart>
    );
  }
}
