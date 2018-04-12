import React, { Component } from 'react';
import { Chart, Geom, Tooltip } from 'bizcharts';

export default class LintChart extends Component {
  static displayName = 'LintChart';

  static propTypes = {};

  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 7 },
      { year: '1997', value: 6 },
      { year: '1998', value: 5 },
      { year: '1999', value: 4 },
    ];
    const cols = {
      value: { min: 0 },
      year: { range: [0, 1] },
    };
    return (
      <Chart height={40} data={data} scale={cols} forceFit padding={[2, 30]}>
        <Tooltip crosshairs={{ type: 'y' }} />
        <Geom type="line" position="year*value" color="#3fa1ff" />
      </Chart>
    );
  }
}
