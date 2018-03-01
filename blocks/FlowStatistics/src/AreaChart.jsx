import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';

export default class AreaChart extends Component {
  static displayName = 'AreaChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = [
      { country: 'siteA', year: '1750', value: 502 },
      { country: 'siteA', year: '1800', value: 635 },
      { country: 'siteA', year: '1850', value: 809 },
      { country: 'siteA', year: '1900', value: 5268 },
      { country: 'siteA', year: '1950', value: 4400 },
      { country: 'siteA', year: '1999', value: 3634 },
      { country: 'siteA', year: '2050', value: 947 },
      { country: 'siteB', year: '1750', value: 106 },
      { country: 'siteB', year: '1800', value: 107 },
      { country: 'siteB', year: '1850', value: 111 },
      { country: 'siteB', year: '1900', value: 1766 },
      { country: 'siteB', year: '1950', value: 221 },
      { country: 'siteB', year: '1999', value: 767 },
      { country: 'siteB', year: '2050', value: 133 },
      { country: 'siteC', year: '1750', value: 163 },
      { country: 'siteC', year: '1800', value: 203 },
      { country: 'siteC', year: '1850', value: 276 },
      { country: 'siteC', year: '1900', value: 628 },
      { country: 'siteC', year: '1950', value: 547 },
      { country: 'siteC', year: '1999', value: 729 },
      { country: 'siteC', year: '2050', value: 408 },
      { country: 'siteD', year: '1750', value: 200 },
      { country: 'siteD', year: '1800', value: 200 },
      { country: 'siteD', year: '1850', value: 200 },
      { country: 'siteD', year: '1900', value: 460 },
      { country: 'siteD', year: '1950', value: 230 },
      { country: 'siteD', year: '1999', value: 300 },
      { country: 'siteD', year: '2050', value: 300 },
    ];
    const cols = {
      year: {
        type: 'linear',
        tickInterval: 50,
      },
    };
    return (
      <Chart height={400} data={data} scale={cols} forceFit>
        <Axis name="year" />
        <Axis name="value" />
        <Legend />
        <Tooltip crosshairs={{ type: 'line' }} />
        <Geom type="area" position="year*value" color="country" />
        <Geom type="line" position="year*value" size={2} color="country" />
      </Chart>
    );
  }
}
