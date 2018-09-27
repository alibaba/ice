import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

export default class LineChart extends Component {
  static displayName = 'LineChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, cols, axisName } = this.props;
    return (
      <Chart height={400} padding={[40]} data={data} scale={cols} forceFit>
        <Axis
          name={axisName}
          title={null}
          tickLine={null}
          line={{
            stroke: '#E6E6E6',
          }}
        />
        <Tooltip />
        <Geom
          type="line"
          position="date*acc"
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
    );
  }
}
