import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

export default class LineChart extends React.Component {
  render() {
    const { data, cols } = this.props;
    return (
      <div>
        <Chart height={400} data={data} scale={cols} forceFit padding={[40]}>
          <Axis name="year" />
          <Axis name="value" />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type="line" position="year*value" size={2} />
          <Geom
            type="point"
            position="year*value"
            size={4}
            shape="circle"
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          />
        </Chart>
      </div>
    );
  }
}
