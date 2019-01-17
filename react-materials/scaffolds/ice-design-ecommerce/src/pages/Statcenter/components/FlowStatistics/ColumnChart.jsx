import React, { Component } from 'react';
import { Chart, Geom } from 'bizcharts';

export default class ColumnChart extends Component {
  static displayName = 'ColumnChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { color } = this.props;
    const data = [
      { year: '1951 年', sales: 38 },
      { year: '1952 年', sales: 52 },
      { year: '1956 年', sales: 61 },
      { year: '1957 年', sales: 145 },
      { year: '1958 年', sales: 48 },
      { year: '1959 年', sales: 38 },
      { year: '1960 年', sales: 38 },
      { year: '1962 年', sales: 38 },
    ];
    const cols = {
      sales: { tickInterval: 20 },
    };
    return (
      <Chart
        height={30}
        width={60}
        padding={[2, 3, 2, 3]}
        data={data}
        scale={cols}
      >
        <Geom
          type="interval"
          position="year*sales"
          color={color || '#3fa1ff'}
        />
      </Chart>
    );
  }
}
